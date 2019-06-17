// Import configurations
const environment = process.env.NODE_ENV || 'development';

// Select environment mode
if (environment === 'development' || environment === 'test') {
  // Import config file
  const { environmentConfigurations } = require('./config')
  // Getting configurations
  try {
    var config = 
    config = {
      ...environmentConfigurations[environment],
      isProduction: true,
    }
  } catch(e) {
    console.error("Read section 'Environment Configurations' in the README.md" );
    process.exit(1)
  }

  // Set config on process.env
  for (let key in config) {
    process.env[key] = config[key]
  }
} else if (environment === 'production') {
  // Set new configurations
  var config = {
    jwtSecret: process.env.JWT_SECRET,
    mongoDBURI: process.env.MONGOLAB_ROSE_URI,
    port: process.env.PORT,
    isProduction: true,
  }

  // Validating configurations
  for (let key in config) {
    if (config[key] === undefined) {
      console.error(`Set the environment variable ${key} in production`)
      process.exit(1)
    }
  }
}

export {
  environment,
  config
}
