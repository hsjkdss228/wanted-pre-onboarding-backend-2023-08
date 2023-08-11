import context from 'jest-plugin-context';

import CreatePostService from './CreatePostService';

import User from '../../models/user/User';

import UserNotFound from '../../exceptions/user/UserNotFound';

const findBy = jest.fn();

jest.mock(
  '../../repositories/UserRepository',
  () => ({
    userRepository: {
      findBy: () => findBy(),
    },
  }),
);

const save = jest.fn();

jest.mock(
  '../../repositories/PostRepository',
  () => ({
    postRepository: {
      save: () => save(),
    },
  }),
);

let createPostService;

describe('CreatePostService', () => {
  beforeEach(() => {
    createPostService = new CreatePostService();
  });

  const createPostRequestDto = {
    title: '제목 11111111',
    descriptionText: '내용 @@@@@@@@@@@@',
  };

  context('createPost', () => {
    beforeEach(() => {
      findBy.mockClear();
      save.mockClear();
    });

    context('정상적인 userId가 주어진 경우', () => {
      const userId = 135;
      const user = new User({
        id: userId,
        email: 'hsjkdss228@naver.com',
      });
      const postId = 12;

      beforeEach(() => {
        findBy.mockReturnValue(user);
        save.mockReturnValue(postId);
      });

      it('생성된 Post의 id를 DTO에 포함해 반환', async () => {
        const createPostResultDto = await createPostService
          .createPost({
            userId,
            createPostRequestDto,
          });

        expect(createPostResultDto).toStrictEqual({ postId });
      });
    });

    context('사용자가 존재하지 않는 경우', () => {
      beforeEach(() => {
        findBy.mockReturnValue(null);
      });

      it('UserNotFound 예외를 발생', () => {
        expect(async () => {
          await createPostService.createPost(createPostRequestDto);
        }).rejects.toThrow(UserNotFound);
      });
    });
  });
});
