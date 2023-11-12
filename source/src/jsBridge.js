import _ from 'lodash'

const rawJsBridge = window.Android
const jsBridge = { isAvailable: false }

const androidEventTarget = new EventTarget() //pause, resume, back, keyboardshown, keyboardhidden

let isAdjustingBodyTranslateByKeyboardRegistered = false

if( rawJsBridge ) {
  jsBridge.isAvailable = true

  //android가 보내오는 이벤트를 받기 위해 전역에 설치해 둔다.
  window['AndroidEvent'] = function( eventName, params ) {
    androidEventTarget.dispatchEvent( new CustomEvent( eventName, { detail: params } ) )
  }

  //android가 노출하는 async 함수들을 promise 기반으로 작동되도록 처리
  jsBridge.nextCallbackId = 0

  let funcNames = _.keys( rawJsBridge )

  // alert( funcNames )

  _.forEach( funcNames, name => {
    let func = rawJsBridge[name]
    if( !_.endsWith( name, '_async' ) || !_.isFunction( func ) ) {
      jsBridge[name] = func
      return
    }

    let idx = name.indexOf( '_async' )
    let newName = name.substring( 0, idx ) + 'Async'
    jsBridge[newName] = function( ...args ) {
      let callback = _.last( args )
      if( !_.isFunction( callback ) ) {
        callback = null
      }

      let callbackId = 'Android_callback_' + (jsBridge.nextCallbackId++)
      let inputArgs = callback ? _.take( args, args.length - 1 ) : args
      inputArgs = _.concat( inputArgs, callbackId )

      let resolve, reject
      let promise = new Promise( ( rs, rj ) => {
        resolve = rs
        reject = rj
      } )

      //Android가 결과 반환을 위해 호출할 메소드 등록
      window[callbackId] = function( isFinished, param, error ) {
        alert( isFinished )
        alert( param )
        alert( error )
        if( error ) {
          delete window[callbackId]
          reject( error )
          return
        }

        if( callback && !isFinished ) {
          try {
            callback.call( window, param )
          } catch( err ) {
            console.error( 'callback invoke error' )
          }
        }

        if( isFinished ) {
          delete window[callbackId]
          resolve( param )
        }
      }

      func.apply( rawJsBridge, inputArgs ) //Android가 노출한 메소드 호출

      return promise
    }
  } )
}

export default {
  helloBridge() { //동기식
    return jsBridge.helloBridge.apply( rawJsBridge )
  },
  callbackTestAsync( msg, stateCallback ) { //비동기식
    const promise = jsBridge.callbackTestAsync( msg, stateCallback ).then( res => {
      alert( 'callbackTestAsync' + res  )
    } )
  },
}