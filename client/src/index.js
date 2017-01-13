import React from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import Home from './home';
import client from './lib/apollo/client';
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  apollo: client.reducer(),
  form: formReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer, (process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function () {} )());

document.addEventListener('DOMContentLoaded', function () {
	render(
		<ApolloProvider client={client} store={store}>
	    <Home/>
	  </ApolloProvider>,
		document.getElementById('react')
	);
});
