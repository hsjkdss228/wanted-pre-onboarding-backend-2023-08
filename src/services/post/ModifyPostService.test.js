import context from 'jest-plugin-context';

import ModifyPostService from './ModifyPostService';

import User from '../../models/user/User';
import Post from '../../models/post/Post';

import UserNotFound from '../../exceptions/user/UserNotFound';
import PostNotFound from '../../exceptions/post/PostNotFound';
import UserNotCreatedPost from '../../exceptions/post/UserNotCreatedPost';

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
const update = jest.fn();

jest.mock(
  '../../repositories/PostRepository',
  () => ({
    postRepository: {
      findOneBy: () => postFindOneBy(),
      update: () => update(),
    },
  }),
);

let modifyPostService;

describe('ModifyPostService', () => {
  beforeEach(() => {
    modifyPostService = new ModifyPostService();
  });

  const userId = 1;
  const postId = 2;
  const modifyPostRequestDto = {
    title: '제목 11111111',
    descriptionText: '내용 @@@@@@@@@@@@',
  };

  let spyModify;

  context('createPost', () => {
    beforeEach(() => {
      userFindBy.mockClear();
      postFindOneBy.mockClear();
      update.mockClear();
    });

    context('정상적인 userId, postId, modifyPostRequestDto가 주어진 경우', () => {
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

        spyModify = jest.spyOn(post, 'modify');
      });

      it('post.modify(), postRepository.update() 메서드를 호출', async () => {
        await modifyPostService.modifyPost({
          userId,
          postId,
          modifyPostRequestDto,
        });

        expect(spyModify).toBeCalledWith(modifyPostRequestDto);
        expect(update).toBeCalled();
      });
    });

    context('user가 존재하지 않는 경우', () => {
      beforeEach(() => {
        userFindBy.mockReturnValue(null);
      });

      it('UserNotFound 예외를 발생', () => {
        expect(async () => {
          await modifyPostService.modifyPost({
            userId,
            postId,
            modifyPostRequestDto,
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
          await modifyPostService.modifyPost({
            userId,
            postId,
            modifyPostRequestDto,
          });
        }).rejects.toThrow(PostNotFound);
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
          await modifyPostService.modifyPost({
            userId,
            postId,
            modifyPostRequestDto,
          });
        }).rejects.toThrow(UserNotCreatedPost);
      });
    });
  });
});
