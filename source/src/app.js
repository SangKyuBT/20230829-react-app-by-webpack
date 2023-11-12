import img from '@assets/images/bt_trust_me.jpg'
import PopupAnchor, { useOpenPopup } from './popupManager'
import TestPopup from './testPopup'

function App() {
  const openPopup = useOpenPopup()

  function tt() {
    openPopup( TestPopup, {}, { fullscreen: true } ).promise
  }

  console.log( window )
  
  return (
    <div className="app">
      <div className="black">React App 매뉴얼 구성</div>
      <div className="bold">React App 매뉴얼 구성</div>
      <div className="medium">React App 매뉴얼 구성</div>
      <div className="regular">React App 매뉴얼 구성</div>
      <div className="light">React App 매뉴얼 구성</div>
      <div className="thin">React App 매뉴얼 구성</div>
      <img src={img}/>
      <button onClick={tt}>openPopup</button>

      <PopupAnchor></PopupAnchor>
    </div>
  )
}

export default App