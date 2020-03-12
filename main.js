import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga' // saga import 

import Counter from './Counter'
import reducer from './reducers/reducers'
import rootSaga from './sagas/sagas'

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware() // saga 미들웨어 불러오고
const store = createStore(reducer, devTools, applyMiddleware(sagaMiddleware)) // 추가.

sagaMiddleware.run(rootSaga) // helloSaga 실행시키겠다?

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
