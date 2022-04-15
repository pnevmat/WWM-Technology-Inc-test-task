import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {useStore} from '../../mobx/selectors/usersListSelector';

import {process, State} from '@progress/kendo-data-query';
import {
	Grid,
	GridColumn,
	GridDataStateChangeEvent,
	GridRowClickEvent,
} from '@progress/kendo-react-grid';
import {Form, Field, FormElement} from '@progress/kendo-react-form';
import {Button} from '@progress/kendo-react-buttons';
import FormInput from '../../components/FormInput';
import NewUserDialog from '../../components/NewUserDialog/NewUserDialog';
import data from '../../utils/users.json';

import styled, {css} from 'styled-components';
import '@progress/kendo-theme-default/dist/all.css';
import styles from './UsersList.module.css';

interface InputType {
	id: string;
	userName: string;
	fullName: string;
	lastLogin: string;
	enabled: boolean | string;
}

interface UsersListState {
	gridDataState: State;
	gridClickedRow: InputType | null;
}

const UsersList = observer(() => {
	const store = useStore();
	console.log('Users in store: ', store.users);
	console.log('Users in store length: ', store.users.length);

	const [state, setState] = useState<UsersListState>({
		gridDataState: {
			sort: [{field: 'userName', dir: 'asc'}],
			skip: 0,
			take: 10,
			filter: undefined,
		},
		gridClickedRow: null,
	});

	const [usersFromApi, setUsersFromApi] = useState<Array<InputType> | []>([]);
	console.log('Users from api: ', usersFromApi);
	const [foundUsers, setFoundUsers] = useState<Array<InputType> | null>(null);
	const [isOpenNewUserDialog, setIsOpenNewUserDialog] = useState(false);

	useEffect(() => {
		console.log('Use effect started');

		if (data && usersFromApi.length === 0) {
			console.log('Data from query to store delivery started');

			store.addUsers(data);
		}

		if (usersFromApi.length < store.users.length) {
			console.log('Store update started');
			const users = [...store.users];
			setUsersFromApi(
				users.map((user: InputType) => {
					return {...user, enabled: user.enabled ? 'Yes' : 'No'};
				}),
			);
		}
	}, [store, store.users.length, usersFromApi.length]);

	const inputValidator = (value: any) => (!value ? 'Please enter a text.' : '');

	const navigate = useNavigate();

	const handleSearchChange = (dataItem: any) => {
		if (dataItem.value === '') {
			return setFoundUsers(null);
		}
		const foundUser = usersFromApi.filter((user) =>
			user.userName.toLowerCase().includes(dataItem.value.toLowerCase()),
		);

		setFoundUsers(foundUser ? foundUser : null);
	};

	const handleGridDataStateChange = (e: GridDataStateChangeEvent) => {
		setState({...state, gridDataState: e.dataState});
	};

	const handleGridRowClick = (e: GridRowClickEvent) => {
		console.log('Event: ', e);
		const clickedRow = usersFromApi.find((user) => user.id === e.dataItem.id);

		if (clickedRow) {
			setState({...state, gridClickedRow: clickedRow});

			store.setSelectedUser({
				...clickedRow,
				enabled: clickedRow.enabled === 'Yes' ? true : false,
			});

			navigate(`/userDetail/${clickedRow.id}`);
		} else {
			return;
		}
	};

	const max = 20;

	return (
		<div className={styles.container}>
			<div className="kendo-react-getting-started">
				<h1>Users List</h1>
				<div className={styles.formContainer}>
					<Form
						initialValues={{
							username: '',
						}}
						render={(formRenderProps) => (
							<FormElement
								style={{
									width: 250,
									position: 'static',
								}}>
								<Field
									id={'username'}
									name={'username'}
									label={'Search by Username:'}
									max={max}
									component={FormInput}
									validator={inputValidator}
									onChange={handleSearchChange}
								/>
							</FormElement>
						)}
					/>
					<StyledButton onClick={() => setIsOpenNewUserDialog(true)}>
						New user
					</StyledButton>
				</div>

				<Grid
					data={process(
						foundUsers ? foundUsers : usersFromApi,
						state.gridDataState,
					)}
					pageable={true}
					sortable={true}
					{...state.gridDataState}
					onDataStateChange={handleGridDataStateChange}
					style={{height: '400px'}}
					onRowClick={handleGridRowClick}>
					<GridColumn field="userName" title="User Name" />
					<GridColumn field="fullName" title="Full Name" />
					<GridColumn field="lastLogin" title="Last Login" />
					<GridColumn
						field="enabled"
						cell={(props) => <StyledTd>{props.dataItem.enabled}</StyledTd>}
						title="Enabled"
					/>
				</Grid>
			</div>
			{isOpenNewUserDialog && (
				<NewUserDialog closeModal={setIsOpenNewUserDialog} />
			)}
		</div>
	);
});

const StyledTd = styled.td`
	${(props) =>
		props.children === 'No'
			? css`
					color: red;
			  `
			: css`
					color: green;
			  `}
`;

const StyledButton = styled(Button)({
	width: '80px',
	height: '30px',
	backgroundColor: '#569ff9',
	color: '#fff',
	'&:hover': {
		backgroundColor: '#92c3ff',
	},
});

export default UsersList;
