import { jwtUtil } from '../utils/JwtUtil';

const authenticationMiddleware = (request, response, next) => {
  try {
    const { authorization } = request.headers;
    const accessToken = authorization.substring('Bearer '.length);

    const userId = jwtUtil.decode(accessToken);
    request.userId = userId;
    next();
  } catch (error) {
    response.status(400)
      .type('text/html')
      .send('Access Token이 없거나 잘못되었습니다.');
  }
};

export default authenticationMiddleware;
