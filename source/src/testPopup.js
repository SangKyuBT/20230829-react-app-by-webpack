
import { useClosePopup } from "./popupManager"

function TestPopup() {
  const closePopup = useClosePopup()
  
  function t() {
    closePopup()
  }
  
  return (
    <div style={ { width: '100%', height: '100%', backgroundColor: '#fff' } } onClick={t}>TestPopup</div>
  )
}

export default TestPopup