const logger = (req, res, next) => {
  console.log(req.body)
  console.log(req.path)
  console.log(req.method)
  next()
}

module.exports = {
  logger
}
