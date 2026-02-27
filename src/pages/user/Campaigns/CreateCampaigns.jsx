import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	AppBar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputBase,
	MenuItem,
	Modal,
	Select,
	Tab,
	Tabs,
} from '@mui/material';

import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useParams } from 'react-router-dom';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Typography from '../../../components/Typography';
import ActionIcon from '../../../components/ActionIcon';
import { Input } from './../../../hooks/useForm/inputs';
import { useMessage } from '../../../components/Header.jsx';
import { Form, Submit, useForm } from './../../../hooks/useForm';
import useHttpErrorHandler from '../../../utilities/httpErrorHandler';
import ConditionalLoading from '../../../components/ConditionalLoading';
import api from '../../../utilities/axios.js';

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

export default function CreateCampaigns() {
	const [expanded, setExpanded] = useState(false);
	const [input, setInput] = useState(false);
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [sending, setSending] = useState(false);
	const [contentLoading, setContentLoading] = useState(false);
	const { showSuccess, showError } = useMessage();
	let { newId, id, campaignName } = useParams(); // id will be set if edit page is rendered
	const [collectionId, setCollectionId] = useState('default'); // will contain id and type
	const [selectOption, setSelectOption] = useState(false);
	const [segments, setSegments] = useState([]);
	const [tags, setTags] = useState([]);
	const [status, setStatus] = useState('');
	const [templates, setTemplates] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [value, setValue] = useState(0);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	const httpErrorHandler = useHttpErrorHandler();

	newId = id ? id : newId; // Setting newId to perform all actions normally

	// Use Form Hooks
	const handlers = useForm(
		useMemo(
			() => ({
				name: {
					required: true,
					validator: [
						(value) =>
							value.toLowerCase() === value
								? ''
								: 'Characters must be in Lowercase',
					],
				},
				id: { value: newId },
			}),
			[newId]
		)
	);

	const fromHandlers = useForm(
		useMemo(
			() => ({
				name: { required: true },
				email: { required: true },
			}),
			[]
		)
	);

	const subjectHandlers = useForm(
		useMemo(
			() => ({
				subject: { required: true },
				previewText: { required: true },
			}),
			[]
		)
	);

	const fromSetValues = fromHandlers.setValues;
	const subjectSetValues = subjectHandlers.setValues;

	const tabHandleChange = (e, newValue) => {
		setValue(newValue);
	};

	const getOwnedTemplates = useCallback(async () => {
		setTemplates(null);
		try {
			const response = await api.get(`/user/templates?search=${search}`, {});
			setTemplates(response.data.templates);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [search, setTemplates, httpErrorHandler]);

	const getCampaignsData = useCallback(async () => {
		if (!id) return; // If create new Page is rendered
		try {
			const response = await api.get( `/user/campaigns/${newId}`);
			const campaign = response.data.data;
			if (!campaign) return;

			setName(campaign.name);
			setCollectionId(campaign.to.id);
			fromSetValues({ name: campaign.from.name, email: campaign.from.email });
			subjectSetValues({
				subject: campaign.subject,
				previewText: campaign.previewText,
			});
			setStatus(campaign.status);
		} catch (e) {
			httpErrorHandler(e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, newId, fromSetValues, subjectSetValues]);

	const getSegments = useCallback(async () => {
		try {
			const response = await api.get( `/user/segments`, {});
			response.data.segments.map((item) => (item.type = 'segment'));
			setSegments(response.data.segments);
		} catch (e) {
			httpErrorHandler(e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getTags = useCallback(async () => {
		try {
			const response = await api.get( `/user/tags`, {});
			response.data.tags.map((item) => (item.type = 'tag'));
			setTags(response.data.tags);
		} catch (e) {
			httpErrorHandler(e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onOptionHandler = (e) => {
		setCollectionId(e.target.value);
	};

	const handleChange = (panel) => (e, isExpanded) => {
		if (loading || input) return;
		setExpanded(panel);
	};

	const onNameSubmit = async (_, formData) => {
		try {
			const response = await api.patch(`/user/campaigns/${newId}`, formData);
			const { success, message } = response.data;
			if (success) {
				setInput(false);
				setName(formData.name);
				return message;
			} else {
				throw new Error(message);
			}
		} catch (error) {
			httpErrorHandler(error);
			throw error;
		}
	};

	const submitOption = async () => {
		setLoading(true);
		const collectionObject = [...segments, ...tags].find(
			(col) => col._id === collectionId
		);

		if (!collectionObject) return console.error('Tag or segment not selected');

		try {
			const response = await api.patch( `/user/campaigns/${newId}`, {
				id: newId,
				to: {
					type: collectionObject.type,
					id: collectionObject._id,
					name: collectionObject.name,
				},
			});
			if (response.data.success) {
				showSuccess(response.data.message);
			} else {
				showError(response.data.message);
			}
			setLoading(false);
			setExpanded(false);
		} catch (e) {
			httpErrorHandler(e);
		} finally {
			setLoading(false);
		}
	};

	const onFromSubmit = async (_, formData) => {
		try {
			const response = await api.patch(`/user/campaigns/${newId}`, { from: formData, id: newId });
			const { success, message } = response.data;
			if (success) {
				setExpanded(false);
				return message;
			} else {
				throw new Error(message);
			}
		} catch (error) {
			httpErrorHandler(error);
			throw error;
		}
	};

	const onSubjectSubmit = async (_, formData) => {
		try {
			const response = await api.patch(`/user/campaigns/${newId}`, { ...formData, id: newId });
			const { success, message } = response.data;
			if (success) {
				setExpanded(false);
				return message;
			} else {
				throw new Error(message);
			}
		} catch (error) {
			httpErrorHandler(error);
			throw error;
		}
	};

	const selectTemplate = async (templateId) => {
		setContentLoading(templateId);
		try {
			await api.patch( `/user/campaigns/select-template/${newId}`, {
				templateId,
			});
			navigate(`/email-builder/${newId}`);
		} catch (e) {
			httpErrorHandler(e);
		} finally {
			setContentLoading(false);
		}
	};

	const send = async () => {
		setSending(true);
		const response = await api.patch(
			 `/user/campaigns/send/${newId}`,
			{ id: newId },
			{}
		);
		if (response.data.success) {
			setSending(false);
			navigate('/campaigns/all');
		} else {
			if (response.data.success) showSuccess(response.data.message);
			else showError(response.data.message);
			setSending(false);
		}
	};

	const isOngoing = useMemo(() => status === 'ongoing', [status]);

	useEffect(() => {
		setName(campaignName);
	}, [campaignName]);

	useEffect(() => {
		Promise.allSettled([
			getTags(),
			getSegments(),
			getCampaignsData(),
			getOwnedTemplates(),
		]).catch(console.log);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sx = {
		tabsRoot: {
			flexGrow: 1,
		},
		divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
		accordionSummery: {
			'& .MuiAccordionSummary-content': {
				flexDirection: 'column',
			},
		},
		select01: {
			width: '50%',

			margin: (0, 2, 0, 0),
			'& .MuiOutlinedInput-input': {
				padding: 1.3,
				fontSize: '14px',
			},
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
	};

	return (
		<Box sx={{ mb: 5, width: '100%', cursor: 'default' }}>
			<Grid container spacing={1}>
				<Grid item>
					<ActionIcon
						title='back'
						sx={{ fontSize: '12px' }}
						icon={<ArrowBackIosNewIcon />}
						onClick={() => navigate('/campaigns/all')}
					/>
				</Grid>
				<Grid item xs>
					<Typography variant='h5' gutterBottom>
						Campaigns
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						Manage your campaigns from here.
					</Typography>
				</Grid>
				<Grid item md xs={12} align='right'></Grid>
			</Grid>
			<Divider light sx={sx.divider} />
			<Container style={{ py: 5 }} maxWidth='md'>
				<Box sx={{ my: 5 }}>
					{!input ? (
						<>
							<Typography variant='h4'>{name}</Typography>
							<Button
								color='primary'
								size='small'
								onClick={() => expanded || setInput(true)}
							>
								Edit Name
							</Button>
						</>
					) : null}
					{input ? (
						<div>
							<Form
								onSubmit={onNameSubmit}
								handlers={handlers}
								onError={httpErrorHandler}
							>
								<Grid container>
									<Grid item xs={12}>
										<Input
											variant='outlined'
											style={{ width: '50%' }}
											placeholder='Name of the campaigns'
											name='name'
										/>
									</Grid>
									<Grid item xs={12} style={{ marginTop: '8px' }}>
										<Submit>
											{(loader) => (
												<>
													<Button
														type='submit'
														variant='contained'
														disabled={Boolean(loader)}
														color='primary'
													>
														save
														{loader}
													</Button>
													<Button
														color='secondary'
														display='inline'
														style={{ marginLeft: '16px' }}
														onClick={() => setInput(false)}
													>
														Close
													</Button>
												</>
											)}
										</Submit>
									</Grid>
								</Grid>
							</Form>
						</div>
					) : null}
				</Box>
				<Card
					sx={{
						padding: '24px',
						border: '1px solid rgba(255, 255, 255, 0.2)',
					}}
				>
					<Accordion
						elevation={0}
						expanded={expanded === 'panel1'}
						onChange={handleChange('panel1')}
					>
						<AccordionSummary>
							<Grid container alignItems='center'>
								<Grid item xs>
									<Typography
										variant='h5'
										gutterBottom
										style={{ display: 'block' }}
									>
										To
									</Typography>

									{expanded === 'panel1' ? (
										<>
											<Typography variant='subtitle1'>
												Any <b>SEGMENTS</b> or <b>TAGS</b> in the campaign.
												Choose from here
											</Typography>
										</>
									) : (
										<Typography
											variant='subtitle1'
											style={{ display: 'block' }}
										>
											Who are you sending this campaign to?
										</Typography>
									)}
								</Grid>
								<Grid item>
									<Button
										variant='contained'
										color='primary'
										size='small'
										onClick={() => handleChange('panel1')}
									>
										Edit Recipients
									</Button>
								</Grid>
							</Grid>
						</AccordionSummary>
						<AccordionDetails>
							<Grid container>
								<Grid item xs>
									<Typography variant='body1'>Segment or tags</Typography>
									<FormControl
										style={{ width: '100%', margin: '8px 0 16px 0' }}
									>
										<Select
											variant='outlined'
											sx={sx.select01}
											open={selectOption}
											onClose={() => setSelectOption(false)}
											onOpen={() => setSelectOption(true)}
											value={collectionId}
											disabled={isOngoing || loading}
											onChange={onOptionHandler}
										>
											<MenuItem value='default' style={{ fontSize: '12px' }}>
												Please select one
											</MenuItem>
											<MenuItem disabled style={{ fontSize: '12px' }}>
												Segments
											</MenuItem>
											{segments.map((segment) => (
												<MenuItem value={segment._id} key={segment._id}>
													{segment.name}
												</MenuItem>
											))}
											<MenuItem disabled style={{ fontSize: '12px' }}>
												Tags
											</MenuItem>
											{tags.map((tag) => (
												<MenuItem value={tag._id} key={tag._id}>
													{tag.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant='contained'
										color='primary'
										disabled={isOngoing || loading}
										onClick={submitOption}
									>
										save
										{loading ? (
											<CircularProgress
												size='20px'
												style={{ marginLeft: '8px' }}
											/>
										) : null}
									</Button>
									<Button
										color='secondary'
										display='inline'
										style={{ marginLeft: '16px' }}
										disabled={loading}
										onClick={() => setExpanded(false)}
									>
										Close
									</Button>
								</Grid>
							</Grid>
						</AccordionDetails>
					</Accordion>

					<Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

					<Accordion
						elevation={0}
						expanded={expanded === 'panel2'}
						onChange={handleChange('panel2')}
					>
						<AccordionSummary>
							<Grid container alignItems='center'>
								<Grid item xs>
									<Typography
										variant='h5'
										gutterBottom
										style={{ display: 'block' }}
									>
										From
									</Typography>
									<Typography variant='subtitle1' style={{ display: 'block' }}>
										Who is sending this campaign?
									</Typography>
								</Grid>
								<Grid item>
									<Button
										variant='contained'
										color='primary'
										size='small'
										onClick={() => handleChange('panel2')}
									>
										Add From
									</Button>
								</Grid>
							</Grid>
						</AccordionSummary>
						<AccordionDetails>
							<Form
								onSubmit={onFromSubmit}
								handlers={fromHandlers}
								retainOnSubmit
								onError={httpErrorHandler}
							>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<Typography variant='body1' gutterBottom>
											Name
										</Typography>
										<Input
											name='name'
											variant='outlined'
											style={{ width: '100%' }}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Typography variant='body1' gutterBottom>
											Email Address
										</Typography>
										<Input
											name='email'
											variant='outlined'
											style={{ width: '100%' }}
										/>
									</Grid>
									<Grid item xs={12} style={{ paddingTop: 0 }}>
										<Typography variant='subtitle2'>
											Use something subscribers will instantly recognize, like
											your company name.
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Submit>
											{(loader) => (
												<Button
													type='submit'
													color='primary'
													variant='contained'
													disabled={Boolean(loader)}
												>
													save
													{loader}
												</Button>
											)}
										</Submit>
										<Button
											display='inline'
											color='secondary'
											style={{ marginLeft: '16px' }}
											onClick={() => setExpanded(false)}
										>
											Close
										</Button>
									</Grid>
								</Grid>
							</Form>
						</AccordionDetails>
					</Accordion>

					<Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

					<Accordion
						elevation={0}
						expanded={expanded === 'panel3'}
						onChange={handleChange('panel3')}
					>
						<AccordionSummary>
							<Grid container alignItems='center'>
								<Grid item xs>
									<Typography
										variant='h5'
										gutterBottom
										style={{ display: 'block' }}
									>
										Subject
									</Typography>
									<Typography variant='subtitle2' style={{ display: 'block' }}>
										What's the subject line for this campaign?
									</Typography>
								</Grid>
								<Grid item>
									<Button
										variant='contained'
										color='primary'
										size='small'
										onClick={() => handleChange('panel2')}
									>
										Add Subject
									</Button>
								</Grid>
							</Grid>
						</AccordionSummary>
						<AccordionDetails>
							<Form
								onSubmit={onSubjectSubmit}
								retainOnSubmit
								onError={httpErrorHandler}
								handlers={subjectHandlers}
							>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<Typography variant='body1' gutterBottom>
											Subject
										</Typography>
										<Input
											variant='outlined'
											style={{ width: '100%' }}
											name='subject'
										/>
										<Typography variant='subtitle2'>
											See how your recent subject lines performed. View our
											subject line guide
										</Typography>
									</Grid>
									<Grid item xs={12} md={6}>
										<Typography variant='body1' gutterBottom>
											Preview Text
										</Typography>
										<Input
											variant='outlined'
											style={{ width: '100%' }}
											name='previewText'
										/>
										<Typography variant='subtitle2'>
											Preview text appears in the inbox after the subject line.
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<Submit>
											{(loader) => (
												<Button
													variant='contained'
													color='primary'
													disabled={Boolean(loader)}
													type='submit'
												>
													save
													{loader}
												</Button>
											)}
										</Submit>
										<Button
											color='secondary'
											display='inline'
											style={{ marginLeft: '16px' }}
											onClick={() => setExpanded(false)}
										>
											Close
										</Button>
									</Grid>
								</Grid>
							</Form>
						</AccordionDetails>
					</Accordion>

					<Divider
						light
						style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
					/>

					<Grid container spacing={2} sx={{ padding: '16px', mb: 1 }}>
						<Grid item xs>
							<Typography
								variant='h5'
								gutterBottom
								style={{ display: 'block' }}
							>
								Content
							</Typography>
							<Typography variant='subtitle2' style={{ display: 'block' }}>
								Design the content for your email.
							</Typography>
						</Grid>
						<Grid item>
							<Button
								size='small'
								color='primary'
								variant='contained'
								onClick={() => setModalOpen(true)}
							>
								Design Email
							</Button>
						</Grid>
						<Grid item xs={12} align='center'>
							<Box
								component='img'
								src='/images/template01.svg'
								style={{ width: '350px', marginTop: '40px' }}
							/>
						</Grid>
						<Grid item>
							<Button
								color='primary'
								variant='outlined'
								disabled={isOngoing}
								onClick={() => navigate('/campaigns/all')}
							>
								Save as draft
							</Button>
						</Grid>
						<Grid item>
							<Button
								onClick={send}
								color='primary'
								variant='contained'
								disabled={sending || isOngoing}
							>
								Send Campaign
								{sending ? (
									<CircularProgress
										size='20px'
										style={{ marginLeft: '8px', color: 'primary' }}
									/>
								) : null}
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Container>

			<Modal
				keepMounted
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<Container maxWidth='lg' style={{ height: '90vh', overflowY: 'auto' }}>
					<Card elevation={5}>
						<div sx={sx.root}>
							<AppBar
								position='static'
								elevation={0}
								sx={{
									padding: '0 8px',
									marginTop: '8px',
									background: 'inherit',
								}}
							>
								<Tabs value={value} onChange={tabHandleChange}>
									<Tab label='Saved templates' />
								</Tabs>
							</AppBar>

							<TabPanel value={value} index={0}>
								<Grid container spacing={2} alignItems='center'>
									<Grid item xs={12} sm={6}>
										<Box sx={sx.search}>
											<IconButton sx={sx.searchIcon}>
												<SearchIcon />
											</IconButton>
											<InputBase
												placeholder='You can also search by all audiences.'
												onChange={(e) => setSearch(e.target.value)}
												sx={{
													width: '100%',
													input: sx.inputInput,
												}}
											/>
										</Box>
									</Grid>
									<Grid item>
										<Button
											size='small'
											component={Link}
											variant='contained'
											sx={{ my: 1, py: 1 }}
											startIcon={<AddCircle />}
											to='/campaigns/templates/create'
										>
											Create Template
											{loading ? (
												<CircularProgress
													size='20px'
													style={{ marginLeft: '8px', color: 'white' }}
												/>
											) : null}
										</Button>
									</Grid>
								</Grid>
								<Typography
									variant='subtitle3'
									style={{ marginTop: '8px', display: 'block' }}
								>
									You can also search all templates.
								</Typography>
								<ConditionalLoading
									condition={templates}
									style={{ margin: '15% 50% 0 50%' }}
								>
									<Grid
										container
										spacing={2}
										style={{
											marginTop: '16px',
											padding: '0',
											marginBottom: '8px',
										}}
									>
										{templates
											? templates.map((template) => (
												<Grid item xs={12} sm={6} md={3} key={template._id}>
													<Card
														style={{
															borderRadius: '8px',
														}}
													>
														<div className='w-full h-[130px] overflow-hidden'>
															<iframe
																title='Template'
																srcDoc={
																	template.templateHtml
																		? template.templateHtml
																		: null
																}
															/>
														</div>
														<CardContent style={{ padding: '16px' }}>
															<Typography variant='subtitle1'>
																{template.name}
															</Typography>
															<Typography variant='subtitle3'>
																This is the caption of the card you can use it
																to describe the contents
															</Typography>
														</CardContent>
														<CardActions
															style={{
																paddingRight: '16px',
																paddingLeft: '16px',
																paddingBottom: '16px',
															}}
														>
															<Button
																variant='contained'
																color='primary'
																size='small'
																sx={{
																	ml: 'auto',
																}}
																onClick={() => selectTemplate(template._id)}
																disabled={contentLoading === template._id}
															>
																Select
																{contentLoading === template._id ? (
																	<CircularProgress
																		size={20}
																		sx={{ marginLeft: '8px', color: 'white' }}
																	/>
																) : null}
															</Button>
															<IconButton
																color='primary'
																sx={{ p: 0, ml: 1 }}
																LinkComponent={Link}
																to={`/campaigns/templates/create/${template._id}`}
															>
																<EditIcon />
															</IconButton>
														</CardActions>
													</Card>
												</Grid>
											))
											: null}
									</Grid>
								</ConditionalLoading>
							</TabPanel>
						</div>
					</Card>
				</Container>
			</Modal>
		</Box>
	);
}
