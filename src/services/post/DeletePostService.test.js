import context from 'jest-plugin-context';

import DeletePostService from './DeletePostService';

import User from '../../models/user/User';
import Post from '../../models/post/Post';

import UserNotFound from '../../exceptions/user/UserNotFound';
import PostNotFound from '../../exceptions/post/PostNotFound';
import UserNotCreatedPost from '../../exceptions/post/UserNotCreatedPost';
import PostAlreadyDeleted from '../../exceptions/post/PostAlreadyDeleted';

const userFindBy = jest.fn();

jest.mock(
  '../../repositories/UserRepository',
  () => ({
    userRepository: {
      findBy: () => userFindBy(),
    },
  }),
);

const postFindOneBy = jest.fn();
const postDelete = jest.fn();

jest.mock(
  '../../repositories/PostRepository',
  () => ({
    postRepository: {
      findOneBy: () => postFindOneBy(),
      delete: () => postDelete(),
    },
  }),
);

let deletePostService;

describe('DeletePostService', () => {
  beforeEach(() => {
    deletePostService = new DeletePostService();
  });

  const userId = 1;
  const postId = 2;

  context('deletePost', () => {
    beforeEach(() => {
      userFindBy.mockClear();
      postFindOneBy.mockClear();
      postDelete.mockClear();
    });

    context('정상적인 userId, postId가 주어진 경우', () => {
      beforeEach(() => {
        const user = new User({
          id: userId,
          email: 'hsjkdss228@naver.com',
        });
        userFindBy.mockReturnValue(user);

        const post = new Post({
          id: postId,
          userId,
          title: 'ㅎ',
          descriptionText: '훗',
        });
        postFindOneBy.mockReturnValue(post);
      });

      it('postRepository.delete() 메서드를 호출', async () => {
        await deletePostService.deletePost({
          userId,
          postId,
        });

        expect(postDelete).toBeCalled();
      });
    });

    context('user가 존재하지 않는 경우', () => {
      beforeEach(() => {
        userFindBy.mockReturnValue(null);
      });

      it('UserNotFound 예외를 발생', () => {
        expect(async () => {
          await deletePostService.deletePost({
            userId,
            postId,
          });
        }).rejects.toThrow(UserNotFound);
      });
    });

    context('post가 존재하지 않는 경우', () => {
      beforeEach(() => {
        const user = new User({
          id: userId,
          email: 'hsjkdss228@naver.com',
        });
        userFindBy.mockReturnValue(user);
        postFindOneBy.mockReturnValue(null);
      });

      it('PostNotFound 예외를 발생', () => {
        expect(async () => {
          await deletePostService.deletePost({
            userId,
            postId,
          });
        }).rejects.toThrow(PostNotFound);
      });
    });

    context('이미 삭제 상태인 post인 경우', () => {
      beforeEach(() => {
        const user = new User({
          id: userId,
          email: 'hsjkdss228@naver.com',
        });
        userFindBy.mockReturnValue(user);

        const post = new Post({
          id: postId,
          userId,
          title: 'ㅎ',
          descriptionText: '훗',
          deleted: true,
        });
        postFindOneBy.mockReturnValue(post);
      });

      it('UserNotCreatedPost 예외를 발생', () => {
        expect(async () => {
          await deletePostService.deletePost({
            userId,
            postId,
          });
        }).rejects.toThrow(PostAlreadyDeleted);
      });
    });

    context('post의 작성자가 user가 아닌 경우', () => {
      beforeEach(() => {
        const user = new User({
          id: userId,
          email: 'hsjkdss228@naver.com',
        });
        userFindBy.mockReturnValue(user);

        const post = new Post({
          id: postId,
          userId: 223222,
          title: 'ㅋ',
          descriptionText: 'ㅠ',
        });
        postFindOneBy.mockReturnValue(post);
      });

      it('UserNotCreatedPost 예외를 발생', () => {
        expect(async () => {
          await deletePostService.deletePost({
            userId,
            postId,
          });
        }).rejects.toThrow(UserNotCreatedPost);
      });
    });
  });
});
