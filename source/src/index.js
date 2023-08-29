import React from 'react'
import ReactDOM from 'react-dom/client'

import '@assets/css/font.css'
import './index.css'

console.log( process.env )

import App from './app'

//DOM 노드
const root = ReactDOM.createRoot(
  document.getElementById( 'root' )
)

//DOM 노드에 React 요소 렌더링
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)