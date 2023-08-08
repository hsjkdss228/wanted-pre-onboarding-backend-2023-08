import request from 'supertest';

import context from 'jest-plugin-context';

import server from '../../../app';

jest.mock('reflect-metadata', () => jest.fn());
jest.mock('../../data-source', () => ({
  initialize: jest.fn(),
}));

const postsDto = [
  {
    id: 1,
    title: '제목 1',
    descriptionText: '내용 1',
  },
  {
    id: 2,
    title: '제목 2',
    descriptionText: '내용 2',
  },
];

jest.mock(
  '../../repositories/PostRepository',
  () => ({
    postRepository: {
      find: jest.fn(() => postsDto),
    },
  }),
);

describe('postRoutes', () => {
  afterAll(() => {
    server.close();
  });

  context('GET /posts', () => {
    it('posts 응답을 반환', (done) => {
      request(server).get('/posts')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(postsDto)
        .end(done);
    });
  });
});
