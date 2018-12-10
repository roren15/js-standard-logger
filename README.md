# js-standard-logger

A useful standard Logger for JS, based on winston

## 1. install

```bash
$ npm install --save
```

## 2. usage

```javascript
const Logger = require('standard-logger')
const logger = new Logger('/data/logs/log-save-dir/', 'app.log','default-label') // initialize

logger.exec('it s info') // default for info level output
logger.exec(`${Logger.stringify({it:'can be object'})}`,Logger.WARN()) // choose diff level

logger.exceptionThrows('log and throw err') // do log and throw err
```
