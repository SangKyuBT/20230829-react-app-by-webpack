const webpack = require('webpack')
const configFactory = require( '../config/webpack.config' )
const WebpackDevServer = require( 'webpack-dev-server' )
const devServerConfig = require( '../config/webpackDevServer.config' )

const mode = 'development'
const port = 3000

const webpackConfig = configFactory( mode )
const compiler = webpack( webpackConfig )
const server = new WebpackDevServer( compiler, { ...devServerConfig, port } )

server.startCallback( ( err ) => {
  if( err ) {
    console.log( err )
  }
} )