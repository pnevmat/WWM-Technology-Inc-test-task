import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {useLocalStore} from 'mobx-react';
import {createStore, storeContext} from './mobx/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

export const StoreProvider = ({children}: any) => {
	const store = useLocalStore(createStore);
	return (
		<storeContext.Provider value={store}>{children}</storeContext.Provider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
