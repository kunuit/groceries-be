const resSuccess = (res, data) => {
  return res.send({ statusCode: 200, data });
};

const resError = (res, data) => {
  return res.send({ statusCode: 400, data });
};

const resErrorExpireToken = (res, data) => {
  return res.send({ statusCode: 202, data });
};

module.exports = {
  resSuccess,
  resError,
  resErrorExpireToken,
};
