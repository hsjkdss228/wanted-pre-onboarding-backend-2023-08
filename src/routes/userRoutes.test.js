import request from 'supertest';

import context from 'jest-plugin-context';

import server from '../../app';

jest.mock('reflect-metadata', () => jest.fn());
jest.mock('../data-source', () => ({
  initialize: jest.fn(),
}));

const signUp = jest.fn();

jest.mock(
  '../services/user/SignUpService',
  () => ({
    signUpService: {
      signUp: () => signUp(),
    },
  }),
);

describe('userRoutes', () => {
  afterAll(() => {
    server.close();
  });

  context('POST /users', () => {
    let signUpRequestDto;

    beforeEach(() => {
      signUp.mockClear();
    });

    context('email, password가 올바르게 주어진 경우', () => {
      const signUpResultDto = { userId: 1 };

      beforeEach(() => {
        signUpRequestDto = {
          email: 'hsjkdss228@naver.com',
          password: 'Password!1',
        };
        signUp.mockReturnValue(signUpResultDto);
      });

      it('생성된 User Entity의 id 응답을 반환', (done) => {
        request(server).post('/users')
          .accept('application/json')
          .send(signUpRequestDto)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .expect(signUpResultDto)
          .end(() => {
            expect(signUp).toBeCalled();
            done();
          });
      });
    });

    context('email이 올바르지 않은 경우', () => {
      beforeEach(() => {
        signUpRequestDto = {
          email: 'hsjkdss228',
          password: 'Password!1',
        };
      });

      it('InvalidSignUpInput 예외 응답을 반환', (done) => {
        request(server).post('/users')
          .accept('application/json')
          .send(signUpRequestDto)
          .expect(400)
          .expect('Content-Type', /text\/html/)
          .expect('유효하지 않은 이메일 혹은 비밀번호입니다.')
          .end(() => {
            expect(signUp).not.toBeCalled();
            done();
          });
      });
    });

    context('password가 올바르지 않은 경우', () => {
      beforeEach(() => {
        signUpRequestDto = {
          email: 'hsjkdss228@naver.com',
          password: 'Pwd!1',
        };
      });

      it('InvalidSignUpInput 예외 응답을 반환', (done) => {
        request(server).post('/users')
          .accept('application/json')
          .send(signUpRequestDto)
          .expect(400)
          .expect('Content-Type', /text\/html/)
          .expect('유효하지 않은 이메일 혹은 비밀번호입니다.')
          .end(() => {
            expect(signUp).not.toBeCalled();
            done();
          });
      });
    });
  });
});
