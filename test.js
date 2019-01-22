'use strict'

const Logger = require('./logger')
const logger = new Logger('/data/logs/logger-sample', 'test.log', 'test', Logger.WARN())

try {
  logger.exec('it s info')
  logger.exec('it s debug', Logger.DEBUG())
  logger.exec(`${Logger.stringify({it: 'can be object', also: ['can', 'be', 'array']})}`, Logger.WARN())
  logger.exceptionThrows('log and throw err')
} catch (err) {
  logger.exec('catch err for warn', Logger.WARN())
}