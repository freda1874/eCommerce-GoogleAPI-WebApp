const { createLogger, format, transports } = require('winston');

const loggerX = createLogger({
    level: 'info',
    format: format.json(),
    transports: [new transports.Console()],
  });

function loggerXTest() {
    loggerX.info('Info message');
    loggerX.error('Error message');
    loggerX.warn('Warning message');    
}

function loggerXPost(msg){
    loggerX.info(msg);
}

function loggerPost(msg){
  logger.info(msg);
}

/* Example start */

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'shopful-logger' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'warning.log', level: 'warn' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

// // ***************
// // Allows for JSON logging
// // ***************

// logger.log({
//   level: 'info',
//   message: 'Pass an object',
//   additional: 'properties',
//   are: 'passed along'
// });

// logger.info({
//   message: 'Use a helper method',
//   additional: 'properties',
//   are: 'passed along'
// });

// // ***************
// // Allows for parameter-based logging
// // ***************

// logger.log('info', 'Pass a message', {
//   additional: 'properties',
//   are: 'passed along'
// });

// logger.info('Use a helper method', {
//   additional: 'properties',
//   are: 'passed along'
// });

// // ***************
// // Allows for string interpolation
// // ***************

// // info: test message my string {}
// logger.log('info', 'test message %s', 'my string');

// // info: test message 123 {}
// logger.log('info', 'test message %d', 123);

// // info: test message first second {number: 123}
// logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

// // prints "Found error at %s"
// logger.info('Found %s at %s', 'error', new Date());
// logger.info('Found %s at %s', 'error', new Error('chill winston'));
// logger.info('Found %s at %s', 'error', /WUT/);
// logger.info('Found %s at %s', 'error', true);
// logger.info('Found %s at %s', 'error', 100.00);
// logger.info('Found %s at %s', 'error', ['1, 2, 3']);

// // ***************
// // Allows for logging Error instances
// // ***************

// logger.warn(new Error('Error passed as info'));
// logger.log('error', new Error('Error passed as message'));

// logger.warn('Maybe important error: ', new Error('Error passed as meta'));
// logger.log('error', 'Important error: ', new Error('Error passed as meta'));

// logger.error(new Error('Error as info'));

// Export the 'scrape' functions as the default export of this module
module.exports = { 
    loggerXPost,
    loggerXTest,
    loggerPost
}
