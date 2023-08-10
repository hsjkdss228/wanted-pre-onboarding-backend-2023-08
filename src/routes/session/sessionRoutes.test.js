import request from 'supertest';

import context from 'jest-plugin-context';

import server from '../../../app';

jest.mock('reflect-metadata', () => jest.fn());
jest.mock('../../data-source', () => ({
  initialize: jest.fn(),
}));

const login = jest.fn();

jest.mock(
  '../../services/session/LoginService',
  () => ({
    loginService: {
      login: () => login(),
    },
  }),
);

describe('sessionRoutes', () => {
  afterAll(() => {
    server.close();
  });

  context('POST /session', () => {
    let loginRequestDto;

    beforeEach(() => {
      login.mockClear();
    });

    context('email, password가 올바르게 주어진 경우', () => {
      const loginResultDto = { accessToken: 'ACCESS_TOKEN' };

      beforeEach(() => {
        loginRequestDto = {
          email: 'hsjkdss228@naver.com',
          password: 'Password!1',
        };
        login.mockReturnValue(loginResultDto);
      });

      it('인코딩된 ACCESS_TOKEN 응답을 반환', (done) => {
        request(server).post('/session')
          .accept('application/json')
          .send(loginRequestDto)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .expect(loginResultDto)
          .end(() => {
            expect(login).toBeCalled();
            done();
          });
      });
    });

    context('email을 입력하지 않은 경우', () => {
      beforeEach(() => {
        loginRequestDto = {
          email: '',
          password: 'Password!1',
        };
      });

      it('EmptyLoginInput 응답을 반환', (done) => {
        request(server).post('/session')
          .accept('application/json')
          .send(loginRequestDto)
          .expect(400)
          .expect('Content-Type', /text\/html/)
          .expect('아이디나 비밀번호를 입력하지 않았습니다.')
          .end(() => {
            expect(login).not.toBeCalled();
            done();
          });
      });
    });

    context('password를 입력하지 않은 경우', () => {
      beforeEach(() => {
        loginRequestDto = {
          email: 'hsjkdss228@naver.com',
          password: '',
        };
      });

      it('EmptyLoginInput 응답을 반환', (done) => {
        request(server).post('/session')
          .accept('application/json')
          .send(loginRequestDto)
          .expect(400)
          .expect('Content-Type', /text\/html/)
          .expect('아이디나 비밀번호를 입력하지 않았습니다.')
          .end(() => {
            expect(login).not.toBeCalled();
            done();
          });
      });
    });
  });
});
