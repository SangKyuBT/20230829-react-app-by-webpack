import img from '@assets/images/bt_trust_me.jpg'
import PopupAnchor, { useOpenPopup } from './popupManager'
import TestPopup from './testPopup'

import jsBridge from './jsBridge'

function App() {
  const openPopup = useOpenPopup()

  function handelClick() {
    const test = 'handelClick handelClick handelClick handelClick handelClick'
    jsBridge
      .callbackTestAsync( 'asdasdasdasdasd', function( res ) { 
        alert( test )
      } )
  }

 
  
  return (
    <div className="app">
      <div className="black">React App 매뉴얼 구성</div>
      <div className="bold">React App 매뉴얼 구성</div>
      <div className="medium">React App 매뉴얼 구성</div>
      <div className="regular">React App 매뉴얼 구성</div>
      <div className="light">React App 매뉴얼 구성</div>
      <div className="thin">React App 매뉴얼 구성</div>
      <img src={img}/>
      <button onClick={handelClick}>openPopup</button>
      <PopupAnchor></PopupAnchor>
    </div>
  )
}

export default App