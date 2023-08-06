import request from 'supertest';

import context from 'jest-plugin-context';

import server from '../../app';

describe('homeRoutes', () => {
  afterAll(() => {
    server.close();
  });

  context('GET /', () => {
    it('\'Hello, world!\' 응답을 반환', (done) => {
      request(server).get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/)
        .expect('Hello, world!')
        .end(done);
    });
  });
});
