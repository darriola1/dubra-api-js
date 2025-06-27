export default class CustomError extends Error {
  // statusCode property will be assigned in the constructor

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(message) {
    return new CustomError(message, 400);
  }

  static unauthorized(message) {
    return new CustomError(message, 401);
  }

  static notFound(message) {
    return new CustomError(message, 404);
  }

  static internal(message) {
    return new CustomError(message, 500);
  }
}
