// Lists out all the environment variables that the app uses
// Either a string or an object with default value
module.exports = [
  'npm_package_name', // app name
  'npm_package_version', // app version
  {'PORT': 4101}, // The port in which the app runs
  {'HOST': '0.0.0.0'}, // The ip or hostname that the app listens on
  'NODE_ENV',
  {'EXPRESS_LOG_FORMAT': 'tiny'} , // The Express logging format
  {'BUNYAN_LOGLEVEL': 'error'}, // Default bunyan log level
  {'LOGGLY_LOGLEVEL': 'error'}, // Loggly log level: defaults to errors only
  'LOGGLY_SUBDOMAIN', // Loggly subdomain
  'LOGGLY_TOKEN', // Loggly token,
  'ADMIN_KEY', // Used in the config, debug, diagnostics routes
  'REDIS_HOST', // Redis ip
  {'REDIS_PORT': 6379}, // Redis port
  'REDIS_PASSWORD' // Redis pwd
];
