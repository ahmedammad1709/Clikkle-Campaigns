import {
	Box,
	Button,
	CircularProgress,
	Divider,
	FormControl,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
} from '@mui/material';
import Typography from '../../../components/Typography';
import SubjectIcon from '@mui/icons-material/Subject';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Sync from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import ActionIcon from '../../../components/ActionIcon';
import ConditionalLoading from '../../../components/ConditionalLoading';
import Entries from './Entries';
import { useNavigate } from 'react-router-dom';

import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import debounce from 'lodash.debounce';
import api from '../../../utilities/axios';

const functions = createContext();

export default function Campaigns(props) {
	const [campaigns, setCampaigns] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sortBy, setSortBy] = useState('name');
	const [selected, setSelected] = useState('all');
	const [search, setSearch] = useState('');
	const [direction, setDirection] = useState(1);
	const navigate = useNavigate();

	const sx = {
		tabsRoot: {
			flexGrow: 1,
		},
		appBar: {
			background: 'inherit',
		},
		divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
		search: {
			position: 'relative',
			paddingLeft: 1,
			borderRadius: '10px',
			border: ' 1px solid #626A76',
			backgroundColor: 'inherit',
			'&:hover': {
				backgroundColor: 'inherit',
			},
			marginRight: 2,
			marginBottom: 1,
			marginLeft: 0,
			width: '100%',
		},
		searchIcon: {
			padding: (1, 1),
			height: '100%',
			position: 'absolute',

			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},

		inputInput: {
			padding: (1, 1, 1, 1),
			paddingLeft: `calc(1em + ${20}px)`,
			transition: 'ease',
			width: '100%',
		},
		box: {
			marginTop: 3,
			border: ' 1px solid #626A76',
			padding: 4,
		},
		sortBy: {
			// outlined: "inherit",
			'& .MuiSelect-outlined.MuiSelect-outlined': {
				padding: (1.4, 4.5, 1.4, 1),
			},
			'& .MuiSelect-select.MuiSelect-select': {
				pl: 1.5,
				pr: 3.7,
				py: 1,
			},
		},
		// Entries Css
	};

	const drawer = {
		icon: {
			fontSize: '30px',
			marginRight: 1,
		},
		list: {
			flexGrow: 1,
			width: '100%',
		},
	};

	const httpErrorHandler = useHttpErrorHandler();

	const createNewCampaign = async () => {
		setLoading(true);
		try {
			const response = await api.post(`/user/campaigns`);
			const campaignId = response.data.id;
			const campaignName = response.data.name;
			navigate(`/campaigns/create/${campaignName}/${campaignId}`);
		} catch (e) {
			httpErrorHandler(e);
		}
		setLoading(false);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleSearchDebounce = useCallback(debounce(
		async () => {
			setCampaigns(null);
			try {
				const response = await api.get(
					 `/user/campaigns?sortBy=${sortBy}&search=${search}&direction=${direction}`,
					{}
				);
				setCampaigns(response.data.campaigns);
				// console.log(response.data.campaigns);
			} catch (e) {
				httpErrorHandler(e);
			}
		}, 100
	), [])


	const getCampaigns = useCallback(async () => {
		setCampaigns(null);
		try {
			const response = await api.get(
				 `/user/campaigns?sortBy=${sortBy}&direction=${direction}`,
				{}
			);
			setCampaigns(response.data.campaigns);
			// console.log(response.data.campaigns);
		} catch (e) {
			httpErrorHandler(e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortBy, direction]);

	const filterCampaigns = status =>
		status === 'all' ? campaigns : campaigns.filter(campaign => campaign.status === status);

	useEffect(() => {
		getCampaigns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const statusOptions = [
		{ label: 'All', value: 'all', icon: SubjectIcon },
		{ label: 'Ongoing', value: 'ongoing', icon: AutorenewIcon },
		{ label: 'Draft', value: 'draft', icon: PauseCircleFilledIcon },
		{ label: 'Completed', value: 'completed', icon: CheckCircleIcon },
	]

	return (
		<functions.Provider value={{ getCampaigns }}>
			<Box sx={{ cursor: 'default', width: '100%' }}>
				<Grid container spacing={1} sx={sx.titleGrid}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							Campaigns Manager
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							Manage your campaigns from here.
						</Typography>
					</Grid>

					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							title='Sync'
							icon={<Sync />}
							onClick={getCampaigns}
						/>

						<Button
							variant='contained'
							size='small'
							color='primary'
							disabled={loading}
							onClick={createNewCampaign}
							startIcon={<AddCircle />}>
							Create Campaigns
							{loading ? (
								<CircularProgress
									size='20px'
									style={{ marginLeft: '8px', color: 'white' }}
								/>
							) : null}
						</Button>
					</Grid>
				</Grid>

				<Divider light sx={sx.divider} />

				<Grid container>
					<Grid item xs={12} sm={3} lg={2}>
						<List component='nav' sx={drawer.list}>
							<Typography
								variant='subtitle1'
								color='textSecondary'
								style={{
									fontWeight: '500',
									padding: '8px 16px',
									textAlign: 'left',
								}}>
								View by Status
							</Typography>

							{statusOptions.map((status) => (
								<ListItem
									variant='NavListLight'
									button
									selected={selected === status.value}
									onClick={() => setSelected(status.value)}>
									<ListItemIcon>
										<status.icon />
									</ListItemIcon>
									<ListItemText>{status.label}</ListItemText>
								</ListItem>
							))}
							<Divider light sx={sx.divider} />
						</List>
					</Grid>

					<Grid item md sm={8} xs={12} style={{ padding: '20px' }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
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
										<MenuItem value='createdAt'>Created At</MenuItem>
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

							<Grid item xs={12} sm={6}>
								<Box sx={sx.search}>
									<IconButton sx={sx.searchIcon}>
										<SearchIcon />
									</IconButton>
									<InputBase
										placeholder='You can also search by all audiences.'
										onChange={e => {
											setSearch(e.target.value)
											handleSearchDebounce()
										}}
										sx={{
											width: '100%',
											input: sx.inputInput,
										}}
									/>
								</Box>
							</Grid>
						</Grid>

						<div style={{ marginTop: '16px', marginBottom: '16px' }}>
							<Divider light sx={sx.divider} />
						</div>

						<ConditionalLoading
							condition={campaigns}
							message='No Campaigns found'
							style={{ margin: '25% 50% 0 50%' }}>
							{campaigns
								? filterCampaigns(selected).map(item => (
									<Entries
										label={item.name}
										opensPercent={item.opens}
										clicksPercent={item.clicks}
										sent={`${item.sent}/${item.total}`}
										createdAt={new Date(item.createdAt).toLocaleString()}
										status={item.status}
										to={item.to}
										id={item._id}
										key={item._id}
									/>
								))
								: null}
						</ConditionalLoading>
					</Grid>
				</Grid>
			</Box>
		</functions.Provider>
	);
}

export {
	functions
};
