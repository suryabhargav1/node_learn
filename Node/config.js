/*
* creates and exports config variables
*
*/

// Container fo r all the enviornments
var enviornments = {};

// staging object enviornment default
enviornments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging'
}

// production object enviornment
enviornments.production = {
  'httpPort' :5000,
  'httpsPort' : 5001,
  'envName' : 'production'
}

// Determining which should be exported as mentioned in cmd
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check that current enviornment is one oj defined if not default to staging
var environmentToExport = typeof(enviornments[currentEnvironment]) == 'object' ? enviornments[currentEnvironment] : enviornments.staging;

//Export The module
module.exports = environmentToExport;
