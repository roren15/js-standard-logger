'use strict'

const fs = require('fs-extra')
const winston = require('winston')
const {format} = require('winston')
const {combine, timestamp, label, printf} = format;
const JSON = require('circular-json')
const utils = require('./utils')

const formatter = printf(info => {
  return `[${info.timestamp}] [${info.level}] [${info.label}] --- ${info.message}`
})

/**
 * log for diff level message even throws err
 */
class Logger {

  constructor(log_save_dir, log_save_file, input_label = 'DEFAULT') {
    if (!utils.checkArgsNotNull(arguments)) {
      throw new Error('err arguments')
    }
    if (fs.emptyDirSync(log_save_dir)) {
      fs.mkdirpSync(log_save_dir)
    }
    this._label = input_label
    this._logger = this._initLogger(input_label, this._generateLoggerFileConfig(log_save_dir + log_save_file))
  }

  /**
   * tags for that intercept process or functional crash
   * @returns {string}
   * @constructor
   */
  static ERROR() {
    return 'error'
  }

  /**
   * tags for that be bad for some features
   * @returns {string}
   * @constructor
   */
  static WARN() {
    return 'warn'
  }

  /**
   * tags for information
   * @returns {string}
   * @constructor
   */
  static INFO() {
    return 'info'
  }

  /**
   * tags for debug
   * @returns {string}
   * @constructor
   */
  static DEBUG() {
    return 'debug'
  }

  /**
   * stringify circular json
   * @param data
   * @returns {*}
   */
  static stringify(data) {
    return JSON.stringify(data)
  }

  /**
   * execute logger for diff level logging
   * @param message: logging message
   * @param level: logging level
   * @returns {Promise<Error|String>} message
   */
  async exec(message = {}, level = Logger.INFO()) {

    if (utils.checkFuncExists(level, this._logger)) {
      this._logger[level](message)
    } else {
      const errMes = 'cannot find this level logger'
      this._logger.error(errMes)
    }
    return level === Logger.ERROR() || level === Logger.WARN() ? new Error(message) : message
  }

  /**
   * do logging and throws err
   * @param msg: logging message
   * @param level: logging level
   */
  exceptionThrows(msg = 'throws error', level = Logger.ERROR()) {

    this.exec(msg, level)
    throw new Error(msg)
  }

  _generateLoggerFileConfig(logFile) {

    return {
      filename: logFile,
      maxsize: 1048576,
      maxFiles: 10,
      colorize: false,
      options: {
        flags: 'a'
      },
    }
  }

  /**
   * initialize winston instance
   * @param input_label
   * @param loggerFileConfig
   * @returns {winston.Logger}
   * @private
   */
  _initLogger(input_label, loggerFileConfig) {

    return winston.createLogger({
      format: combine(
          label({
            label: input_label
          }),
          timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          formatter
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File(loggerFileConfig)
      ]
    })
  }

  /**
   * get winston instance
   * @returns {Logger|*}
   */
  getLogger() {
    return this._logger
  }
}

module.exports = Logger