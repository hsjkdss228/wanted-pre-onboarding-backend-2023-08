import context from 'jest-plugin-context';
import SignUpService from './SignUpService';

const save = jest.fn();

jest.mock(
  '../../repositories/UserRepository',
  () => ({
    userRepository: {
      save: () => save(),
    },
  }),
);

let signUpService;

describe('SignUpService', () => {
  beforeEach(() => {
    signUpService = new SignUpService();
  });

  context('회원가입 정보가 전달되면', () => {
    const userId = 1;

    beforeEach(() => {
      save.mockReturnValue(userId);
    });

    it('User Entity를 생성해 저장, 생성된 id를 DTO에 포함시켜 반환', async () => {
      const signUpRequestDto = {
        email: 'hsjkdss228@naver.com',
        password: 'Password!1',
      };

      const signUpResultDto = await signUpService.signUp(signUpRequestDto);

      expect(signUpResultDto).toStrictEqual({ userId });
    });
  });
});
