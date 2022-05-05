import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useStore} from '../../mobx/selectors/usersListSelector';
import {Input, Switch} from '@progress/kendo-react-inputs';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import styled from 'styled-components';
import styles from './UserDetail.module.css';

const firstNameRegex = new RegExp(/\W/);
const lastNameRegex = new RegExp(/\W/);

const firstNameValidator = (firstName: string, lastName: string) => {
	if (firstName.length < 1) {
		return 'First name field must not be empty';
	} else if (firstNameRegex.test(firstName)) {
		return 'First name must not contain symbols';
	} else if (firstName.length > 25) {
		return 'First name must be up to 25 characters';
	} else if (firstName.length + lastName.length > 40) {
		return 'First name and last name must not exeed 40 characters togeather';
	} else {
		return false;
	}
};

const lastNameValidator = (lastName: string, firstName: string) => {
	if (lastName.length < 1) {
		return 'Last name field must not be empty';
	} else if (lastNameRegex.test(lastName)) {
		return 'Last name must not contain symbols';
	} else if (lastName.length > 25) {
		return 'Last name must be up to 25 characters';
	} else if (lastName.length + firstName.length > 40) {
		return 'First name and last name must not exeed 40 characters togeather';
	} else {
		return false;
	}
};

const UserDetail = observer(() => {
	const store = useStore();
	const selectedUser = {...store.selectedUser};
	const [editable, setEditable] = useState({
		firstName: {
			name: selectedUser.fullName
				? selectedUser.fullName.split(' ')[0]
				: 'User First Name',
			editable: false,
		},
		lastName: {
			name: selectedUser.fullName
				? selectedUser.fullName.split(' ')[1]
				: 'User Last Name',
			editable: false,
		},
		enabled: {
			value: selectedUser.enabled ? selectedUser.enabled : false,
			editable: false,
		},
	});
	const [visited, setVisited] = useState(false);
	const [firstNameChange, setFirstNameChange] = useState<
		string | number | string[]
	>('');
	const [lastNameChange, setLastNameChange] = useState<
		string | number | string[]
	>('');
	const [enabled, setEnabled] = useState(selectedUser.enabled);

	const handleSave = (marker: string) => {
		switch (marker) {
			case 'firstName':
				setEditable({
					...editable,
					firstName: {name: editable.firstName.name, editable: false},
				});
				break;
			case 'lastName':
				setEditable({
					...editable,
					lastName: {name: editable.lastName.name, editable: false},
				});
				break;
			case 'enabled':
				setEditable({
					...editable,
					enabled: {value: editable.enabled.value, editable: false},
				});
				break;

			default:
				break;
		}
	};

	return (
		<div className={styles.container}>
			<ul className={styles.list}>
				{editable.firstName.editable ||
				editable.lastName.editable ||
				editable.enabled.editable ? (
					<li className={styles.kFormLegend}>
						<legend>Please fill in the fields:</legend>
					</li>
				) : (
					<></>
				)}
				<li className={styles.mb3}>
					<div className={styles.inputContainer}>
						<span>User Name: {selectedUser.userName}</span>
					</div>
				</li>
				<li className={styles.mb3}>
					<div className={styles.inputContainer}>
						{editable.firstName.editable ? (
							<>
								<StyledInput
									onChange={(e) => {
										setFirstNameChange(e.target.value ? e.target.value : '');
										!visited && setVisited(true);
									}}
									onBlur={() => setVisited(true)}
								/>
								<span>First Name</span>
								{firstNameValidator(
									firstNameChange.toString(),
									lastNameChange.toString(),
								) && visited ? (
									<legend className={styles.errorMessage}>
										{firstNameValidator(
											firstNameChange.toString(),
											lastNameChange.toString(),
										)}
									</legend>
								) : (
									''
								)}
							</>
						) : (
							<span>First Name: {editable.firstName.name}</span>
						)}
					</div>
					{editable.firstName.editable ? (
						<button
							className={styles.btn}
							type="button"
							onClick={() => handleSave('firstName')}>
							<SaveIcon />
						</button>
					) : (
						<button
							className={styles.btn}
							type="button"
							onClick={() =>
								setEditable({
									...editable,
									firstName: {name: editable.firstName.name, editable: true},
								})
							}>
							<EditIcon />
						</button>
					)}
				</li>
				<li className={styles.mb3}>
					<div className={styles.inputContainer}>
						{editable.lastName.editable ? (
							<>
								<StyledInput
									onChange={(e) => {
										setLastNameChange(e.target.value ? e.target.value : '');
										!visited && setVisited(true);
									}}
									onBlur={() => setVisited(true)}
								/>
								<span>{'Last Name'}</span>
								{lastNameValidator(
									lastNameChange.toString(),
									firstNameChange.toString(),
								) && visited ? (
									<legend className={styles.errorMessage}>
										{lastNameValidator(
											lastNameChange.toString(),
											firstNameChange.toString(),
										)}
									</legend>
								) : (
									''
								)}
							</>
						) : (
							<span>Last Name: {editable.lastName.name}</span>
						)}
					</div>
					{editable.lastName.editable ? (
						<button
							className={styles.btn}
							type="button"
							onClick={() => handleSave('lastName')}>
							<SaveIcon />
						</button>
					) : (
						<button
							className={styles.btn}
							type="button"
							onClick={() =>
								setEditable({
									...editable,
									lastName: {name: editable.lastName.name, editable: true},
								})
							}>
							<EditIcon />
						</button>
					)}
				</li>
				<li className={styles.mb3}>
					<div className={styles.inputContainer}>
						<span>Last Login: {selectedUser.lastLogin}</span>
					</div>
				</li>
				<li className={styles.mb3}>
					<div className={styles.inputContainer}>
						{editable.enabled.editable ? (
							<StyledSwitch
								checked={enabled}
								onChange={(e) => setEnabled(e.target.value)}
							/>
						) : (
							<span>Enabled: {selectedUser.enabled ? 'Yes' : 'No'}</span>
						)}
					</div>
					{editable.enabled.editable ? (
						<button
							className={styles.btn}
							type="button"
							onClick={() => handleSave('enabled')}>
							<SaveIcon />
						</button>
					) : (
						<button
							className={styles.btn}
							type="button"
							onClick={() =>
								setEditable({
									...editable,
									enabled: {value: editable.enabled.value, editable: true},
								})
							}>
							<EditIcon />
						</button>
					)}
				</li>
			</ul>
		</div>
	);
});

