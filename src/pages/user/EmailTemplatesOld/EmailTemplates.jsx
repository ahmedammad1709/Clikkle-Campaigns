import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Sync from '@mui/icons-material/Sync';
import {
	AppBar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	MenuItem,
	Modal,
	OutlinedInput,
	Select,
	Tab,
	Tabs,
} from '@mui/material';

import { createContext, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';
import ConditionalLoading from '../../../components/ConditionalLoading';
import Typography from '../../../components/Typography';
import useHttpErrorHandler from '../../../utilities/httpErrorHandler';
import Entries from './Entries';
import MarketPlace from './MarketPlace';
import debounce from 'lodash.debounce';
import api from '../../../utilities/axios';

function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div role='tabpanel' hidden={value !== index}>
			{value === index && (
				<Box p={3}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

const functions = createContext();

export default function EmailTemplates() {
	const sx = {
		root: {
			cursor: 'default',
		},
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

		box: {
			marginTop: 3,
			border: ' 1px solid #626A76',
			padding: 4,
		},

		entriesText: {
			'& .MuiTypography-body1': {
				paddingLeft: 1,
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

		list: {
			flexGrow: 1,
			width: '100%',
			paddingTop: '0',
		},

		search: {
			position: 'relative',
			paddingLeft: 1,
			borderRadius: '8px',
			border: ' 1px solid #626A76',
			backgroundColor: 'inherit',
			'&:hover': {
				backgroundColor: 'inherit',
			},
			marginRight: 2,
			marginLeft: 0,
			width: '100%',
		},
		searchIcon: {
			padding: (0, 0),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	};

	const [ownedTemplates, setOwnedTemplates] = useState(null);
	const [modal, setModal] = useState(false);
	const [sortBy, setSortBy] = useState('name');
	const [search, setSearch] = useState('');
	const [value, setValue] = useState(0);
	const [direction, setDirection] = useState(1);
	const [open, setOpen] = useState(false);
	const [openViewModal, setOpenViewModal] = useState(false);
	const [viewId, setViewId] = useState('');
	const [templateName, setTemplateName] = useState('');
	const navigate = useNavigate();

	const handleSetTemplateName = (event) => {
		setTemplateName(event.target.value);
	};

	const loading = false;
	const httpErrorHandler = useHttpErrorHandler();

	const openModal = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	const tabHandleChange = (e, newValue) => {
		setValue(newValue);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleDebounceSearch = useCallback(
		debounce(async () => {
			setOwnedTemplates(null);
			try {
				const response = await api.get(
					 `/user/templates?sortBy=${sortBy}&search=${search}&direction=${direction}`,
					{}
				);
				setOwnedTemplates(response.data.templates);
				// console.log(response.data.templates);
			} catch (e) {
				httpErrorHandler(e);
			}
		}, 100),
		[]
	);

	const getOwned = useCallback(async () => {
		setOwnedTemplates(null);
		try {
			const response = await api.get( `/user/templates?sortBy=${sortBy}&direction=${direction}`, {});
			setOwnedTemplates(response.data.templates);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [setOwnedTemplates, sortBy, httpErrorHandler, direction]);

	const onSearchHandler = (e) => {
		setSearch(e.target.value);
		handleDebounceSearch();
	};

	const createTemplater = async (templateName) => {
		return await api
			.post( `/user/templates`, { name: templateName })
			.then((data) => {
				const { templateId } = data.data;
				navigate(`/campaigns/templates/create/${templateId}`);
			});
	};

	const handleCreateButton = () => {
		createTemplater(templateName);
		setOpen(true);
	};

	const updateTemplate = (id) => {
		navigate(`/campaigns/templates/create/${id}`);
	};

	const showTemplateView = (id) => {
		setViewId(id);
		setOpenViewModal(true);
	};

	useEffect(() => {
		getOwned();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<functions.Provider value={{ getOwned }}>
			<Box sx={{ width: '100%', cursor: 'default' }}>
				<Grid container spacing={1} sx={sx.titleGrid}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							Templates
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							Manage your templates from here.
						</Typography>
					</Grid>
					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							title='Sync'
							icon={<Sync />}
							onClick={getOwned}
						/>
						<Button
							variant='contained'
							size='small'
							color='primary'
							onClick={openModal}
							startIcon={<AddCircle />}
						>
							Add Templates
						</Button>
					</Grid>
				</Grid>

				<Divider light sx={sx.divider} />

				<Grid
					container
					spacing={2}
					style={{ marginTop: '16px', marginBottom: '8px' }}
				>
					<Grid item xs>
						<Typography
							variant='body1'
							style={{
								display: 'inline-block',
								marginRight: '16px',
								marginTop: '10px',
							}}
						>
							Sort by
						</Typography>
						<FormControl sx={sx.sortBy}>
							<Select
								value={sortBy}
								input={<OutlinedInput />}
								onChange={(e) => setSortBy(e.target.value)}
							>
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

					<Grid item xs align='right'>
						<Input
							placeholder='Search owned templates'
							startAdornment={
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							}
							onChange={onSearchHandler}
						/>
					</Grid>
				</Grid>

				<Divider light sx={sx.divider} />

				<ConditionalLoading
					condition={ownedTemplates}
					message='No Template found'
					style={{ margin: '25% 50%' }}
				>
					{ownedTemplates
						? ownedTemplates.map((temp, i) => (
							<Entries
								label={temp.name}
								key={i}
								id={temp._id}
								lastEditOn={temp.createdAt}
								showTemplateView={(id) => showTemplateView(id)}
							/>
						))
						: null}
				</ConditionalLoading>

				<Modal
					open={modal}
					onClose={closeModal}
					keepMounted
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<Container
						maxWidth='lg'
						style={{
							minHeight: '60vh',
							maxHeight: '80vh',
							overflowY: 'overlay',
						}}
					>
						<Card elevation={5} style={{ px: 2, width: '100%' }}>
							<AppBar
								position='static'
								elevation={0}
								sx={{ background: 'transparent', padding: '8px', mb: 0 }}
							>
								<Tabs value={value} onChange={tabHandleChange}>
									<Tab label='MarketPlace' />
									<Tab label='Create Templates' />
								</Tabs>
							</AppBar>
							<TabPanel value={value} index={0}>
								<MarketPlace />
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'column',
										justifyContent: 'center',
									}}
								>
									<Box
										component='img'
										src='/images/createtemplate.svg'
										sx={{
											maxWidth: { xs: '300px', xl: '500px' },
											width: '100%',
											margin: '24px',
										}}
									/>
									<Button
										variant='contained'
										size='small'
										sx={{ my: 2, py: 1 }}
										color='secondary'
										disabled={loading}
										component={Link}
										to='/campaigns/templates'
										onClick={() => setOpen(true)}
										startIcon={<AddCircle />}
									>
										Create Template
										{loading ? (
											<CircularProgress
												size='20px'
												style={{ marginLeft: '8px', color: 'white' }}
											/>
										) : null}
									</Button>
									<CreateModal
										open={open}
										setOpen={setOpen}
										setTemplateName={handleSetTemplateName}
										handleCreateButton={handleCreateButton}
									/>
								</Box>
							</TabPanel>
						</Card>
					</Container>
				</Modal>

				<ViewModal
					id={viewId}
					open={openViewModal}
					setOpen={setOpenViewModal}
					updateTemplate={updateTemplate}
				/>
			</Box>
		</functions.Provider>
	);
}

export function CreateModal({
	open,
	setOpen,
	setTemplateName,
	handleCreateButton,
}) {
	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		margin: 'auto',
		textAlign: 'center',
		top: '50%',
		left: '50%',
		padding: '50px',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.default',
		boxShadow: 24,
		borderRadius: '20px',
		p: 4,
	};

	const handleClose = () => setOpen(false);
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Input
						onChange={setTemplateName}
						placeholder='A name for your template'
						sx={{ marginBottom: '20px' }}
					/>
					<Button
						variant='contained'
						size='small'
						sx={{ my: 2, py: 1 }}
						color='secondary'
						onClick={handleCreateButton}
						startIcon={<AddCircle />}
					>
						Create
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export function ViewModal({ open, setOpen, id, updateTemplate }) {
	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		margin: 'auto',
		textAlign: 'center',
		top: '50%',
		left: '50%',
		padding: 0,
		overflow: 'hidden',
		transform: 'translate(-50%, -50%)',
		width: 900,
		height: 520,
		bgcolor: 'background.default',
		boxShadow: 24,
		borderRadius: '20px',
	};
	const [loading, setLoading] = useState(true);
	const [template, setTemplate] = useState(null);

	const handleClose = () => {
		setOpen(false);
		setLoading(false);
	};

	const savedDataFetcher = async (id) => {
		setLoading(true);
		const data = await api.get( `/user/templates/${id}`);
		// console.log(data.data.template);
		const html = data.data.template?.templateHtml;
		setLoading(false);
		// const tempNode = document.createElement('div');
		// if (!judger) {
		//   tempNode.innerHTML = footer;
		//   setTemplate(tempNode);
		//   return;
		// }
		// const htmlData = data.data.template?.[0].content.html;
		// tempNode.innerHTML = htmlData;
		setTemplate(html);
		return;
	};

	useEffect(() => {
		savedDataFetcher(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					{loading ? (
						<CircularProgress
							size='100px'
							style={{ margin: 'auto', color: '#172D5A' }}
						/>
					) : (
						<div style={{ width: '100%', height: '100%' }}>
							<IconButton
								sx={{ position: 'absolute', right: '10px', top: '10px' }}
								onClick={() => updateTemplate(id)}
							>
								<EditIcon sx={{ fontSize: '2rem' }} />
							</IconButton>
							<iframe
								title='Template'
								srcDoc={template ? template : null}
								style={{ width: '100%', height: '100%' }}
							/>
						</div>
					)}
				</Box>
			</Modal>
		</div>
	);
}

export { functions };
