exports.newError = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  return err;
};
