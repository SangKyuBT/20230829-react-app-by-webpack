import _ from 'lodash'
import { createContext, useContext, useState, useCallback } from 'react'
import { jsx, css } from '@emotion/react'

let nextId = 0
let anchorItems = []
let setAnchorItems = () => {}

const getAnchorStyle = ({ isBlock }) => css`
  position: absolute;
  left: 0;
  top: 0;
  width: 0vw;
  height: 0vh;
  z-index: 1;

  ${isBlock ? `
    width: 100vw;
    height: 100vh;

    background-color: rgba( 0, 0, 0, 0.2 );` 
    : ''}
`

const getPopupItemStyle = ( { isFullScreen } ) => css`
  position: absolute;
  z-index: 1;

  ${isFullScreen ? `
    width: 100%;
    height: 100%;
  ` : `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
  
`

const PopupContext = createContext( null )

function openPopup( comp, params, options ) {
  let resolve = null
  const promise = new Promise( ( rs ) => { resolve = rs } )
  const popupKey = '__popup-' + (nextId++)

  const item = { component: comp, params, options, popupKey, resolve }
  const retObj = { popupKey, promise, close: ( retParam ) => {
    if( !closePopup( retObj, retParam ) ) {
      throw new Error( 'invalid popup close' )
    }
  } }
  item.retObj = retObj

  setAnchorItems( [ ...anchorItems, item ] )

  return retObj
}

function closePopup( popupKey, retParam ) {
  if( !popupKey ) {
    return false
  }

  const popup = anchorItems.find( item => {
    return item.retObj === popupKey || item.popupKey === popupKey
  } )

  if( !popup ) {
    return false
  }

  setAnchorItems( anchorItems.filter( item => item !== popup ) )
  popup.resolve( retParam )

  return true
}

export function useOpenPopup() {
  return openPopup
}

export function useClosePopup() {
  const popupKey = useContext( PopupContext )

  return useCallback( ( retParam ) => {
    if( popupKey && closePopup( popupKey, retParam ) ) {
      return
    }
    throw new Error( 'invalid popup close' )
  }, [ popupKey ] )
}

export default function PopupAnchor() {
  const [ items, setItems ] = useState( [] )

  anchorItems = items
  setAnchorItems = setItems

  const children = _.map( items, ( item ) => {
    const isFullScreen = _.get(item, 'options.fullscreen')
    return (
      jsx( PopupContext.Provider, { key: item.popupKey, value: item.popupKey }, [
        jsx( 'div', { key: item.popupKey, css: getPopupItemStyle( { isFullScreen } ) }, [
          jsx( item.component, { key: item.popupKey, ...item.params } )
        ] )
      ] )
    )
  } )

  return jsx( 'div', { css: getAnchorStyle( { isBlock: !!children.length } ) }, children )
}