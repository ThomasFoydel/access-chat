import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';

const middlewares = [
  // maybe thunk for api stuff?
];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistStore };
