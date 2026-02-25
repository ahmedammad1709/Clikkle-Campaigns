import React, {
	useCallback,
	useEffect,
	useState,
	createContext,
	useContext,
	useMemo,
} from 'react';
import {
	Box,
	Grid,
	Typography,
	Divider,
	Button,
	Modal,
	Container,
	Card,
	CircularProgress,
	Select,
	FormControl,
	MenuItem,
} from '@mui/material';
import { Sync, DeleteOutline, LocalOfferOutlined } from '@mui/icons-material';
import ActionIcon from '../../../components/ActionIcon';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import LabelOffIcon from '@mui/icons-material/LabelOff';

import {
	DataGrid,
	GridFooterContainer,
	GridPagination,
	GridSelectedRowCount,
} from '@mui/x-data-grid';
import { columns, getRows, createRows } from '../../../services/allContacts';
import { Dialog2 } from './Dialog';
import { useAuthorize } from '../../../hooks/Authorize';

import { useParams } from 'react-router-dom';
import { useMessage } from '../../../components/Header.jsx';
import api from '../../../utilities/axios.js';

const functions = createContext();
export default function AllContacts(props) {
	const [rows, setRows] = useState([]);
	const [selectedContacts, setSelectedContacts] = useState([]);
	const { segmentId, tagId } = useParams();
	const [totalContacts, setTotalContacts] = useState(0);
	const httpErrorHandler = useHttpErrorHandler();
	const [pageSize, setPageSize] = useState(10);
	const [filter, setFilter] = useState(
		typeof props.subscribed === 'undefined' ? '' : props.subscribed
	);
	const [source, setSource] = useState(
		typeof props.source === 'undefined' ? '' : props.source
	);
	const [engagement, setEngagement] = useState(
		typeof props.engagement === 'undefined' ? '' : props.engagement
	);

	const pageType = useMemo(
		() => (segmentId ? 'segment' : tagId ? 'tag' : 'all'),
		[tagId, segmentId]
	);

	const updateRows = useCallback(
		async function (page) {
			page = +page + 1 || 1;

			setRows([]);
			setSelectedContacts([]);
			try {
				if (['tag', 'segment'].includes(pageType)) {
					const url = segmentId
						? `/user/segments/${segmentId}`
						: `/user/tags/${tagId}`;
					const response = await api.get(
						`${url}?page=${page}&pageSize=${pageSize}`,
						{}
					);

					setTotalContacts(response.data.pageData.totalData);
					setRows(createRows(response.data.contacts));
				}

				if (pageType === 'all') {
					const data = await getRows(
						page,
						pageSize,
						filter,
						engagement,
						source
					);
					setTotalContacts(data.pageData.totalData);
					setRows(data.contacts);
				}
			} catch (e) {
				httpErrorHandler(e);
			}
		},
		[
			segmentId,
			tagId,
			pageSize,
			filter,
			engagement,
			source,
			httpErrorHandler,
			pageType,
		]
	);

	useEffect(() => {
		updateRows();
	}, [updateRows]);

	return (
		<functions.Provider
			value={{
				selectedContacts: selectedContacts.map((index) => rows[index]),
				updateRows,
				httpErrorHandler,
				tagId,
				pageType,
			}}
		>
			<Box sx={{ width: '100%' }}>
				{/* <GuidedTour steps={steps} open={localStorage.getItem('tourOpen')==='true'}/> */}
				<Grid container spacing={1}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							{segmentId ? 'Preview Segment' : null}
							{tagId ? 'Preview Tag' : null}
							{segmentId || tagId ? null : 'Contacts'}
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							{segmentId ? 'All contacts of a particular segment.' : null}
							{tagId ? 'All contacts of a particular tag.' : null}
							{segmentId || tagId ? null : 'Manage your contacts from here.'}
						</Typography>
					</Grid>
					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							title='Sync'
							icon={<Sync />}
							onClick={updateRows}
						/>
						{segmentId || tagId ? null : (
							<Button
								className='AddContact'
								variant='contained'
								size='small'
								color='primary'
								component={Link}
								to='/contacts/import'
								startIcon={<AddCircle />}
							>
								Add Contact
							</Button>
						)}
					</Grid>
				</Grid>
				<Divider
					light
					sx={{
						marginTop: 2,
						marginBottom: 4,
					}}
				/>
				<Typography variant='subtitle2' gutterBottom color='textSecondary'>
					{segmentId ? `This segment has ${totalContacts} contacts.` : null}
					{tagId ? `This tag has ${totalContacts} contacts.` : null}
				</Typography>
				<Grid container spacing={3} alignItems='center' sx={{ my: 2 }}>
					<Grid item>
						<Typography
							variant='body1'
							style={{
								display: 'inline-block',
								marginRight: '16px',
								marginTop: '10px',
							}}
						>
							Filter
						</Typography>
						<FormControl
							sx={{
								outlined: 'inherit',
								'& .MuiSelect-outlined.MuiSelect-outlined': {
									padding: (1.4, 4.5, 1.4, 1),
								},
								'& .MuiSelect-select.MuiSelect-select': {
									pl: 1.5,
									pr: 3.7,
									py: 1,
								},
							}}
						>
							<Select
								value={filter}
								displayEmpty
								onChange={(e) => setFilter(e.target.value)}
							>
								<MenuItem value=''>All</MenuItem>
								<MenuItem value='true'>Subscribed</MenuItem>
								<MenuItem value='false'>Unsubscribed</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<Typography
							variant='body1'
							style={{
								display: 'inline-block',
								marginRight: '16px',
								marginTop: '10px',
							}}
						>
							Engagement
						</Typography>
						<FormControl
							sx={{
								outlined: 'inherit',
								'& .MuiSelect-outlined.MuiSelect-outlined': {
									padding: (1.4, 4.5, 1.4, 1),
								},
								'& .MuiSelect-select.MuiSelect-select': {
									pl: 1.5,
									pr: 3.7,
									py: 1,
								},
							}}
						>
							<Select
								displayEmpty
								value={engagement}
								onChange={(e) => setEngagement(e.target.value)}
							>
								<MenuItem value=''>All</MenuItem>
								<MenuItem value='rarely'>Rarely</MenuItem>
								<MenuItem value='sometimes'>Sometimes</MenuItem>
								<MenuItem value='often'>Often</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<Typography
							variant='body1'
							style={{
								display: 'inline-block',
								marginRight: '16px',
								marginTop: '10px',
							}}
						>
							Source
						</Typography>
						<FormControl
							sx={{
								outlined: 'inherit',
								'& .MuiSelect-outlined.MuiSelect-outlined': {
									padding: (1.4, 4.5, 1.4, 1),
								},
								'& .MuiSelect-select.MuiSelect-select': {
									pl: 1.5,
									pr: 3.7,
									py: 1,
								},
							}}
						>
							<Select
								displayEmpty
								value={source}
								onChange={(e) => setSource(e.target.value)}
							>
								<MenuItem value=''>All</MenuItem>
								<MenuItem value='manual'>Manual</MenuItem>
								<MenuItem value='imported'>Imported</MenuItem>
								<MenuItem value='form'>Form</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Box>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={pageSize}
						onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
						rowsPerPageOptions={[5, 10, 50, 100]}
						autoHeight
						checkboxSelection
						disableSelectionOnClick
						paginationMode='server'
						rowCount={totalContacts}
						onPageChange={(newPage) => updateRows(newPage)}
						onSelectionModelChange={(newSelectedContacts) => {
							setSelectedContacts(newSelectedContacts);
						}}
						components={{
							Footer: CustomToolbar,
						}}
						selectionModel={selectedContacts}
						style={{
							width: '100%',
							backgroundColor: '#FEFEFF00',
							// padding: "8px",
							borderColor: 'transparent',
						}}
					/>
				</Box>
			</Box>
		</functions.Provider>
	);
}

