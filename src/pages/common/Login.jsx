import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
	Box,
	Button,
	Card,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';
import { snackBar, useAuthorize } from '../../hooks/Authorize';
import { setCookie } from '../../utilities/cookies';
import { Form, Submit, useForm } from './../../hooks/useForm/index';
import { Input } from './../../hooks/useForm/inputs/index';
import useHttpErrorHandler from './../../utilities/httpErrorHandler';

const functions = createContext();

export default function Login(props) {
	const [page, setPage] = useState(null);

	return (
		<functions.Provider value={setPage}>
			<Box
				sx={{
					background: '#F2F2F2',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100vh',
					flexDirection: 'column',
					py: 2,
				}}
			>
				<div style={{ marginBottom: '8px' }}>
					{/* <Box
						component='img'
						src='/images/logo.png'
						sx={{ maxWidth: '250px' }}
					/> */}
				</div>
				<Card sx={{ p: 2, maxWidth: '900px', mx: 2 }}>
					<Grid container>
						<Grid
							item
							xs={12}
							sm={5}
							md={5}
							sx={{ display: { xs: 'none', sm: 'block' } }}
						>
							<Box
								sx={{
									backgroundImage: "url('/images/signin-blue-background.png')",
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
									borderRadius: '5px',
									color: 'white',
									height: '100%',
								}}
							>
								<div style={{ textAlign: 'center', marginBottom: '32px' }}>
									<Box
										component='img'
										src='/images/login-img01.png'
										sx={{ width: '95%', boxSizing: 'border-box', my: 2 }}
									/>
								</div>
								<Typography
									variant='subtitle1'
									align='center'
									component='p'
									sx={{ fontWeight: '500', mb: 2 }}
								>
									Catchy title here
								</Typography>
								<Typography
									variant='body2'
									align='center'
									component='p'
									sx={{ fontSize: '12px', px: 2, pb: 5 }}
								>
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's
									standard dummy text ever since the 1500s, when an unknown
									printer took a galley of type and scrambled it to make a type
									specimen book.
								</Typography>
							</Box>
							{/* </Card> */}
						</Grid>
						<Grid item xs={12} sm={7} md={7}>
							{page || props.page}
						</Grid>
					</Grid>
				</Card>
			</Box>
		</functions.Provider>
	);
}

