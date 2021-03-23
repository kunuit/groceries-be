const resSuccess = (res, data) => {
  return res.send({ statusCode: 200, data });
};

const resError = (res, data) => {
  return res.send({ statusCode: 400, data });
};

module.exports = {
  resSuccess,
  resError,
};
