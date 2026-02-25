import React, { createContext, useEffect, useState, useCallback } from 'react';
import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	MenuItem,
	OutlinedInput,
	Select,
} from '@mui/material';
import Sync from '@mui/icons-material/Sync';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Entries from './Entries';
import Typography from '../../../components/Typography';
import ActionIcon from '../../../components/ActionIcon';
import CreateSegment from './CreateSegment';

import ConditionalLoading from '../../../components/ConditionalLoading';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import debounce from 'lodash.debounce';
import api from '../../../utilities/axios';

const functions = createContext();
export default function Segments() {
	const [segmentModal, setSegmentModal] = useState(false);
	const [sortBy, setSortBy] = useState('name');
	const [search, setSearch] = useState('');
	const [direction, setDirection] = useState(1);

	const modalOpen = () => {
		setSegmentModal(true);
	};

	const modalClose = () => {
		setSegmentModal(false);
	};

	const httpErrorHandler = useHttpErrorHandler();

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

	const [segment, setSegment] = useState(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleDebounceSearch = useCallback(debounce(async () => {
		setSegment(null);
		try {
			const response = await api.get(
				 `/user/segments?sortBy=${sortBy}&search=${search}&direction=${direction}`,
				{}
			);
			setSegment(response.data.segments);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, 100), [])

	const getSegments = useCallback(async () => {
		setSegment(null);
		try {
			const response = await api.get(
				 `/user/segments?sortBy=${sortBy}&direction=${direction}`,
				{}
			);
			setSegment(response.data.segments);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [sortBy, setSegment, httpErrorHandler, direction]);

	const onChangeHandler = e => {
		setSearch(e.target.value);
		handleDebounceSearch();
	};

	useEffect(() => {
		getSegments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<functions.Provider value={{ getSegments }}>
			<Box sx={{ width: '100%' }}>
				<Grid container spacing={1}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							Segments
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							Manage your segments from here.{' '}
						</Typography>
					</Grid>
					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							title='Sync'
							onClick={getSegments}
							icon={<Sync />}
						/>

						<Button
							variant='contained'
							size='small'
							color='primary'
							startIcon={<AddCircle />}
							onClick={modalOpen}>
							Create Segments
						</Button>
					</Grid>
				</Grid>
				<Divider light sx={sx.divider} />
				<Grid container>
					<Grid item xs>
						<Typography
							variant='body1'
							style={{
								display: 'inline-block',
								marginRight: '16px',
								marginTop: '10px',
							}}>
							Sort by
						</Typography>
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
					</Grid>
					<Grid item xs align='right'>
						<Input
							onChange={onChangeHandler}
							placeholder='Search Segments'
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
					condition={segment}
					message='No Segments found'
					style={{ margin: '25% 50%' }}>
					{segment
						? segment.map(segment => (
							<Entries
								key={segment._id}
								label={segment.name}
								time={new Date(segment.dateCreated).toLocaleString()}
								id={segment._id}
							/>
						))
						: null}
				</ConditionalLoading>
				<CreateSegment modalOpen={segmentModal} modalClose={modalClose} />
			</Box>
		</functions.Provider>
	);
}
export { functions };
