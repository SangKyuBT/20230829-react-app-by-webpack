const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

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
      } ),
      new CleanWebpackPlugin( {
        // dry 기본 값: false
        // dry: true,
        // verbose 기본 값: false
        verbose: true,
        // cleanOnceBeforeBuildPatterns 기본 값: ['**/*']
        cleanOnceBeforeBuildPatterns: [
          '**/*',
          getAbsolutePath( 'dist/**/*' ) // dist 폴더 안의 모든 것을 지우도록 설정
        ]
      } ),
      new MiniCssExtractPlugin( {
        filename: 'assets/css/[name].[contenthash:8].css',
        chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
      } ),
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
        },
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ]
    }
  }
}