# js-standard-logger

A useful standard Logger for JS, based on winston, formatting simple output for log, saving to demanded path.
Common output as: ` [2018-12-11 09:41:19] [info] [sample-label] --- it s info `

[![npm install js-standard-logger](https://nodei.co/npm/js-standard-logger.png?mini=true)](https://www.npmjs.com/package/js-standard-logger)

## 1. Install

```bash
$ npm install --save js-standard-logger
```

## 2. Usage

```javascript
const Logger = require('js-standard-logger')
const logger = new Logger('/data/logs/logger-sample/') // simply initialize


logger.exec('it s info') // default for info level output
//[2018-12-11 09:41:19] [info] [sample-label] --- it s info

logger.exec(`${Logger.stringify({it:'can be object',also:['can','be','array']}, true)}`,Logger.WARN()) // choose diff level
//[2019-03-27 14:20:55] [warn] [test] --- {
//  "it": "can be object",
//  "also": [
//    "can",
//     ...
//  ]
//}

logger.exceptionThrows('log and throw err') // do log and throw err, which required try-catch
//[2018-12-11 09:41:19] [error] [sample-label] --- log and throw err

logger.exec('it s error', Logger.ERROR(), new TypeError('get type error')) // log err stack
//[2019-01-29 09:29:43] [error] [test] --- it s error . err stack : TypeError: get type error
//    at Object.<anonymous> (/home/roren/Documents/source/self/logger/test.js:9:45)
//    at Module._compile (internal/modules/cjs/loader.js:686:14)
//    ...
```

## 3. Api

### Init

Please fill with absolute path.

```javascript
const Logger = require('js-standard-logger')
const logger = new Logger('/data/logs/log-save-dir/', 'log-name.log','default-label', Logger.INFO()) 
```

|arguments|required|description|
|:------:|:------:|------|
|log_save_dir|true|dir abstract path to save log (auto mkdir if not exists)|
|log_name|false|default to "app.log"|
|label|false|label to differ log, default to log_name|
|view_level|false|choose viewing output level, using Logger fields, default to debug|

### Function

#### logger.exec()

Do log on message with different level

|arguments|required|description|
|:------:|:------:|------|
|message|true|message to log|
|level|false|tag the label according to level field, default to info|
|err|false|Error instance, will logged stack|

#### logger.exceptionThrows()

Do log on message and throw error, which recommended to catch outside

|arguments|required|description|
|:------:|:------:|------|
|message|true|message to log|
|level|false|tag the label according to level field, default to error|

#### Logger.inspect()

inspect object to view

|arguments|required|description|
|:------:|:------:|------|
|object|true|inspect object|

#### Logger.stringify()

Transform object to string when logging

|arguments|required|description|
|:------:|:------:|------|
|object|true|stringify object type to do log|
|pretty|false|pretty json output, default false|

### Field

Different level fields to choose

| Fields | Level | Description |
|:------:|:------:|------|
| Logger.DEBUG() | debug | tags for development debug |
| Logger.INFO() | information | tags for information |
| Logger.WARN() | warning | tags for that be bad for some features |
| Logger.ERROR() | error | tags for that intercept process or functional crash |

