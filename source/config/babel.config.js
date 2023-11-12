module.exports = {
  presets: [ //플러그인들의 집합인 프리셋을 설정한다. 
    [
      '@babel/preset-env',
      { modules: false }
    ],
    [ 
      "@babel/preset-react", 
      { runtime: "automatic", importSource: "@emotion/react" }
    ],
    ["@emotion/babel-preset-css-prop"]
  ],
  plugins: ["@emotion/babel-plugin"]
}