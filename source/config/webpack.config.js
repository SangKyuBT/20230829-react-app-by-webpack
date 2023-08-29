const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

const appDir = process.cwd()
const getAbsolutePath = pathDir => path.resolve( appDir, pathDir )

module.exports = ( webpackEnv  ) => {
  const isProd = webpackEnv === 'production'

  return {
    entry: { //프로젝트의 진입점(entry point)
      main: './src/index.js',
    },
    output: { //번들링된 결과물 출력
      path: getAbsolutePath( 'dist' ),
      filename: 'assets/js/[name].[contenthash:8].js',
      publicPath: '/',
    },
    plugins: [ //빌드 과정을 확장, 추가 기능을 제공한다.
      new HtmlWebpackPlugin( {
        template: getAbsolutePath( 'public/index.html' ),
        inject: true
      } )
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                configFile: getAbsolutePath( 'config/babel.config.js' ),
                envName: isProd ? 'production' : 'development'
              }
            }
          ]
        }
      ]
    }
  }
}