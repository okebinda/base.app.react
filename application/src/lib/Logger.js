import Config from '../Config';

class Logger {

  constructor(environment, level) {

    this.environment = environment; // production, development, test
    this.level = level; // error, warn, info, verbose, debug, silly

    this.levelCodes = {
      'error': 1,
      'warn': 2,
      'info': 3,
      'verbose': 4,
      'debug': 5,
      'silly': 6
    }
  }

  log(level, ...message) {
    if (this.environment === 'development' && this.levelCodes[level] <= this.levelCodes[this.level]) {
      console.log(`${level}: `, message.map(x => JSON.stringify(x)).join("\n\t"));
    }
  }
};

logger = new Logger(Config.get('ENVIRONMENT', 'production'), Config.get('LOG_LEVEL', 'error'));
export default logger;

logger.log('silly', `Logger loaded.`);
