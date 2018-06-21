var merge = require('webpack-merge')
var stagingEnv = require('./staging.env')

let envVal = merge(stagingEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://api.mw006.net/"',
  // API_ROOT: '"http://api.oneph.top/"',
  // API_ROOT: '"http://api.local.com:3000/"',
  CABLE_ROOT: '"http://api.mw006.net/"',
  Payment_ROOT: '"http://13.124.248.111"'
  // PAYMENT_ROOT: '"http://localhost:7000"'
})
module.exports = envVal
