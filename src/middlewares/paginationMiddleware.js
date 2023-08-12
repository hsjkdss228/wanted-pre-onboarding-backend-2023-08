import PageOrCountIsEmpty from '../exceptions/pagination/PageOrCountIsEmpty';
import InvalidPageOrCount from '../exceptions/pagination/InvalidPageOrCount';

const isNumeric = (input) => /^\d+$/.test(input);

const paginationMiddleware = (request, response, next) => {
  try {
    const { page, count } = request.query;

    if (!page || !count) {
      throw new PageOrCountIsEmpty();
    }

    if (!isNumeric(page) || !isNumeric(count)) {
      throw new InvalidPageOrCount();
    }

    next();
  } catch (error) {
    if (error instanceof PageOrCountIsEmpty || InvalidPageOrCount) {
      response.status(400)
        .type('text/html')
        .send(error.message);
    } else {
      response.status(500)
        .type('text/html')
        .send('Internal Server Error');
    }
  }
};

export default paginationMiddleware;
