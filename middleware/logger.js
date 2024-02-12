const logger = require("../config/logger");

const Logger = (req,res,next) => {
  logger.log("info",{pathName:req['originalUrl'],userAgent:req.headers['user-agent']});

  next();
};

module.exports = Logger;
