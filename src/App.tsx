import React, {lazy, Suspense} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import LoaderSpinner from '../src/components/Spinner/Spinner';

import './App.css';

const UsersList = lazy(
	() =>
		import(
			'./pages/UsersList/UsersList' /* webpackChunkName: "Users-List-Page" */
		),
);

const UserDetail = lazy(
	() => import('./pages/UserDetail' /* webpackChunkName: "User-Detail-Page" */),
);

function App() {
	return (
		<Suspense fallback={<LoaderSpinner />}>
			<Routes>
				<Route path="/" element={<UsersList />} />
				<Route path="/userDetail" element={<UserDetail />} />
			</Routes>
		</Suspense>
	);
}

export default App;
