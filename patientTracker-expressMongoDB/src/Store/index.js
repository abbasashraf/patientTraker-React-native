import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { Addpatient } from './action/addpatient.js';
// reducer here...

import { AddPatientReducer } from './reducer/addpatient.js';


const rootReducer = combineReducers({ AddPatientReducer });
const middle = applyMiddleware(thunk , logger);

const store = createStore(rootReducer, {}, middle);
store.dispatch(Addpatient.fetchStorage());

export default store;