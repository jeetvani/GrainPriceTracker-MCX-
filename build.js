const { compile } = require('nexe')

compile({
  input: './bhavupdate.js',
  build: true, //required to use patches
  
  verbose: true
}).then(() => {
  console.log('success')
})