export function LoginForm() {
	const authorize = useAuthorize();
	const setPage = useContext(functions);

	const httpErrorHandler = useHttpErrorHandler();

	const handlers = useForm(
		useMemo(
			() => ({
				username: { required: true },
				password: { required: true },
			}),
			[]
		),
		{ Input: TextField }
	);

	const onSubmit = (response) => {
		const { success, message } = response.data;
		// console.log(
		// 	response.data.accessToken,
		// 	response.data.user.role,
		// 	response.data.user
		// );
		if (success) {
			setCookie('accessToken', response.data.accessToken); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTYxYTIyODQ0NWQxYzBjYjUyM2M5YyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg5NzY1NjY2fQ.1GBP_rXYlL0wiqPZdLDDsdyHaeQV4KwJZ-rE9DXZsNM
			setCookie('role', response.data.user.role); //user
			authorize(true, (setUser) => setUser(response.data.user));
			// {
			//     "_id": "63e61a228445d1c0cb523c9c",
			//     "username": "areeb",
			//     "email": "areeb@gmail.com",
			//     "role": "user",
			//     "firstName": "Areeb",
			//     "prospects": "< 500",
			//     "employees": "2-5",
			//     "industry": "Software",
			//     "isVerified": true,
			//     "token": "c756b0563c5c636b32bd04f48cc457e1abe54c746e376663cf265417e52dd2842cab0ee022bd609aecdbfa8585c6f8ade4663bd03233e0195c28de0d3e5300fd",
			//     "picture": "1678271071951-22914338.jpg",
			//     "address": "Gonda",
			//     "lastName": "Ahmad",
			//     "phone": "9795841814"
			// }
			return 'Successfully logged in!';
		} else {
			throw new Error(message);
		}
	};
	return (
		<Box sx={{ p: { xs: 2, sm: 5 } }}>
			<Typography
				variant='h4'
				sx={{
					fontWeight: '500',
				}}
				gutterBottom
			>
				Log in
			</Typography>
			<Typography variant='body2' sx={{ color: 'rgba(0, 0, 0, 0.5)', mb: 7 }}>
				Enter your credentials to login your account.
			</Typography>

			<Form
				handlers={handlers}
				onSubmit={onSubmit}
				method='post'
				action='/login'
				onError={httpErrorHandler}
			>
				<Typography variant='subtitle2' sx={{ fontWeight: ' 500' }}>
					Username or Email Address
				</Typography>
				<Input
					variant='outlined'
					size='small'
					fullWidth
					name='username'
					placeholder='name@domain.com'
					sx={{
						mb: 3,
						mt: 1,
						'& .MuiInputBase-root': {
							p: 0.8,
						},
					}}
				/>
				<Typography variant='subtitle2' sx={{ fontWeight: ' 500' }}>
					Password
					<div
						variant='body2'
						onClick={() => setPage(<ForgotPass />)}
						style={{
							float: 'right',
							textDecoration: 'none',
							color: '#0472D2',
							cursor: 'pointer',
						}}
					>
						Forget password?
					</div>
				</Typography>
				<Input
					type='password'
					variant='outlined'
					size='small'
					fullWidth
					name='password'
					placeholder='contain at least 8 characters'
					sx={{
						mb: 2,
						mt: 1,
						'& .MuiInputBase-root': {
							p: 0.8,
						},
					}}
				/>
				<FormControlLabel
					control={<Checkbox defaultChecked />}
					componentsProps={{ typography: { variant: 'body2' } }}
					label='Remember Information'
				/>
				<Submit>
					{(loader) => (
						<Button
							type='submit'
							variant='contained'
							size='large'
							fullWidth
							sx={{ p: 1.5, my: 1 }}
							disabled={Boolean(loader)}
						>
							Login {loader}
						</Button>
					)}
				</Submit>
			</Form>
			<Typography variant='subtitle2'>
				Not a member?
				<Link
					href='#'
					variant='body2'
					sx={{
						textDecoration: 'none',
						color: '#0472D2',
						pl: 1,
					}}
				>
					Sign Up
				</Link>{' '}
			</Typography>
			<Grid
				container
				spacing={2}
				sx={{
					'.MuiSvgIcon-root': {
						color: '#B7C3D0',
					},
					justifyContent: 'center',
					mt: 1,
				}}
			>
				<Grid item>
					<FacebookIcon
						sx={{
							'&:hover': {
								color: '#1877F2',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<TwitterIcon
						sx={{
							'&:hover': {
								color: '#1DA1F2',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<GoogleIcon
						sx={{
							'&:hover': {
								color: '#E94235',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<PinterestIcon
						sx={{
							'&:hover': {
								color: '#D50123',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<GitHubIcon
						sx={{
							'&:hover': {
								color: '#000000',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<LinkedInIcon
						sx={{
							'&:hover': {
								color: '#0077B5',
							},
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

const ForgotPass = () => {
	const [caption, setCaption] = useState(
		'Enter your credentials to reset your password'
	);
	const httpErrorHandler = useHttpErrorHandler();
	const { showMessage } = useContext(snackBar);
	const [isEmailSend, setIsEmailSend] = useState(null);

	const handlers = useForm(
		useMemo(
			() => ({
				email: { required: true },
			}),
			[]
		)
	);

	const onSubmit = (response) => {
		const { success } = response.data;
		setCaption(
			`A link has been send to your email
            ${(
				<>
					<b>{handlers.values.email}</b>
				</>
			)} 
            to reset your password`
		);
		setIsEmailSend(success);
		if (success) {
			showMessage({ success: 'Kindly check your email' });
		} else {
			showMessage({ error: "Can't change the password at the moment" });
		}
	};

	return (
		<Box sx={{ p: { xs: 2, sm: 5 } }}>
			<Typography
				variant='h4'
				sx={{
					fontWeight: '500',
				}}
				gutterBottom
			>
				Forgot Password
			</Typography>
			<Typography variant='body2' sx={{ color: 'rgba(0, 0, 0, 0.5)', mb: 7 }}>
				{caption}
			</Typography>

			<Form
				handlers={handlers}
				onSubmit={onSubmit}
				method='post'
				action=' /reset-password'
				onError={httpErrorHandler}
			>
				<Typography variant='subtitle2' sx={{ fontWeight: ' 500' }}>
					Email Address
				</Typography>
				<Input
					variant='outlined'
					size='small'
					fullWidth
					name='email'
					placeholder='name@domain.com'
					disabled={isEmailSend}
					sx={{
						mb: 3,
						mt: 1,
						'& .MuiInputBase-root': {
							p: 0.8,
						},
					}}
				/>

				<Submit>
					{(loader) => (
						<Button
							type='submit'
							variant='contained'
							size='large'
							fullWidth
							sx={{ p: 1.5, my: 1 }}
							disabled={Boolean(loader || isEmailSend)}
						>
							Reset Password {loader}
						</Button>
					)}
				</Submit>
			</Form>

			<Grid
				container
				spacing={2}
				sx={{
					'.MuiSvgIcon-root': {
						color: '#B7C3D0',
					},
					justifyContent: 'center',
					mt: 1,
				}}
			>
				<Grid item>
					<FacebookIcon
						sx={{
							'&:hover': {
								color: '#1877F2',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<TwitterIcon
						sx={{
							'&:hover': {
								color: '#1DA1F2',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<GoogleIcon
						sx={{
							'&:hover': {
								color: '#E94235',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<PinterestIcon
						sx={{
							'&:hover': {
								color: '#D50123',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<GitHubIcon
						sx={{
							'&:hover': {
								color: '#000000',
							},
						}}
					/>
				</Grid>
				<Grid item>
					<LinkedInIcon
						sx={{
							'&:hover': {
								color: '#0077B5',
							},
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
