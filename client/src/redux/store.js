import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import validator from 'redux/middlewares/validator';

import rootReducer from './rootReducer';

const middlewares = [
  // maybe thunk for api stuff?
  validator,
];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
