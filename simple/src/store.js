import { createStore } from "redux";
import rootReducer from "./state/rootReducer";

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() =>
    localStorage.setItem("savedState", JSON.stringify(store.getState()))
  );

  return store;
}
