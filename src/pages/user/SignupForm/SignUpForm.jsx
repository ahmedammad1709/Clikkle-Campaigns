import {
	Box,
	Button,
	Card,
	Checkbox,
	CircularProgress,
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
} from '@mui/material';
import Typography from '../../../components/Typography';
import Sync from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import React, { createContext, useEffect, useState, useCallback } from 'react';
import ActionIcon from '../../../components/ActionIcon';
import DeleteIcon from '@mui/icons-material/Delete';

import Entries from './Entries';
import { Link } from 'react-router-dom';

import ConditionalLoading from '../../../components/ConditionalLoading';
import { Container } from '@mui/system';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMessage } from '../../../components/Header.jsx';
import debounce from 'lodash.debounce';
import api from '../../../utilities/axios.js';

const functions = createContext();
export default function SignUpForm() {
	const sx = {
		divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
		spacingText: {
			padding: (1, 0),
		},
		spacingText1: {
			padding: (1, 3),
		},
		spacingText2: {
			padding: (0, 5),
		},
		numText: {
			'& .MuiInputBase-input': {
				textAlign: 'right',
			},
			'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
				marginLeft: '5px',
			},
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
		dirColumn: {
			flexDirection: 'column',
			paddingTop: 0,
			paddingLeft: 6,
		},

		formContainer: {
			height: '70vh',
			padding: '24px 48px',
			overflow: 'auto',
		},
	};
	const [forms, setForms] = useState(null);
	const [direction, setDirection] = useState(1);
	const [sortBy, setSortBy] = useState('name');
	const [search, setSearch] = useState('');
	const { showSuccess, showError } = useMessage();
	const pageSize = 10;
	const [modal, setModal] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [selected, setSelected] = useState([]);

	const httpErrorHandler = useHttpErrorHandler();
	const openDeleteModal = () => setModal(true);
	const closeDeleteModal = () => setModal(false);

	const getForms = useCallback(async () => {
		setForms(null);
		try {
			const response = await api.get(
				 `/user/signupforms?sortBy=${sortBy}&pageSize=${pageSize}&direction=${direction}`,
				{}
			);

			setForms(response.data.forms);
			// console.log(response.data.forms);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [setForms, sortBy, httpErrorHandler, direction]);

	const onChangeHandler = e => {
		setSearch(e.target.value);
		handleDebounceSearch()
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleDebounceSearch = useCallback(debounce(async () => {
		setForms(null);
		try {
			const response = await api.get(
				 `/user/signupforms?sortBy=${sortBy}&search=${search}&pageSize=${pageSize}&direction=${direction}`,
				{}
			);
			setForms(response.data.forms);
			// console.log(response.data.forms);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, 100), [])

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

	const deleteSelected = async () => {
		setDeleting(true);
		setSelected([]);
		setForms(null);
		try {
			const response = await api.patch(
				 `/user/signupforms/delete`,
				{ ids: selected.map(i => forms[i]._id) },
				{}
			);

			if (response.data.success) {
				showSuccess(response.data.message);
			} else {
				showError(response.data.message);
			}
			setDeleting(false);
		} catch (e) {
			console.log(e);
			httpErrorHandler(e);
		}
		closeDeleteModal();
		setDeleting(false);
		getForms();
	};

	const selectAll = e => {
		if (e.target.checked) setSelected(forms.map((_, i) => i));
		else setSelected([]);
	};

	useEffect(() => {
		getForms();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<functions.Provider value={{ getForms, setForms }}>
			<Box sx={{ width: '100%', cursor: 'default' }}>
				<Grid container spacing={1}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							SignUp Form
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							Manage your SignUp forms from here.
						</Typography>
					</Grid>
					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							onClick={getForms}
							title='Sync'
							icon={<Sync />}
						/>

						<Button
							variant='contained'
							component={Link}
							to='/contacts/create-signup-forms'
							size='small'
							color='primary'
							startIcon={<AddCircle />}>
							Create Form
						</Button>
					</Grid>
				</Grid>
				<Divider light sx={sx.divider} />
				<>
					<Grid container spacing={2} style={{ marginTop: '16px', marginBottom: '8px' }}>
						<Grid item xs={12} sm>
							<FormControlLabel
								value='end'
								control={
									<Checkbox
										color='primary'
										checked={selected.length === (forms && forms.length)}
										onChange={selectAll}
									/>
								}
								label='Sort by'
								labelPlacement='end'
							/>

							<FormControl sx={sx.sortBy}>
								<Select
									input={<OutlinedInput />}
									value={sortBy}
									onChange={e => setSortBy(e.target.value)}>
									<MenuItem value='name'>Name</MenuItem>
									<MenuItem value='dateCreated'>Date Created</MenuItem>
								</Select>
							</FormControl>
							{direction === 1 ? (
								<IconButton sx={{ ml: 1 }} onClick={() => setDirection(-1)}>
									<ArrowDownwardIcon sx={{ fontSize: '1.4rem' }} />
								</IconButton>
							) : (
								<IconButton sx={{ ml: 1 }} onClick={() => setDirection(1)}>
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
								placeholder='Search saved forms'
								sx={{ width: { xs: '100%', sm: 'inherit' } }}
								startAdornment={
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								}
								onChange={onChangeHandler}
							/>
						</Grid>
					</Grid>
					<Divider light sx={sx.divider} />
					<ConditionalLoading
						condition={forms}
						message='No Forms found'
						style={{ margin: '25% 50%' }}>
						{forms
							? forms.map((form, i) => (
								<Entries
									label={form.name}
									lastEditOn={new Date(form.dateCreated).toLocaleString()}
									id={form._id}
									key={form._id}
									index={i}
									onChange={updateSelected}
									selected={selected.includes(i)}
								/>
							))
							: null}
						<Pagination sx={{ float: 'right' }} count={5} />
					</ConditionalLoading>
					<Modal
						open={modal}
						onClose={closeDeleteModal}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Container maxWidth='sm'>
							<Card style={{ width: '100%', padding: '32px' }}>
								<Typography variant='h6'>
									{forms && selected.length === 1
										? 'Do you want to delete ' +
										forms[selected[0]].name +
										' form ? '
										: 'Do you want to delete selected forms ?'}
								</Typography>
								<div style={{ paddingTop: '16px', float: 'right' }}>
									<Button
										variant='secondary'
										onClick={closeDeleteModal}
										disableRipple
										disabled={deleting}>
										Cancel
									</Button>
									<Button
										variant='contained'
										color='secondary'
										style={{ marginLeft: '16px' }}
										onClick={deleteSelected}
										disabled={deleting}
										startIcon={<DeleteIcon />}>
										Delete
										{deleting ? (
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
			</Box>
		</functions.Provider>
	);
}
export { functions };
