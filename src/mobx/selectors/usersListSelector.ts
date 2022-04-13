import React from 'react';
import {storeContext} from '../store';

export const useStore = () => {
	const store = React.useContext(storeContext);
	if (store) {
		return store;
	} else {
		throw new Error('useStore must be used within a StoreProvider.');
	}
};