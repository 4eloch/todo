import { legacy_createStore as createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer, { RootState } from "./reducers";
import rootSaga from "./sagas/tasksSaga";

const sagaMiddleware = createSagaMiddleware();
//@ts-ignore
const store: Store<RootState> = createStore(
  rootReducer,
  //@ts-ignore
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
