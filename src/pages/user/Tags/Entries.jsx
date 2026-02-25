import {
	Button,
	Card,
	Checkbox,
	CircularProgress,
	Box,
	Divider,
	FormControlLabel,
	Modal,
	Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '../../../components/Typography';



import { useNavigate } from 'react-router-dom';
import { functions } from './Tags';
import { useContext, memo, useState } from 'react';
import EditTag from './EditTag';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { RemoveRedEye } from '@mui/icons-material';
import api from '../../../utilities/axios';

const sx = {
	root: {},
	titleGrid: {},
	divider: {
		marginTop: 2,
		marginBottom: 3.15,
	},
	rowDivider: {
		marginTop: 2,
		marginBottom: 2,
	},
	entries: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		cursor: 'default',
	},
	entriesText: {
		'& .MuiTypography-': {
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
		borderRadius: '0px',
	},
	toggleButton: {
		padding: '5px 0',
		borderRadius: '0px',
		minWidth: '30px',
	},
	timeLine: {
		// marginLeft: (4),
		fontSize: '0.7rem',
		paddingLeft: 1,
	},
	sortBy: {
		outlined: 'inherit',
		'& .MuiSelect-outlined.MuiSelect-outlined': {
			padding: (1.4, 4.5, 1.4, 1),
		},
		'& .MuiSelect-select.MuiSelect-select': {
			padding: (1.4, 4.5, 1.4, 1),
		},
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: (1, 1, 1, 0),
		transition: 'ease',
		width: '100%',
	},
};

function Entries(props) {
	const [deleteMsg, setDeleteMsg] = useState(false);
	const { onChange, index, selected, id } = props;
	const { label, time, contacts, tag } = props;
	const { getTags, showMessage } = useContext(functions);
	const [loading, setLoading] = useState(false);
	const [editFormModal, setEditFormModal] = useState(null);
	const httpErrorHandler = useHttpErrorHandler();
	const navigate = useNavigate();

	const openEditModal = () => {
		setEditFormModal(tag);
	};

	const deleteTag = async () => {
		setLoading(true);
		const url =  `/user/tags/delete`;
		try {
			const response = await api.patch(url, { ids: id }, {});
			if (response.data.success)
				showMessage?.({ success: response.data.message });
			else showMessage?.({ error: response.data.message });
			setLoading(false);
			closeDeleteModal();
			getTags();
		} catch (e) {
			httpErrorHandler(e);
		}
	};

	const handleSetModel = (value) => {
		setEditFormModal(value);
		getTags();
	};

	const openDeleteModal = () => {
		setDeleteMsg(true);
	};

	const closeDeleteModal = () => {
		setDeleteMsg(false);
	};

	return (
		<>
			<Box sx={sx.entries}>
				<Grid
					container
					spacing={1}
					justifyContent='flex-start'
					alignItems='flex-start'
				>
					<Grid item>
						<FormControlLabel
							value='end'
							sx={{ mr: 0 }}
							control={
								<Checkbox
									color='primary'
									checked={selected}
									onChange={(e) => onChange(e.target.checked, index)}
								/>
							}
						/>
					</Grid>

					<Grid item style={{ paddingLeft: '8px' }}>
						<Typography
							variant='h5'
							color='primary'
							onClick={() => navigate(`/contacts/tags/${id}`)}
							style={{ cursor: 'pointer' }}
						>
							{label}
						</Typography>
						<Typography variant='body2' component='div'>
							<b>Created </b> on {time}
						</Typography>
					</Grid>

					<Grid item xs={12} sm align='right' sx={{ mt: 1 }}>
						<Button
							color='secondary'
							startIcon={<RemoveRedEye />}
							onClick={() => navigate(`/contacts/tags/${id}`)}
						>
							View
						</Button>

						<Button onClick={openEditModal} color='info' startIcon={<Edit />}>
							Edit
						</Button>
						<Button
							onClick={openDeleteModal}
							color='error'
							startIcon={<Delete />}
						>
							Delete
						</Button>
					</Grid>
				</Grid>
			</Box>
			<EditTag modal={editFormModal} setModal={handleSetModel} />

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
				<Card
					style={{
						width: { xs: '100%', md: '40%' },
						padding: '32px',
					}}
				>
					<Typography variant='h6'>Do you want to delete {label} ? </Typography>
					<Typography variant='body1'>
						{label} is assigned to {contacts} contacts
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
							onClick={deleteTag}
							disabled={loading}
							startIcon={<DeleteIcon />}
						>
							Delete
							{loading ? (
								<CircularProgress size='20px' style={{ marginLeft: '8px' }} />
							) : null}
						</Button>
					</div>
				</Card>
			</Modal>
		</>
	);
}

export default memo(Entries);
