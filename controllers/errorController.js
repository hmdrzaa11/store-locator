module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    let value = err.errmsg.match(/["']\w+["']/)[0];
    let message = `already a filed with this "${value} exists"`;
    return res.status(400).json({
      success: false,
      error: message,
    });
  }
  res.send(err);
};
