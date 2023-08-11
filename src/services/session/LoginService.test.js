import context from 'jest-plugin-context';

import LoginService from './LoginService';

import User from '../../models/user/User';

import UserNotFound from '../../exceptions/user/UserNotFound';
import IncorrectPassword from '../../exceptions/login/IncorrectPassword';

const findBy = jest.fn();

jest.mock(
  '../../repositories/UserRepository',
  () => ({
    userRepository: {
      findBy: () => findBy(),
    },
  }),
);

const encode = jest.fn();

jest.mock(
  '../../utils/JwtUtil',
  () => ({
    jwtUtil: {
      encode: () => encode(),
    },
  }),
);

let loginService;

describe('LoginService', () => {
  beforeEach(() => {
    loginService = new LoginService();
  });

  let user;

  const loginRequestDto = {
    email: 'hsjkdss228@naver.com',
    password: 'Password!1',
  };
  const accessToken = 'ACCESS_TOKEN';

  context('login', () => {
    beforeEach(() => {
      findBy.mockClear();
      encode.mockClear();
    });

    context('정상적인 email, password가 주어진 경우', () => {
      beforeEach(async () => {
        user = new User({
          id: 1,
          email: loginRequestDto.email,
        });
        await user.changePassword(loginRequestDto.password);

        findBy.mockReturnValue(user);
        encode.mockReturnValue(accessToken);
      });

      it('Access Token을 DTO에 포함해 반환', async () => {
        const loginResultDto = await loginService.login(loginRequestDto);

        expect(loginResultDto).toStrictEqual({ accessToken });
      });
    });

    context('사용자가 존재하지 않는 경우', () => {
      beforeEach(() => {
        findBy.mockReturnValue(null);
      });

      it('UserNotFound 예외를 발생', () => {
        expect(async () => {
          await loginService.login(loginRequestDto);
        }).rejects.toThrow(UserNotFound);
      });
    });

    context('비밀번호가 일치하지 않는 경우', () => {
      beforeEach(async () => {
        user = new User({
          id: 2,
          email: loginRequestDto.email,
        });
        await user.changePassword('OtherPassword@2');

        findBy.mockReturnValue(user);
      });

      it('IncorrectPassword 예외를 발생', () => {
        expect(async () => {
          await loginService.login(loginRequestDto);
        }).rejects.toThrow(IncorrectPassword);
      });
    });
  });
});
