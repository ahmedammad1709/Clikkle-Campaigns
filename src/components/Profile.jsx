import LockIcon from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import {
	AppBar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Grid,
	Modal,
	Tab,
	Tabs,
} from '@mui/material';

import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useSetUser, useUser } from '../hooks/Authorize';
import { snackBar } from './../hooks/Authorize';
import { Form, Submit, useForm } from './../hooks/useForm';
import { Input } from './../hooks/useForm/inputs';
import useHttpErrorHandler from './../utilities/httpErrorHandler';
import ClickableImage from './ClickableImage';
import { serverImageUrl } from './ServerImage';
import Typography from './Typography';
import api from '../utilities/axios';

function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div role='tabpanel' hidden={value !== index}>
			{value === index && (
				<Box p={3} pt={0}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

function Profile(props) {
	const { modal, closeModal } = props;
	const { showMessage } = useContext(snackBar);
	const [value, setValue] = useState(0);
	const [photo, setPhoto] = useState(null);
	const [photoUrl, setPhotoUrl] = useState('');
	const [loading3, setLoading3] = useState(false);
	const photoInput = useRef();
	const { picture: oldPicture } = useUser();
	const setUser = useSetUser();
	const httpErrorHandler = useHttpErrorHandler();

	const tabHandleChange = (e, newValue) => {
		setValue(newValue);
	};

	const handlers = useForm(
		useMemo(
			() => ({
				username: {
					validator: (value) =>
						/[a-z]/.test(value[0]) && /[a-z0-9]/.test(value)
							? ''
							: 'Username is required and First Character should be an alphabet',
				},
				firstName: { required: true },
				lastName: { required: true },
				address: { required: true },
				phone: {
					validator: (value) =>
						value.length === 10 ? '' : 'Phone Number should have 10 digits',
				},
			}),
			[]
		)
	);
	const setValues = handlers.setValues;

	const handlers2 = useForm(
		useMemo(
			() => ({
				oldPassword: { required: true },
				newPassword: {
					validator: (value) => {
						// console.log('newPassword');
						// console.log(value);
						return value.length >= 8
							? ''
							: 'password must contains 8 characters';
					},
				},
				confirmPassword: {
					validator: (value, a) => {
						// console.log('confirmPassword');
						// console.log(value, a);
						return value.newPassword === value.confirmPassword
							? ''
							: "Password did't match";
					},
				},
			}),
			[]
		)
	);

	const getProfileInfo = useCallback(async () => {
		try {
			const response = await api.get('/user/profile');
			const user = response.data.user;
			setValues({
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				address: user.address,
				phone: user.phone,
			});
			setUser((prev) => ({
				...prev,
				firstName: user.firstName,
				lastName: user.lastName,
			}));
			const photo = serverImageUrl(response.data.user.picture);
			setPhotoUrl(photo);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [setValues, setUser, httpErrorHandler]);

	const onSubmitProfile = async (formData) => {
		try {
			const response = await api.patch('/user/profile', formData);
			const { success } = response.data;
			if (success) {
				showMessage({ success: 'Successfully updated your profile' });
				getProfileInfo(); // Refresh profile data
				return 'Successfully updated your profile';
			} else {
				throw new Error('Something went wrong');
			}
		} catch (error) {
			httpErrorHandler(error);
			throw error;
		}
	};

	const onSubmitPassword = async (formData) => {
		try {
			const response = await api.patch('/user/profile/password', formData);
			const { message, success } = response.data;
			if (success) {
				showMessage({ success: message });
				return message;
			} else {
				throw new Error(message);
			}
		} catch (error) {
			httpErrorHandler(error);
			throw error;
		}
	};

	// const submitHandler2 = async () => {
	// 	setLoading2(true);
	// 	try {
	// 		const response = await axios.post(
	// 			 `/user/profile/update-password`,
	// 			{
	// 				oldPassword: values2.oldPassword,
	// 				newPassword: values2.newPassword,
	// 			},
	// 			{}
	// 		);
	// 	} catch (e) {
	// 		if (e.response.status === 401) {
	// 			authorize(false);
	// 		}
	// 	}
	// 	getProfileInfo();
	// 	setLoading2(false);
	// };

	const uploadPhoto = () => {
		photoInput.current.click();
	};

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		const fileUrl = URL.createObjectURL(file);
		setPhoto(file);
		setPhotoUrl(fileUrl);
	};

	const updatePhoto = async (e) => {
		setLoading3(true);
		const formData = new FormData();
		formData.set('image', photo);
		try {
			const url =  `/user/profile/picture`;
			const response = await api.patch(url, formData, {
				'Content-Type': 'multipart/form-data',
			});
			setUser((user) => ({ ...user, picture: response.data.newImage }));

			if (response.data.success) {
				showMessage({ success: response.data.message });
			} else {
				showMessage({ error: response.data.message });
			}
		} catch (e) {
			httpErrorHandler(e);
		}
		setLoading3(false);
		setPhoto(null);
		getProfileInfo();
	};

	const discard = () => {
		setPhoto(null);
		setPhotoUrl(`/${oldPicture}`);
	};

	useEffect(() => {
		getProfileInfo();
	}, [getProfileInfo]);

	return (
		<Modal
			open={modal}
			onClose={closeModal}
			style={{ display: 'flex', alignItems: 'center', height: '100vh' }}
		>
			<>
				<Container maxWidth='lg'>
					<Card sx={{ maxHeight: '90vh', overflowY: 'scroll' }}>
						<Grid container spacing={2}>
							<Grid
								item
								xs={12}
								md={3}
								sx={{
									background:
										'linear-gradient(90deg, rgb(25,33,55),rgb(23,45,90))',
									color: 'white',
								}}
							>
								<Box
									sx={{
										p: 5,
									}}
									align='center'
								>
									<Typography variant='h4' sx={{ fontWeight: 400 }}>
										Profile
									</Typography>
									<Box
										sx={{
											height: '150px',
											width: '150px',
											my: 3,
										}}
									>
										<ClickableImage onClick={uploadPhoto} src={photoUrl} />
									</Box>
									<input
										type='file'
										ref={photoInput}
										style={{ display: 'none' }}
										onChange={handlePhotoChange}
									/>

									<Typography variant='h6'>Upload your photo ...</Typography>
									<Typography variant='subtitle3' component='div'>
										Photo should be at least 300px * 300px
									</Typography>

									<Button
										variant='contained'
										size='small'
										color='secondary'
										sx={{
											marginTop: '8px',
											fontSize: '0.8rem',
											textTransform: 'capitalize',
										}}
										onClick={updatePhoto}
										disabled={!photo}
									>
										Update Photo
										{loading3 ? (
											<CircularProgress
												size='20px'
												style={{
													marginLeft: '8px',
													color: 'white',
												}}
											/>
										) : null}
									</Button>

									<Grid item>
										{photo ? (
											<Button
												variant='outlined'
												size='small'
												color='warning'
												disabled={loading3}
												sx={{
													marginTop: '16px',
													fontSize: '0.8rem',
													textTransform: 'capitalize',
												}}
												onClick={discard}
											>
												Discard
											</Button>
										) : null}
									</Grid>
								</Box>
							</Grid>
							<Grid item xs={12} sm={9}>
								<AppBar
									position='static'
									elevation={0}
									sx={{
										background: 'transparent',
										padding: '8px',
										mb: 0,
										backdropFilter: 'none',
									}}
								>
									<Tabs
										value={value}
										onChange={tabHandleChange}
										indicatorColor='transparent'
									>
										<Tab
											label='Information'
											disableFocusRipple
											disableRipple
											icon={<Person sx={{ fontSize: '18px' }} />}
											iconPosition='start'
											sx={{
												p: 1,
												textTransform: 'none',

												minHeight: '50px',
											}}
										/>
										<Tab
											label='Password'
											disableFocusRipple
											disableRipple
											icon={<LockIcon sx={{ fontSize: '18px' }} />}
											iconPosition='start'
											sx={{ p: 1, textTransform: 'none', minHeight: '50px' }}
										/>
									</Tabs>
								</AppBar>
								<TabPanel value={value} index={0}>
									<Typography variant='h6' sx={{ fontWeight: 500 }}>
										Basic information
									</Typography>
									<Form
										onSubmit={onSubmitProfile}
										handlers={handlers}
										onError={httpErrorHandler}
										retainOnSubmit
									>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>Username</Typography>
											<Input
												variant='outlined'
												fullWidth
												type='text'
												name='username'
											/>
										</Box>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>First Name</Typography>
											<Input
												variant='outlined'
												fullWidth
												type='text'
												name='firstName'
											/>
										</Box>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>Last Name</Typography>
											<Input
												variant='outlined'
												fullWidth
												type='text'
												name='lastName'
											/>
										</Box>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>Address</Typography>
											<Input
												variant='outlined'
												fullWidth
												type='text'
												name='address'
											/>
										</Box>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>Phone</Typography>
											<Input
												variant='outlined'
												fullWidth
												type='text'
												name='phone'
											/>
										</Box>
										<Submit>
											{(loader) => (
												<Button
													variant='contained'
													color='primary'
													type='submit'
													size='small'
													disabled={Boolean(loader)}
													sx={{
														marginTop: '8px',
														fontSize: '0.8rem',
														textTransform: 'capitalize',
													}}
												>
													Update {loader}
												</Button>
											)}
										</Submit>
									</Form>
								</TabPanel>
								<TabPanel value={value} index={1}>
									<Typography variant='h6' sx={{ fontWeight: 500 }}>
										Modify Password
									</Typography>
									<Form
										onSubmit={onSubmitPassword}
										handlers={handlers2}
										onError={httpErrorHandler}
										retainOnSubmit
									>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>
												Current password
											</Typography>
											<Input
												variant='outlined'
												fullWidth
												name='oldPassword'
												type='password'
											/>
										</Box>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>New password</Typography>
											<Input
												variant='outlined'
												fullWidth
												name='newPassword'
												type='password'
											/>
										</Box>
										<Grid container spacing={1}>
											<Grid item xs={6}>
												<ul
													style={{
														paddingLeft: '16px',
														margin: 0,
														marginTop: '2px',
													}}
												>
													<li>One lowercase character</li>
													<li>One uppercase character</li>
													<li>One number</li>
												</ul>
											</Grid>
											<Grid item xs={6}>
												<ul
													style={{
														paddingLeft: '16px',
														margin: 0,
														marginTop: '2px',
													}}
												>
													<li>One special character</li>
													<li>8 character minimum</li>
													<li>50 character maximum</li>
												</ul>
											</Grid>
										</Grid>
										<Box
											sx={{
												marginTop: '16px',
												marginBottom: '16px',
											}}
										>
											<Typography variant='subtitle3'>
												Confirm new password
											</Typography>
											<Input
												variant='outlined'
												fullWidth
												name='confirmPassword'
												type='password'
											/>
										</Box>
										<Submit>
											{(loader) => (
												<Button
													variant='contained'
													color='primary'
													type='submit'
													size='small'
													disabled={Boolean(loader)}
													sx={{
														marginTop: '8px',
														fontSize: '0.8rem',
														textTransform: 'capitalize',
													}}
												>
													Update
													{loader}
												</Button>
											)}
										</Submit>
									</Form>
								</TabPanel>
							</Grid>
						</Grid>
					</Card>{' '}
				</Container>
			</>
		</Modal>
	);
}

export default Profile;
