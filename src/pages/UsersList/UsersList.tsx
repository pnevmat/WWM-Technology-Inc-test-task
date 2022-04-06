import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
import users from '../../utils/users.json';

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

export default function UsersList() {
	const [state, setState] = useState<UsersListState>({
		gridDataState: {
			sort: [{field: 'userName', dir: 'asc'}],
			skip: 0,
			take: 10,
			filter: undefined,
		},
		gridClickedRow: null,
	});

	const [usersFromApi, setUsersFromApi] = useState(
		users.map((user: InputType) => {
			return {...user, enabled: user.enabled ? 'Yes' : 'No'};
		}),
	);
	const [foundUsers, setFoundUsers] = useState<Array<InputType> | null>(null);

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

		setState(clickedRow ? {...state, gridClickedRow: clickedRow} : {...state});

		navigate(`/userDetail/${clickedRow?.id}`);
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
					<StyledButton>New user</StyledButton>
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
		</div>
	);
}

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
});
