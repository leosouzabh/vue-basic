'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL: '"http://localhost:3000"',
  AUTH_URL: '"http://localhost:3001"'
})