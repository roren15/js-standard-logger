'use strict'

const Logger = require('./logger')
const logger = new Logger('/data/logs/logger-sample/', 'app.log')

try {
  logger.exec('it s info')
  logger.exec('it s err', Logger.ERROR())
  logger.exceptionThrows('throw err')
} catch (err) {
  logger.exec('catch err for warn', Logger.WARN())
}