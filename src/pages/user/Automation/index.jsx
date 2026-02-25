import {
	Box,
	Button,
	CircularProgress,
	Divider,
	FormControl,
	Grid,
	IconButton,
	MenuItem,
	OutlinedInput,
	Select,
} from '@mui/material';
import Typography from '../../../components/Typography';
import Sync from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { useState } from 'react';
import ActionIcon from '../../../components/ActionIcon';
import ConditionalLoading from '../../../components/ConditionalLoading';
import { Link, } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Entries from './Entries';

const automationItem = [
  {id:1,title:"Automation 1",isActive:false,contactList:'simple contact list 1',email:'email 1'},
  {id:2,title:"Automation 2",isActive:true,contactList:'simple contact list 2',email:'email 2'},
  {id:3,title:"Automation 3",isActive:false,contactList:'simple contact list 3',email:'email 3'},
]

export default function Automation(props) {
	const [automation, ] = useState(automationItem);
	const [loading, ] = useState(false);
	const [sortBy, setSortBy] = useState('name');
	//const [selected, setSelected] = useState('all');
	//const [search, setSearch] = useState('');
	const [direction, setDirection] = useState(1);


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

	// eslint-disable-next-line react-hooks/exhaustive-deps
    
	return (
			<Box sx={{ cursor: 'default', width: '100%' }}>
				<Grid container spacing={1} sx={sx.titleGrid}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							Automation
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							Manage your automation from here.
						</Typography>
					</Grid>

					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							title='Sync'
							icon={<Sync />}
						/>

						<Button
							variant='contained'
							size='small'
							color='primary'
							disabled={loading}
              component={Link}
              to={"/automation/new"}
							startIcon={<AddCircle />}>
							Create Automation
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
										 <MenuItem value={10}>Status</MenuItem>
                                        <MenuItem value={20}>Automation Name</MenuItem>
                                        <MenuItem value={30}>Numbers Of Email</MenuItem>
                                        <MenuItem value={40}>Date Modified</MenuItem>
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
										placeholder='Search ...'
									 
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
							condition={automation}
							message='No Automation found'
							style={{ margin: '25% 50% 0 50%' }}>
							{automation
								? automation.map((item) => (
									<Entries
										 item={item   }
										key={item}
									/>
								))
								: null}
						</ConditionalLoading>
					</Grid>
				</Grid>
			</Box>
	);
}
