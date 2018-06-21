var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  API_ROOT: '"http://api.mw006.net/"',
  CABLE_ROOT: '"ws://ws.mw006.net"',
  PAYMENT_ROOT: '"http://52.78.74.208"'
})
