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
	() =>
		import(
			'./pages/UserDetail/UserDetail' /* webpackChunkName: "User-Detail-Page" */
		),
);

// const PageNotFound = lazy(
// 	() =>
// 		import(
// 			'./pages/PageNotFound/PageNotFound' /*webpackChunkName: "Not-Found-Page" */
// 		),
// );

function App() {
	const location = useLocation();
	return (
		<Suspense fallback={<LoaderSpinner />}>
			<Routes>
				<Route path="/" element={<UsersList />} />
				<Route path="/userDetail/:id" element={<UserDetail />} />
				{/* <Route
					path={
						location.pathname !== '/' && location.pathname !== '/userDetail/:id'
							? location.pathname
							: ''
					}
					element={<PageNotFound />}
				/> */}
			</Routes>
		</Suspense>
	);
}

export default App;
