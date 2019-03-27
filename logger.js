'use strict'

const fs = require('fs-extra')
const winston = require('winston')
const {format} = require('winston')
const {combine, timestamp, label, printf} = format;
const JSON = require('circular-json')
const utils = require('./utils')
const path = require('path')

const formatter = printf(info => {
  return `[${info.timestamp}] [${info.level}] [${info.label}] --- ${info.message}`
})

/**
 * log for diff level message even throws err
 */
class Logger {

  constructor(log_save_dir, log_save_file = 'app.log', input_label, view_level = Logger.DEBUG()) {
    if (!utils.checkArgsNotNull(...[log_save_dir])) {
      throw new Error('err arguments')
    }
    if (fs.emptyDirSync(log_save_dir)) {
      fs.mkdirpSync(log_save_dir)
    }
    if (!input_label) {
      input_label = log_save_file
    }
    this._label = input_label
    this._log_path = path.join(log_save_dir, log_save_file)
    this._view_level = view_level
    this._logger = null
    this._init()
  }

  /**
   * init Logger
   * @private
   */
  _init() {

    this._logger = this._initLogger(this._label, this._generateLoggerFileConfig(this._log_path))
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
   * @param pretty
   * @returns {*}
   */
  static stringify(data, pretty = false) {
    return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)
  }

  /**
   * get inspected object
   * @param data
   */
  static inspect(data) {
    return utils.inspect(data)
  }

  /**
   * execute logger for diff level logging
   * @param message: logging message
   * @param level: logging level
   * @param err: (optional) Error instance
   * @returns {Promise<Error|String>} message
   */
  async exec(message = {}, level = Logger.INFO(), err) {

    if (utils.checkFuncExists(level, this._logger)) {
      const msg = utils.judgeNotNull(err) && err instanceof Error ? `${message} . err stack : ${err.stack}` : message
      this._logger[level](msg)
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
      maxsize: 10 * 1024 * 1024 * 1024,
      maxFiles: 0,
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
      ],
      level: this._view_level
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