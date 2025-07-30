const errorHandler = require('../../../src/middleware/errorHandler');

describe('errorHandler middleware', () => {
  it('should return the correct status and message from error object', () => {
    const err = { status: 400, message: 'Bad Request' };
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Bad Request',
    });
  });

  it('should return 500 and default message if error object is empty', () => {
    const err = {};
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'Internal Server Error',
    });
  });
});