const StyledInput = styled(Input)({
	width: '100%',
	maxWidth: '500px',
	borderColor: 'rgba(0, 0, 0, 0.08)',
	color: '#424242',
	fontSize: '14px',
	lineHeight: '1.43',
	'& ~ span': {
		position: 'absolute',
		top: '0px',
		left: '9px',
		transform: 'scale(1)',
	},
});

const StyledSwitch = styled(Switch)(({checked}) => ({
	width: '60px',
	height: '26px',
	'&:hover': {
		cursor: 'pointer',
	},
	'& > span': {
		position: 'relative',
		display: 'flex',
		flexFlow: 'row nowrap',
		flex: '1 0 auto',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '60px',
		height: '26px',
		border: checked ? '1px solid green !important' : '1px solid red !important',
		borderRadius: '999px',
		backgroundColor: checked ? '#07ca07 !important' : '#f47770 !important',
		color: '#424242',
		outline: 0,
		transition: 'background-color 200ms ease-in-out',
	},
	'& > span > span': {
		color: '#424242 !important',
	},
	'& > span :last-child': {
		position: 'absolute',
		top: '50%',
		left: checked ? '1px' : '-1px',
		width: 0,
		height: 0,
		overflow: 'visible',
		transition: 'left 200ms ease-in-out',
	},
	'& > span :last-child > span': {
		position: 'absolute',
		display: 'block',
		width: '26px',
		height: '26px',
		border: '1px solid rgba(0, 0, 0, 0.2)',
		borderRadius: '999px',
		color: '#424242',
		backgroundColor: checked ? 'green' : 'red',
		transform: 'translate(-50%, -50%)',
	},
	fontSize: '10px',
}));

export default UserDetail;
