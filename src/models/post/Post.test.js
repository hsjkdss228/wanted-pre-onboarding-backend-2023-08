import context from 'jest-plugin-context';

import Post from './Post';
import User from '../user/User';

describe('Post', () => {
  let post;

  context('postedBy', () => {
    beforeEach(() => {
      post = new Post({
        id: 1,
        userId: 1,
        title: 'ㅋ',
        descriptionText: 'ㅌ',
        deleted: false,
      });
    });

    let user;

    context('userId와 user의 id가 일치하면', () => {
      beforeEach(() => {
        user = new User({
          id: post.id,
          email: 'hsdjkdss228@naver.com',
        });
      });

      it('post의 작성자는 user', () => {
        expect(post.postedBy(user)).toBeTruthy();
      });
    });

    context('userId와 user의 id가 일치하지 않으면', () => {
      beforeEach(() => {
        user = new User({
          id: 234567,
          email: 'seungjjun@gmail.com',
        });
      });

      it('post의 작성자는 user가 아님', () => {
        expect(post.postedBy(user)).toBeFalsy();
      });
    });
  });
});
