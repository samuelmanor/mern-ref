import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
});

console.log(store.getState());

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// });

// const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)