function CustomToolbar() {
	const authorize = useAuthorize();
	const { updateRows, selectedContacts, httpErrorHandler, tagId, pageType } =
		useContext(functions);
	const [addTS, setAddTS] = useState(false);
	const [deleteMsg, setDeleteMsg] = useState(false);
	const [removeTagModal, setRemoveTagModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const { showSuccess, showError } = useMessage();

	const openDeleteModal = () => {
		setDeleteMsg(true);
	};

	const closeDeleteModal = () => {
		setDeleteMsg(false);
	};

	const openRemoveTagModal = () => {
		setRemoveTagModal(true);
	};

	const closeRemoveTagModal = () => {
		setRemoveTagModal(false);
	};

	async function deleteContacts() {
		setLoading(true);
		const data = selectedContacts.map((contact) => contact._id);
		try {
			const response = await api.post( `/user/contacts/delete`, { ids: data });
			if (response.data.success) {
				updateRows();
			} else {
			}
			if (response.data.success) {
				showSuccess('Successfully contact deleted');
			} else {
				showError(response.data.message);
			}
		} catch (e) {
			authorize(false);
			httpErrorHandler(e);
		}
		setLoading(false);
		closeDeleteModal();
	}

	async function removeTag() {
		setLoading(true);
		const data = selectedContacts.map((contact) => contact._id);
		try {
			const response = await api.patch( `/user/contacts/remove-tag`, {
				contactIds: data,
				tagId,
			});

			if (response.data.success) {
				updateRows();
				showSuccess('Successfully tag removed');
			} else {
				showError(response.data.message);
			}
		} catch (e) {
			authorize(false);
			httpErrorHandler(e);
		}
		setLoading(false);
		closeRemoveTagModal();
	}

	async function subscribeContacts() {
		const data = selectedContacts.map((contact) => contact._id);
		try {
			const response = await api.patch( `/user/contacts/subscribe`, {
				ids: data,
			});
			if (response.data.success) {
				updateRows();
			} else {
			}

			if (response.data.success) {
				showError(response.data.message);
			} else {
				showSuccess(response.data.message);
			}
		} catch (e) {
			authorize(false);
			httpErrorHandler(e);
		}
	}
	async function unSubscribeContacts() {
		const data = selectedContacts.map((contact) => contact._id);
		try {
			const response = await api.patch( `/user/contacts/unsubscribe`, {
				ids: data,
			});
			if (response.data.success) {
				updateRows();
			} else {
			}
			if (response.data.success) {
				showSuccess(response.data.message);
			} else {
				showError(response.data.message);
			}
		} catch (e) {
			authorize(false);
			httpErrorHandler(e);
		}
	}

	const tagHandleClose = () => setAddTS(false);
	const tagHandleOpen = () => setAddTS(true);

	return (
		<>
			<GridFooterContainer
				style={{ margin: '8px', flexDirection: 'row-reverse' }}
			>
				<GridPagination />
				{selectedContacts.length ? (
					<Box display='flex'>
						<ActionIcon
							title='Delete'
							icon={<DeleteOutline />}
							color='primary'
							onClick={openDeleteModal}
						/>
						<ActionIcon
							title='Add Tag'
							icon={<LocalOfferOutlined />}
							color='primary'
							onClick={tagHandleOpen}
						/>
						{pageType === 'tag' && (
							<ActionIcon
								title='Remove tag from user'
								icon={<LabelOffIcon />}
								color='primary'
								onClick={openRemoveTagModal}
							/>
						)}
						<Dialog2
							state={addTS}
							handleClose={tagHandleClose}
							updateRows={updateRows}
						/>
						<ActionIcon
							title='Subscribe'
							icon={<MailOutlinedIcon />}
							color='primary'
							onClick={subscribeContacts}
						/>
						<ActionIcon
							title='Unsubscribe'
							icon={<UnsubscribeOutlinedIcon style={{ fontSize: '1.6rem' }} />}
							color='primary'
							onClick={unSubscribeContacts}
						/>

						<GridSelectedRowCount selectedRowCount={selectedContacts.length} />
					</Box>
				) : null}
			</GridFooterContainer>
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
							{selectedContacts.length === 1
								? `Do you want to delete contact ?`
								: 'Do you want to delete contacts ?'}
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
								color='secondary'
								style={{ marginLeft: '16px' }}
								onClick={deleteContacts}
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
				</Container>
			</Modal>
			<Modal
				open={removeTagModal}
				onClose={closeRemoveTagModal}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Container maxWidth='sm'>
					<Card style={{ width: '100%', padding: '32px' }}>
						<Typography variant='h6'>
							{selectedContacts.length === 1
								? `Do you want to remove tag from contact ?`
								: 'Do you want to remove tag contacts ?'}
						</Typography>
						<div style={{ paddingTop: '16px', float: 'right' }}>
							<Button
								variant='secondary'
								onClick={closeRemoveTagModal}
								disabled={loading}
								disableRipple
							>
								Cancel
							</Button>
							<Button
								variant='contained'
								color='secondary'
								style={{ marginLeft: '16px' }}
								onClick={removeTag}
								disabled={loading}
								startIcon={<DeleteIcon />}
							>
								Remove
								{loading ? (
									<CircularProgress size='20px' style={{ marginLeft: '8px' }} />
								) : null}
							</Button>
						</div>
					</Card>
				</Container>
			</Modal>
		</>
	);
}

export { functions };
