'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://result.eolinker.com/EhYv3BG504ba7d4bae995f176464387ca1a18a929dd686d?uri="',
})
