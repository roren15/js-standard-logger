# js-standard-logger

A useful standard Logger for JS, based on winston, formatting simple output for log, saving to demanded path.
Common output as: ` [2018-12-11 09:41:19] [info] [default-label] --- it s info `

## 1. install

```bash
$ npm install --save js-standard-logger
```

## 2. usage

```javascript

const Logger = require('js-standard-logger')
const logger = new Logger('/data/logs/log-save-dir/', 'log-name.log','default-label') // initialize


logger.exec('it s info') // default for info level output
//[2018-12-11 09:41:19] [info] [default-label] --- it s info

logger.exec(`${Logger.stringify({it:'can be object',also:['can','be','array']})}`,Logger.WARN()) // choose diff level
//[2018-12-11 09:41:19] [warn] [default-label] --- {"it":"can be object","also":["can","be","array"]}

logger.exceptionThrows('log and throw err') // do log and throw err, which required try-catch
//[2018-12-11 09:41:19] [error] [default-label] --- log and throw err
```

## 3. api

### Init

```
const Logger = require('standard-logger')
const logger = new Logger('dir_path_to_save_log', 'log_name.log','label_to_tag')
```

|arguments|required|description|
|:------:|:------:|------|
|log_save_dir|true|dir path to save log (auto mkdir if not exists)|
|log_name|true|eg. "app.log"|
|label|false|label to differ log|

### Function

#### logger.exec()

Do log on message with different level

|arguments|required|description|
|:------:|:------:|------|
|message|true|message to log|
|level|false|tag the label according to level field, default to info|

#### logger.exceptionThrows()

Do log on message and throw error, which recommended to catch outside

|arguments|required|description|
|:------:|:------:|------|
|message|true|message to log|
|level|false|tag the label according to level field, default to error|

#### Logger.stringify()

Transform object to string for log

|arguments|required|description|
|:------:|:------:|------|
|object|true|stringify object type to do log|

### Field

Different level fields to choose

| Fields | Level | Description |
|:------:|:------:|------|
| Logger.debug() | debug | tags for development debug |
| Logger.info() | information | tags for information |
| Logger.warn() | warning | tags for that be bad for some features |
| Logger.error() | error | tags for that intercept process or functional crash |

