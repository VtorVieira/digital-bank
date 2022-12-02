class CustomError extends Error {
  constructor(status, code, message) {
    super(message);
    console.log('middleError', status, code);
    this.status = status;
    this.code = code;
  }
}

module.exports = { CustomError };