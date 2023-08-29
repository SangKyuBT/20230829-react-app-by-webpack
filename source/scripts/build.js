const webpack = require('webpack')
const configFactory = require( '../config/webpack.config' )

const mode = 'production'
const webpackConfig = configFactory( mode )

webpack( webpackConfig, ( err, stats ) => {
  if( err || stats.hasErrors() ) {
    console.error( err || stats.toString() )
    return
  }
  console.log( stats.toString() )
} )