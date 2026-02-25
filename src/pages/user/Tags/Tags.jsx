import React, { useCallback, useEffect, useState, createContext } from 'react';
import {
	Box,
	Button,
	Card,
	Checkbox,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	MenuItem,
	Modal,
	OutlinedInput,
	Pagination,
	Select,
	Typography,
} from '@mui/material';
import Sync from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Entries from './Entries';
import ActionIcon from '../../../components/ActionIcon';
import AddTag from './AddTag';
import fetchTags from '../../../services/fetchTags';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

import ConditionalLoading from '../../../components/ConditionalLoading';
import Add from '@mui/icons-material/Add';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMessage } from '../../../components/Header.jsx';
import debounce from 'lodash.debounce';
import api from '../../../utilities/axios.js';

const sx = {
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
		borderRadius: '0px',

		'&:hover': {
			backgroundColor: '#4782da',
		},
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
			pl: 1.5,
			pr: 3.7,
			py: 1,
		},
	},
};

const functions = createContext();

export default function Tags() {
	const [tags, setTags] = useState(null);
	const [addFormModal, setAddFormModal] = useState(false);
	const [deleteMsg, setDeleteMsg] = useState(false);
	const { showSuccess, showError } = useMessage();
	const [loading, setLoading] = useState(false);
	const [sortBy, setSortBy] = useState('name');
	const [pageData, setPageData] = useState({});
	const [pageNo, setPageNo] = useState(1);
	const [searchTag, setSearchTag] = useState('');
	const [selected, setSelected] = useState([]);
	const [direction, setDirection] = useState(1);
	const httpErrorHandler = useHttpErrorHandler();

	const onChangeHandler = (e) => {
		setSearchTag(e.target.value);
		handleDebounceSearch();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleDebounceSearch = useCallback(
		debounce(async () => {
			setTags(null);

			try {
				const response = await fetchTags(sortBy, searchTag, direction);
				setTags(response.tags);
			} catch (e) {
				setTags([]);
				httpErrorHandler(e);
			}
		}, 100),
		[]
	);

	const getTags = useCallback(async () => {
		setTags(null);

		try {
			const response = await fetchTags(sortBy, '', direction, pageNo);
			setTags(response.tags);
			setPageData(response.pageData.totalPages);
		} catch (e) {
			setTags([]);
			httpErrorHandler(e);
		}
	}, [sortBy, httpErrorHandler, direction, pageNo]);

	const updateSelected = useCallback(
		(checked, index) => {
			if (checked) {
				setSelected([...selected, index]);
			} else {
				const newSelection = [...selected];
				newSelection.splice(selected.indexOf(index), 1);
				setSelected(newSelection);
			}
		},
		[selected]
	);

	const selectAll = (e) => {
		if (e.target.checked) setSelected(tags.map((_, i) => i));
		else setSelected([]);
	};

	const deleteSelected = async () => {
		setLoading(true);
		// setSelected([]);

		// const temp = tags;
		setTags(null);
		try {
			const response = await api.patch(
				 `/user/tags/delete`,
				{ ids: selected.map((i) => tags[i]._id) },
				{}
			);
			if (response.data.success) {
				showSuccess(response.data.message);
				await getTags();
				setSelected([]);
				// setTags(temp);
			} else {
				showError(response.data.message);
			}
		} catch (e) {
			httpErrorHandler(e);
		} finally {
			setLoading(false);
			closeDeleteModal();
		}
	};

	const openDeleteModal = () => {
		setDeleteMsg(true);
	};

	const closeDeleteModal = () => {
		setDeleteMsg(false);
	};

	useEffect(() => {
		getTags();
	}, [getTags]);

	return (
		<functions.Provider value={{ getTags }}>
			<Box sx={{ width: '100%', cursor: 'default' }}>
				<Grid container spacing={1} sx={sx.titleGrid}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							Tags
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							Manage your tags from here.
						</Typography>
					</Grid>

					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							title='Sync'
							icon={<Sync />}
							onClick={getTags}
						/>
						<Button
							variant='contained'
							size='small'
							color='primary'
							title='Add Tag'
							icon={<Add />}
							onClick={() => setAddFormModal(true)}
							startIcon={<AddCircle />}
						>
							Add Tag
						</Button>
					</Grid>
				</Grid>

				<Divider light sx={sx.divider} />

				<Grid container spacing={2}>
					<Grid item xs={12} sm>
						<FormControlLabel
							value='end'
							control={
								<Checkbox
									color='primary'
									checked={
										selected.length ===
										(tags && tags.length)
									}
									onChange={selectAll}
								/>
							}
							label='Sort by'
							labelPlacement='end'
							sx={sx.entriesText}
						/>
						<FormControl sx={sx.sortBy}>
							<Select
								input={<OutlinedInput />}
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
							>
								<MenuItem value='name'>Name</MenuItem>
								<MenuItem value='createdAt'>
									Created At
								</MenuItem>
							</Select>
						</FormControl>
						{direction === 1 ? (
							<IconButton
								sx={{ ml: 1 }}
								onClick={() => setDirection(-1)}
							>
								<ArrowDownwardIcon
									sx={{ fontSize: '1.4rem' }}
								/>
							</IconButton>
						) : (
							<IconButton
								sx={{ ml: 1 }}
								onClick={() => setDirection(1)}
							>
								<ArrowUpwardIcon sx={{ fontSize: '1.4rem' }} />
							</IconButton>
						)}
						{selected.length ? (
							<ActionIcon
								title='Delete'
								icon={<DeleteOutlined color='primary' />}
								style={{ marginLeft: '8px' }}
								onClick={openDeleteModal}
							/>
						) : null}
					</Grid>
					<Grid item xs={12} sm align='right'>
						<Input
							onChange={onChangeHandler}
							sx={{ width: { xs: '100%', sm: 'inherit', my: 1 } }}
							placeholder='Search Tags'
							startAdornment={
								<InputAdornment position='start'>
									<SearchIcon style={{ cursor: 'pointer' }} />
								</InputAdornment>
							}
						/>
					</Grid>
				</Grid>

				<Divider light sx={sx.divider} />

				<ConditionalLoading
					condition={tags}
					message='No Tags Found'
					style={{ margin: '25% 50%' }}
				>
					{tags && tags.length ? (
						tags.map((tag, i) => (
							<Entries
								key={tag._id}
								tag={tag}
								label={tag.name}
								time={new Date(
									tag.createdAt
								).toLocaleString()}
								selected={selected.includes(i)}
								index={i}
								id={tag._id}
								contacts={tag.contacts}
								onChange={updateSelected}
							/>
						))
					) : (
						<Box align='center' style={{ height: '85vh' }}>
							<Card
								style={{
									height: '50%',
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'column',
									justifyContent: 'center',
								}}
							>
								<Typography
									variant='h2'
									style={{ fontWeight: '500', letterSpacing: '5px' }}
								>
									No Tags
								</Typography>
								<Typography
									component='div'
									variant='subtitle2'
									style={{ marginTop: '16px' }}
								>
									Add New Tags
									<ActionIcon
										color='primary'
										title='Add Contact'
										icon={<Add />}
										onClick={() => setAddFormModal(true)}
										style={{ marginLeft: '8px' }}
									/>
								</Typography>
							</Card>
						</Box>
					)}
					<Box textAlign='right' my={2}>
						<Pagination
							page={pageNo}
							color='primary'
							count={pageData}
							sx={{ float: 'right' }}
							onChange={(_, newPage) => setPageNo(newPage)}
						/>
					</Box>
				</ConditionalLoading>
				<AddTag modal={addFormModal} setModal={setAddFormModal} />
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
								Do you want to delete tags ?
							</Typography>
							<div style={{ paddingTop: '16px', float: 'right' }}>
								<Button
									disabled={loading}
									variant='secondary'
									onClick={closeDeleteModal}
								>
									Cancel
								</Button>
								<Button
									color='secondary'
									variant='contained'
									disabled={loading}
									onClick={deleteSelected}
									style={{ marginLeft: '16px' }}
									startIcon={<DeleteIcon />}
								>
									Delete
									{loading ? (
										<CircularProgress
											size='20px'
											style={{ marginLeft: '8px' }}
										/>
									) : null}
								</Button>
							</div>
						</Card>
					</Container>
				</Modal>
			</Box>
		</functions.Provider>
	);
}

export { functions };
