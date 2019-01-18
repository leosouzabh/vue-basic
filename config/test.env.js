'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  URL: '"https://api-data-lineage-hmg.maxmilhas.com.br"',
  AUTH_URL: '"http://localhost:3001"'
})
