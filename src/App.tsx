import React, {lazy, Suspense} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import LoaderSpinner from '../src/components/Spinner/Spinner';
import {observer} from 'mobx-react';
import {useStore} from './mobx/selectors/usersListSelector';

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

const PageNotFound = lazy(
	() =>
		import(
			'./pages/PageNotFound/PageNotFound' /*webpackChunkName: "Not-Found-Page" */
		),
);

const App = observer(() => {
	const store = useStore();
	const users = [...store.users];
	const location = useLocation();
	return (
		<Suspense fallback={<LoaderSpinner />}>
			<Routes>
				<Route path="/" element={<UsersList />} />
				<Route path="/userDetail/:id" element={<UserDetail />} />
				<Route
					path={
						location.pathname !== '/' &&
						!users.find(
							(user) => location.pathname === `/userDetail/${user.id}`,
						)
							? location.pathname
							: ''
					}
					element={<PageNotFound />}
				/>
			</Routes>
		</Suspense>
	);
});

export default App;
