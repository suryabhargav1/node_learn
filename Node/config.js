/*
* creates and exports config variables
*
*/

// Container fo r all the enviornments
var enviornments = {};

// staging object enviornment default
enviornments.staging = {
  'port' : 3000,
  'envName' : 'staging'
}

// production object enviornment
enviornments.production = {
  'port' :5000,
  'envName' : 'production'
}

// Determining which should be exported as mentioned in cmd
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check that current enviornment is one oj defined if not default to staging
var environmentToExport = typeof(enviornments[currentEnvironment]) == 'object' ? enviornments[currentEnvironment] : enviornments.staging;

//Export The module
module.exports = environmentToExport;
