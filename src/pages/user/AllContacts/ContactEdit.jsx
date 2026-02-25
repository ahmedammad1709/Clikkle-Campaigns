import Sync from '@mui/icons-material/Sync';
import { Box, Button, Divider, Grid } from '@mui/material';
import styled from '@mui/material/styles/styled';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';
import ConditionalLoading from '../../../components/ConditionalLoading';
import Typography from '../../../components/Typography';
import { Form, Submit, useForm } from './../../../hooks/useForm';
import { Input } from './../../../hooks/useForm/inputs';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import api from '../../../utilities/axios';

const InputField = styled(Input)(({ theme }) => ({
	'& .MuiOutlinedInput-input': {
		padding: theme.spacing(1.3),
	},
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.secondary,
	padding: 8,
	width: '100%',
	borderRadius: 4,
}));

export default function ContactEdit() {
	const sx = {
		divider: {
			marginTop: 2,
			marginBottom: 3,
		},
		divider2: {
			marginTop: 3,
			marginBottom: 3,
		},
		grid: {
			'& .MuiGrid-item': {
				paddingTop: 2,
				paddingBottom: 2,
			},
		},
	};
	const { id } = useParams();
	const httpErrorHandler = useHttpErrorHandler();
	const [data, setData] = useState({});

	const handlers = useForm(
		useMemo(
			() => ({
				firstName: { required: true },
				lastName: { required: true },
				email: { required: true },
				phone: {
					validator: (value) =>
						value.length === 10 ? '' : 'Phone Number should have 10 digits',
				},
				address: { required: true },
				birthday: { required: true },
				state: { required: true },
				country: { required: true },
				populated: { required: true },
			}),
			[]
		)
	);
	const setValues = handlers.setValues;

	const contactView = useCallback(async () => {
		setData(null);
		try {
			const response = await api.get(`/user/contacts/${id}`);

			setData(response.data.contact);
			// console.log('Contact Data', response.data.contact);
			// console.log('data', data);
			const {
				firstName,
				lastName,
				email,
				phone,
				address,
				birthday,
				state,
				country,
				populated,
			} = response.data.contact;
			setValues({
				firstName,
				lastName,
				email,
				phone,
				address,
				birthday,
				state,
				country,
				populated,
			});
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [setData, id, setValues, httpErrorHandler]);

	useEffect(() => {
		contactView();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contactView]);

	const onSubmit = async (formData) => {
		try {
			const response = await api.patch(`/user/contacts/${id}`, formData);
			const { success, message } = response.data;
			if (success) {
				setTimeout(contactView, 1000);
				return message;
			} else {
				throw new Error(message);
			}
		} catch (error) {
			httpErrorHandler(error);
			throw error;
		}
	};

	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item md xs={12}>
					<Typography variant='h5' gutterBottom>
						Contact Edit
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						You can edit your contact from here.
					</Typography>
				</Grid>
				<Grid item md xs={12} align='right'>
					<ActionIcon
						color='primary'
						title='Sync'
						// onClick={contactView}
						icon={<Sync />}
					/>
				</Grid>
			</Grid>
			<Divider light sx={sx.divider} />
			<ConditionalLoading
				condition={data}
				message=''
				style={{ margin: '25% 50%' }}
			>
				{data ? (
					<>
						<Grid container sx={sx.grid} alignItems='center'>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'>Date Subscribed:</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'>
									{data.dateSubscribed
										? new Date(data.dateSubscribed).toLocaleString()
										: 'N/A'}
								</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'>Complaints:</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'>{data.complaints}</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'>Times mailed:</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'> {data.sends}</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'> Last date emailed:</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'>
									{data.lastMailed ? data.lastMailed : 'N/A'}
								</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'>Bounces:</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'> {data.bounces}</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								<Typography variant='body1'> Last updated:</Typography>
							</Grid>
							<Grid item xs={6} md={3}>
								{new Date(data.lastChanged).toLocaleString()}
							</Grid>
						</Grid>
						<Divider light sx={sx.divider} />
						<Form
							onSubmit={onSubmit}
							handlers={handlers}
							onError={httpErrorHandler}
						>
							<Grid
								container
								sx={sx.grid}
								alignItems='center'
								spacing={5}
								marginTop={'1rem'}
							>
								<Grid item xs={6} md={2}>
									<Typography variant='body1'>First Name:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='firstName'
									/>
								</Grid>
								<Grid item xs={6} md={2}>
									<Typography variant='body1'>Last Name:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='lastName'
									/>
								</Grid>

								<Grid item xs={6} md={2}>
									<Typography variant='body1'>Email:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='email'
									/>
								</Grid>
								<Grid item xs={6} md={2}>
									<Typography variant='body1'>Phone:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='phone'
									/>
								</Grid>
								<Grid item xs={6} md={2}>
									<Typography variant='body1'>Address:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='address'
									/>
								</Grid>
								<Grid item xs={6} md={2}>
									<Typography variant='body1'>Birthday:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='birthday'
									/>
								</Grid>
								<Grid item xs={6} md={2}>
									<Typography variant='body1'>State:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='state'
									/>
								</Grid>

								<Grid item xs={6} md={2}>
									<Typography variant='body1'>Country:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='country'
									/>
								</Grid>
								<Grid item xs={6} md={2}>
									<Typography variant='body1'>Populated:</Typography>
								</Grid>
								<Grid item xs={6} md={4}>
									<InputField
										fullWidth
										type='text'
										variant='outlined'
										name='populated'
									/>
								</Grid>
							</Grid>
							<Divider light sx={sx.divider2} />
							<div align='right'>
								<Submit>
									{(loader) => (
										<Button
											type='submit'
											variant='contained'
											color='primary'
											disabled={Boolean(loader)}
										>
											Update {loader}
										</Button>
									)}
								</Submit>
							</div>
						</Form>
					</>
				) : null}
			</ConditionalLoading>
		</Box>
	);
}
