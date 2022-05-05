import {FC, useState} from 'react';
import {observer} from 'mobx-react';
import {useStore} from '../../mobx/selectors/usersListSelector';
import addUserAction from '../../mobx/actions/addUsersAction';
import CloseIcon from '@mui/icons-material/Close';
import {Form, Field, FormElement} from '@progress/kendo-react-form';
import {Switch} from '@progress/kendo-react-inputs';
import FormInput from '../FormInput';
import {Button} from '@progress/kendo-react-buttons';

import styled from 'styled-components';
import '@progress/kendo-theme-default/dist/all.css';
import styles from './NewUserDialog.module.css';

interface NewUserDialogProps {
	closeModal: Function;
}

interface UsersListType {
	id?: string;
	userName: string;
	fullName: string;
	lastLogin: string;
	enabled: boolean;
}

const NewUserDialog: FC<NewUserDialogProps> = observer(({closeModal}) => {
	const [inputChange, setInputChange] = useState({
		userName: '',
		firstName: '',
		lastName: '',
		enabled: false,
	});

	const store = useStore();

	const userNameValidator = (value: any) => {
		const userNameRegex = new RegExp(/\W/);

		return inputChange.userName.length < 1
			? 'User name field must not be empty'
			: userNameRegex.test(inputChange.userName)
			? 'User name must not contain symbols'
			: inputChange.userName.length > 15
			? 'User name must be up to 15 characters'
			: store.users.find(
					(user) =>
						user.userName.toLowerCase() === inputChange.userName.toLowerCase(),
			  )
			? 'User with this name already exist'
			: '';
	};

	const firstNameValidator = (value: any) => {
		const firstNameRegex = new RegExp(/\W/);

		return inputChange.firstName.length < 1
			? 'First name field must not be empty'
			: firstNameRegex.test(inputChange.firstName)
			? 'First name must not contain symbols'
			: inputChange.firstName.length > 25
			? 'First name must be up to 25 characters'
			: inputChange.firstName.length + inputChange.lastName.length > 40
			? 'First name and last name must not exeed 40 characters togeather'
			: '';
	};

	const lastNameValidator = (value: any) => {
		const lastNameRegex = new RegExp(/\W/);

		return inputChange.lastName.length < 1
			? 'Last name field must not be empty'
			: lastNameRegex.test(inputChange.lastName)
			? 'Last name must not contain symbols'
			: inputChange.lastName.length > 25
			? 'Last name must be up to 25 characters'
			: inputChange.lastName.length + inputChange.firstName.length > 40
			? 'First name and last name must not exeed 40 characters togeather'
			: '';
	};

	const handleSubmit = (dataItem: any) => {
		const newUserData = {
			userName: dataItem.UserName,
			fullName: [dataItem.FirstName, dataItem.LastName].join(' '),
			lastLogin: new Date().toDateString(),
			enabled: inputChange.enabled,
		};

		addUserAction(newUserData).then(({data}: any) => {
			const response = data;
			store.addUser(response as UsersListType);
		});

		closeModal(false);
	};

	return (
		<div className={styles.backdrop} onClick={() => closeModal(false)}>
			<div
				className={styles.modal}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<div
					className={styles.closeIconWrapper}
					onClick={() => closeModal(false)}>
					<CloseIcon />
				</div>
				<Form
					onSubmit={handleSubmit}
					render={(formRenderProps) => (
						<FormElement
							style={{
								maxWidth: 650,
							}}>
							<fieldset className={'k-form-fieldset'}>
								<legend className={'k-form-legend'}>
									Please fill in the fields:
								</legend>
								<div className="mb-3">
									<Field
										name={'UserName'}
										component={FormInput}
										label={'User Name'}
										validator={userNameValidator}
										onChange={(e) =>
											setInputChange({
												...inputChange,
												userName: e.target.value,
											})
										}
									/>
								</div>
								<div className="mb-3">
									<Field
										name={'FirstName'}
										component={FormInput}
										label={'First Name'}
										validator={firstNameValidator}
										onChange={(e) =>
											setInputChange({
												...inputChange,
												firstName: e.target.value,
											})
										}
									/>
								</div>
								<div className="mb-3">
									<Field
										name={'LastName'}
										component={FormInput}
										label={'Last Name'}
										validator={lastNameValidator}
										onChange={(e) =>
											setInputChange({
												...inputChange,
												lastName: e.target.value,
											})
										}
									/>
								</div>
								<div className="mb-3">
									<div className={styles.switchWrapper}>
										<StyledSwitch
											checked={inputChange.enabled}
											onChange={(e) =>
												setInputChange({
													...inputChange,
													enabled: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</fieldset>
							<div className="k-form-buttons">
								<SubmitButton
									type={'submit'}
									disabled={!formRenderProps.allowSubmit}>
									Submit
								</SubmitButton>
								<CancelButton onClick={() => closeModal(false)}>
									Cancel
								</CancelButton>
							</div>
						</FormElement>
					)}
				/>
			</div>
		</div>
	);
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

const SubmitButton = styled(Button)({
	color: '#fff',
	backgroundColor: 'green',
	'&:hover': {
		color: '#424242',
		backgroundColor: '#06c806',
	},
});

const CancelButton = styled(Button)({
	color: '#fff',
	backgroundColor: 'red',
	'&:hover': {
		color: '#424242',
		backgroundColor: '#ff5858',
	},
});

export default NewUserDialog;
