module.exports = (error, req, res, next) => {
  console.log('500 middleware invoked');
  res.status(500).send('Error >>>>', error.message);
};