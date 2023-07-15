const logger = (req, res, next) => {
    console.log(`Time: ${new Date().toISOString()}`)
    next();
}

module.exports = { logger };