# js-standard-logger

A useful standard Logger for JS, based on winston

## 1. install

```bash
$ npm install --save
```

## 2. usage

```javascript

const Logger = require('standard-logger')
const logger = new Logger('/data/logs/log-save-dir/', 'log-name.log','default-label') // initialize


logger.exec('it s info') // default for info level output
//[2018-12-11 09:41:19] [info] [DEFAULT] --- it s info

logger.exec(`${Logger.stringify({it:'can be object',also:['can','be','array']})}`,Logger.WARN()) // choose diff level
//[2018-12-11 09:41:19] [warn] [DEFAULT] --- {"it":"can be object","also":["can","be","array"]}

logger.exceptionThrows('log and throw err') // do log and throw err, which required try-catch
//[2018-12-11 09:41:19] [error] [DEFAULT] --- log and throw err
```
