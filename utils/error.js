function error(message = "Something Went Wrong", statusCode = 500) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

module.exports = error;
