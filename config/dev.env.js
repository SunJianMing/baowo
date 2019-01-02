'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:50010"',
  FILE_SERVER_URL: '"http://127.0.0.1:80/files"'
  // BASE_API: '"http://192.168.100.14:40014/server"'  //  公司测试服务器
})
