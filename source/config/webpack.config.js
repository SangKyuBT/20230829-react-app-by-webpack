const path = require( 'path' )

const appDir = process.cwd()
const getAbsolutePath = pathDir => path.resolve( appDir, pathDir )

module.exports = () => {
  return {
    entry: { //프로젝트의 진입점(entry point)
      main: './src/index.js',
    },
    output: { //번들링된 결과물 출력
      path: getAbsolutePath( 'dist' ),
      filename: 'assets/js/[name].[contenthash:8].js',
      publicPath: '/',
    }
  }
}