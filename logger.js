const winston = require('winston')
const {format} = require('winston')

const logger = winston.createLogger({
    level : 'info',
    format : winston.format.json(),
})

if(process.env.NODE_ENV !== 'production'){
    // 개발모드인 경우
    logger.add(new winston.transports.Console({format:format.simple()}))
}

module.exports = logger