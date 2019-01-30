// we're going to use thunk
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./state/rootReducer";

export default function configureStore(initialState = {}) {
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunk));

  return createStore(rootReducer, initialState, enhancer);
}

// here's what it would look like if we used redux saga instead
// import createSagaMiddleware from 'redux-saga'

// import { helloSaga, otherSaga } from './sagas'

// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(
//   initialState
//   rootReducer,
//   applyMiddleware(sagaMiddleware)
// )

// sagaMiddleware.run([...helloSaga, ...otherSaga])
