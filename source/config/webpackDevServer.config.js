const path = require( 'path' )
const appDir = process.cwd()
const getAbsolutePath = pathDir => path.resolve( appDir, pathDir )

module.exports = {
  static: {
    directory: getAbsolutePath( 'public' )
  },
  hot: true,
  compress: true,
  historyApiFallback: true,
  open: true
}