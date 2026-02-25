import {
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Divider,
	Grid,
	ListItem,
	ListItemText,
	Modal,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '../../../components/Typography';
import { functions } from './EmailTemplates';
import { useContext, useState } from 'react';

import useHttpErrorHandler from '../../../utilities/httpErrorHandler';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../components/Header';
import api from '../../../utilities/axios';

export default function Entries({ label, lastEditOn, id, showTemplateView }) {
	const sx = {
		rowDivider: {
			margin: '24px 0',
		},
		entries: {
			display: 'flex',
			justifyContent: 'space-between',
			flexDirection: 'row',
		},
		entriesText: {
			'& .MuiTypography-body1': {
				paddingLeft: 1,
			},
		},
		Button: {
			padding: '3px 14px',
			fontSize: '0.8rem',
			textTransform: 'capitalize',
			borderRadius: '0px',
			marginLeft: 1,
			marginRight: 1,
		},
		viewButton: {
			padding: '5px 24px',
		},
		toggleButton: {
			padding: '5px 0',
			borderRadius: '0px',
			minWidth: '30px',
		},
		timeLine: {
			marginLeft: 4,
			fontSize: '0.7rem',
			paddingLeft: 1,
		},
		sortBy: {
			outlined: 'inherit',
			'& .MuiSelect-outlined.MuiSelect-outlined': {
				padding: (1.4, 4.5),
			},
			'& .MuiSelect-select.MuiSelect-select': {
				padding: (1.4, 4.5),
			},
		},
	};

	const [loading, setLoading] = useState(false);
	const [deleteMsg, setDeleteMsg] = useState(false);
	const { getOwned } = useContext(functions);
	const { showSuccess, showError } = useMessage();
	const httpErrorHandler = useHttpErrorHandler();
	const navigate = useNavigate();

	const deleteTemplate = async () => {
		setLoading(true);
		const url =  `/user/templates/delete`;
		try {
			const response = await api.post(url, { ids: [id] }, {});
			if (response.data.success) showSuccess(response.data.message);
			else showError(response.data.message);
			getOwned();
		} catch (e) {
			httpErrorHandler(e);
		} finally {
			setLoading(false);
			closeDeleteModal();
		}
	};

	const openDeleteModal = () => setDeleteMsg(true);
	const closeDeleteModal = () => setDeleteMsg(false);
	const editTemplate = () => navigate(`/campaigns/templates/create/${id}`);

	return (
		<>
			<div sx={sx.entries}>
				<Grid
					container
					spacing={1}
					alignItems='flex-start'
					justifyContent='flex-start'
				>
					<Grid item>
						<ListItem>
							<ListItemText>
								<Box
									component='img'
									src='/images/template.svg'
									style={{ margin: '0 4px', width: '100px' }}
								/>
							</ListItemText>
						</ListItem>
					</Grid>
					<Grid item style={{ paddingLeft: '8px' }}>
						<Typography
							variant='h5'
							color='primary'
							style={{ cursor: 'pointer' }}
							onClick={() => showTemplateView(id)}
						>
							{label}
						</Typography>
						<Typography variant='body1' component='div'>
							<b>Created On</b> on {new Date(lastEditOn).toLocaleString()}
						</Typography>
					</Grid>

					<Grid item xs align='right'>
						<Button
							disableRipple
							sx={sx.viewButton}
							disableTouchRipple
							variant='contained'
							color='secondary'
							onClick={() => showTemplateView(id)}
						>
							View
						</Button>

						<Button
							style={{ marginLeft: '4px', marginRight: '4px' }}
							variant='contained'
							sx={sx.viewButton}
							onClick={editTemplate}
						>
							Edit
						</Button>

						<Button
							variant='contained'
							color='error'
							sx={sx.viewButton}
							onClick={openDeleteModal}
						>
							Delete
						</Button>
					</Grid>
				</Grid>
			</div>

			<Divider light sx={sx.rowDivider} />

			<Modal
				open={deleteMsg}
				onClose={closeDeleteModal}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Container maxWidth='sm'>
					<Card style={{ width: '100%', padding: '32px' }}>
						<Typography variant='h6'>
							Do you want to delete {label} ?{' '}
						</Typography>
						<div style={{ paddingTop: '16px', float: 'right' }}>
							<Button
								variant='secondary'
								onClick={closeDeleteModal}
								disabled={loading}
								disableRipple
							>
								Cancel
							</Button>
							<Button
								variant='contained'
								color='error'
								style={{ marginLeft: '16px' }}
								onClick={deleteTemplate}
								disabled={loading}
								startIcon={<DeleteIcon />}
							>
								Delete
								{loading ? (
									<CircularProgress
										size='20px'
										style={{ marginLeft: '8px', color: 'white' }}
									/>
								) : null}
							</Button>
						</div>
					</Card>
				</Container>
			</Modal>
		</>
	);
}
