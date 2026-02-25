import React, {
	Fragment,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Modal,
	Radio,
	RadioGroup,
	Select,
	Typography,
} from '@mui/material';
import importMethods from '../../services/importMethods';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import TableChart from '@mui/icons-material/TableChart';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import { usePapaParse } from 'react-papaparse';

import { Dialog } from './AllContacts/Dialog';
import useHttpErrorHandler from './../../utilities/httpErrorHandler';
import { useMessage } from '../../components/Header.jsx';
import useSnack from '../../hooks/useSnack.js';
import api from '../../utilities/axios.js';
//import GuidedTour from '../../components/guide/GuidedTour.jsx';

const Function = createContext();

const sx = {
	divider: {
		marginTop: 2,
		marginBottom: 3.15,
	},
	topHeading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		marginTop: 5,
		marginBottom: 15,
	},
	topCaption: {
		maxWidth: '600px',
		textAlign: 'center',
	},
	card: {
		padding: 2,
	},
	radio: {
		float: 'right',
		'& .MuiButtonBase-root': {
			padding: 0,
		},
	},
	continueBox: {
		marginTop: 3,
		marginBottom: 2,
	},
	button: {
		borderRadius: 0,
	},

	formControl: {
		width: '100%',
		mb: 1,
	},
	select01: {
		width: '100%',
		margin: (0, 2, 0, 0),
		'& .MuiOutlinedInput-input': {
			padding: 1.3,
			fontSize: '14px',
		},
	},
};

export default function ContactsImport() {
	// const steps = [
	// 	{
	// 		selector: '.add-manually',
	// 		content: () => (
	// 		  <div>
	// 			<h3>Welcome! Campaigns Dashboard </h3>
	// 			{/* {handleNavigation()} */}
	// 			<p> now   click on radio button option for add manually</p>
	// 		  </div>
	// 		),
	// 	  },
	//       {
	// 		selector: '.continue',
	// 		content: () => (
	// 		  <div>
	// 			<h3> last step to add contact </h3>
	// 			{/* {handleNavigation()} */}
	// 			<p> now   click on continue button  to add contact</p>
	// 		  </div>
	// 		),
	// 	  },
	//   ];
	const [value, setValue] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [addMS, setAddMS] = useState(false);
	// const [tourOpen,setTourOpen] = useState(false);
	const httpErrorHandler = useHttpErrorHandler();

	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const addHandleClose = () => setAddMS(false);
	const addHandleOpen = () => setAddMS(true);

	const Continue = () => {
		if (value === 'ADDMANUALLY') addHandleOpen();
		else openModal();
	};

	// useEffect(() => {
	//     setTourOpen(localStorage.getItem('tourOpen')==='true')
	// }, [ ]);

	return (
		<Function.Provider value={{ httpErrorHandler }}>
			<Box sx={{ width: '100%', cursor: 'default' }}>
				{/* {tourOpen && <GuidedTour steps={steps} open={tourOpen}/>} */}
				<Typography variant='h5' gutterBottom>
					Contacts Import
				</Typography>
				<Typography variant='body1' color='textSecondary'>
					Import your Contacts from here.
				</Typography>

				<Divider light sx={sx.divider} />
				<Box style={sx.topHeading}>
					<Typography
						variant='h4'
						style={{
							fontWeight: '300',
							textAlign: 'center',
						}}
						gutterBottom
					>
						How would you like to add contacts?
					</Typography>
					<Box sx={sx.topCaption}>
						<Typography variant='subtitle2' color='textSecondary'>
							You can add your contacts in the given ways below, grow your
							audience by using the options below and import your contacts from
							the method you prefer
						</Typography>
					</Box>
				</Box>

				<RadioGroup value={value} onChange={handleChange}>
					<Container maxWidth='lg'>
						<Grid container spacing={4}>
							{importMethods.map((item, i) => (
								<Grid item xs={12} key={i} className={item.className}>
									<Card variant='outlined' sx={sx.card}>
										<CardContent>
											{item.icon}
											<FormControlLabel
												value={item.value}
												control={<Radio />}
												sx={sx.radio}
											/>
											<Typography
												variant='h6'
												style={{ marginTop: '16px' }}
												gutterBottom
											>
												{item.method}
											</Typography>
											<Typography variant='body1' align='justify'>
												{item.text}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>

						<Box align='right' sx={sx.continueBox}>
							<Button
								variant='contained'
								color='secondary'
								onClick={Continue}
								className='continue'
								disabled={!value}
							>
								Continue
							</Button>
							<CsvModal modal={modalOpen} closeModal={closeModal} />
						</Box>
						<Dialog state={addMS} handleClose={addHandleClose} />
					</Container>
				</RadioGroup>
			</Box>
		</Function.Provider>
	);
}

// const jsonModal = props => {
//     <Modal
//         open={modal}
//         style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//         }}>
//         <Container maxWidth="sm">
//             <Card style={{ padding: "32px" }}>
//                 <Typography variant="h6" style={{ marginBottom: "16px" }}>
//                     Upload {value} files to attach
//                 </Typography>
//                 {file ? null : (
//                     <Box
//                         sx={sx.uploadArea}
//                         onDragOver={dragOver}
//                         onDrop={dropped}
//                         onDragLeave={dragLeave}>
//                         <Typography variant="body1" align="center" style={{ border: "none" }}>
//                             {uploadMsg}
//                         </Typography>
//                     </Box>
//                 )}
//                 <Typography variant="body1" style={{ margin: "16px 0 0 0" }}>
//                     Uploaded files
//                 </Typography>
//                 {file ? (
//                     <>
//                         <List style={{ textTransform: "capitalize" }}>
//                             <ListItem button>
//                                 <IconButton edge="start" disableRipple>
//                                     <TableChart />
//                                 </IconButton>
//                                 <ListItemText>{file.name}</ListItemText>
//                                 <IconButton edge="end" onClick={() => setFile(null)}>
//                                     <CloseIcon />
//                                 </IconButton>
//                             </ListItem>
//                         </List>
//                         <Divider light sx={sx.divider} />

//                         <Box style={{ padding: "0 16px" }}>
//                             <Typography variant="body1">18 Contacts Found</Typography>
//                             <Typography variant="body1">mapping</Typography>
//                             <Grid container alignItems="center">
//                                 <Grid item xs={6}>
//                                     <Typography variant="body1">First Name</Typography>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormControl sx={sx.formControl}>
//                                         <Select variant="outlined" sx={sx.select01}>
//                                             <MenuItem
//                                                 disabled
//                                                 value=""
//                                                 style={{ fontSize: "12px" }}>
//                                                 Tags
//                                             </MenuItem>
//                                             <MenuItem>Tags01</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Typography variant="body1">Email</Typography>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormControl sx={sx.formControl}>
//                                         <Select variant="outlined" sx={sx.select01}>
//                                             <MenuItem
//                                                 disabled
//                                                 value=""
//                                                 style={{ fontSize: "12px" }}>
//                                                 Tags
//                                             </MenuItem>
//                                             <MenuItem>Tags01</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Typography variant="body1">Tags</Typography>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormControl sx={sx.formControl}>
//                                         <Select variant="outlined" sx={sx.select01}>
//                                             <MenuItem
//                                                 disabled
//                                                 value=""
//                                                 style={{ fontSize: "12px" }}>
//                                                 Tags
//                                             </MenuItem>
//                                             <MenuItem>Tags01</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>
//                             <Box align="right" style={{ marginTop: "16px" }}>
//                                 <Button variant="text">Add more...</Button>
//                             </Box>
//                         </Box>
//                         <Divider light sx={sx.divider} />
//                     </>
//                 ) : (
//                     <Box style={{ padding: "24px", textAlign: "center" }}>
//                         <Box
//                             component="img"
//                             src="/images/uploadImage.svg"
//                             style={{ width: "150px", padding: "8px 0" }}
//                         />
//                         <Typography variant="subtitle3" component="Box">
//                             The files you'll upload <br />
//                             will appear here.
//                         </Typography>
//                     </Box>
//                 )}

//                 <Grid container spacing={2}>
//                     <Grid item xs>
//                         <Button
//                             sx={sx.button}
//                             variant="outlined"
//                             fullWidth
//                             color="primary"
//                             onClick={closeModal}>
//                             Cancel
//                         </Button>
//                     </Grid>
//                     <Grid item xs>
//                         <Button
//                             sx={sx.button}
//                             variant="contained"
//                             color="primary"
//                             onClick={analyze}
//                             fullWidth>
//                             Create Mapping
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Card>
//         </Container>
//     </Modal>;
// };

const CsvModal = (props) => {
	const { modal, closeModal } = props;
	const [addModal, setAddModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [uploadMsg, setUploadMsg] = useState({
		msg: 'Drag & drop files here or browse',
		dragging: false,
	});
	const { showMessage } = useSnack();
	const [file, setFile] = useState(null);
	const { httpErrorHandler } = useContext(Function);
	const { showSuccess, showError } = useMessage();
	const fileRef = useRef();
	const [csvFields, setCsvFields] = useState([]);
	const [tags, setTags] = useState([]);
	const [mapping, setMapping] = useState({});
	const [values, setValues] = useState({});
	const [extraFields, setExtraFields] = useState([
		{ name: 'companyName', label: 'Company Name', selected: true },
		{ name: 'email', label: 'Email', selected: true },
		{ name: 'address', label: 'Address' },
		{ name: 'city', label: 'City' },
		{ name: 'state', label: 'State' },
		{ name: 'zipCode', label: 'Zip Code' },
		{ name: 'phone', label: 'Phone' },
		{ name: 'faxNumber', label: 'Fax Number' },
		{ name: 'sicCode', label: 'SIC Code', selected: true },
		{ name: 'sicDescription', label: 'SIC Description', selected: true },
		{ name: 'webAddress', label: 'Web Address', selected: true },
		{ name: 'firstName', label: 'First Name' },
		{ name: 'subscribed', label: 'Subscribed', options: ['true', 'false'] },
		{ name: 'lastName', label: 'Last Name' },
		{ name: 'birthday', label: 'Birthday' },
		{ name: 'country', label: 'Country' },
	]);

	const paraParse = usePapaParse();
	const [toAdd, setToAdd] = useState(null);
	const fields = extraFields.filter((field) => field.selected);

	const onSelectHandler = (e, setter) => {
		let { name, value } = e.target;
		if (name === 'tags') {
			let tag = tags.filter((tag) => tag.name === value);
			value = tag[0]?._id;
		}
		setter((prev) => ({ ...prev, [name]: value }));
	};

	const openAddModal = () => {
		setAddModal(true);
	};

	const closeAddModal = () => {
		setAddModal(false);
	};

	const getTags = useCallback(async () => {
		try {
			const response = await api.get(`/user/tags`, {});
			const tags = response.data.data;
			setTags(tags);
			setExtraFields((prev) => [
				...prev,
				{
					name: 'tags',
					label: 'Tag',
					options: tags?.map((tag) => tag.name),
				},
			]);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [setTags, setExtraFields, httpErrorHandler]);

	const analyze = () => {
		const replaceRegex = /[_\-!@#$%^&*()+=/\\|[\]{};:'",.<>?`~]/g
		try {
			const url = URL.createObjectURL(file);
			paraParse.readRemoteFile(url, {
				complete: function () { },
				step: function (row, parser) {
					const _rowData = row.data.map((csvDataLabel) =>
						csvDataLabel.toLowerCase().replace(replaceRegex, ' ')
					);

					const _previousExtraFields = [...(extraFields || [])];
					const _mappings = {};

					_previousExtraFields.forEach((field) => {
						_rowData.forEach((csvLabel) => {
							if (csvLabel.includes(field.name) || field.name.includes(csvLabel)) {
								if (!_mappings[field.name]) {
									row.data.forEach((rawCsvLabel) => {
										const rawCsvData = rawCsvLabel.toLowerCase().replace(replaceRegex, ' ');
										if (rawCsvData === csvLabel) {
											_mappings[field.name] = rawCsvLabel;
											return
										}
									})
								}
							}
						});
					});

					setMapping(_mappings);
					setCsvFields(row.data);
					setExtraFields((prev) => {
						const mappingKeys = Object.keys(_mappings)
						return prev.map((field) => ({
							...field,
							selected: field.selected || mappingKeys.includes(field.name),
						}))
					});
					parser.abort();
				},
			});
		} catch (err) {
			console.log(err);
			showMessage('Error in parsing csv file');
		}
	};

	const dragOver = (e) => {
		e.preventDefault();
		setUploadMsg({ msg: 'Release to drop', dragging: true });
	};

	const dropped = (e) => {
		e.preventDefault();
		// console.log('dropped');
		if (e.dataTransfer.files[0]) {
			setFile(e.dataTransfer.files[0]);
		}
	};

	const fileHandler = async (e) => {
		e.stopPropagation();
		const files = e.target.files;
		if (!files.length) return showError('No file selected');

		setFile(files[0]);
	};

	const dragLeave = (e) => {
		e.preventDefault();
		setUploadMsg({ msg: 'Drag & drop files here or browse', dragging: false });
	};

	// const isValidated = () =>
	// 	extraFields
	// 		.filter((field) => field.selected && !field.options)
	// 		.every((field) => mapping[field.name]) &&
	// 	extraFields
	// 		.filter((field) => field.selected && field.options)
	// 		.every((field) => values[field.name]);

	const modalReset = (props = 'true') => {
		if (props) closeModal();
		setFile(null);
		setCsvFields([]);
		setUploadMsg('Drag & drop files here or browse');
		setExtraFields([
			{ name: 'firstName', label: 'First Name', selected: true },
			{ name: 'email', label: 'Email', selected: true },
			{
				name: 'subscribed',
				label: 'Subscribed',
				options: ['true', 'false'],
				selected: true,
			},
			{ name: 'tags', label: 'Tags', options: setTags([]) },
			{ name: 'lastName', label: 'Last Name' },
			{ name: 'address', label: 'Address' },
			{ name: 'phone', label: 'Phone' },
			{ name: 'birthday', label: 'Birthday' },
			{ name: 'state', label: 'State' },
			{ name: 'country', label: 'Country' },
		]);
	};

	const importFile = async () => {
		setLoading(true);
		const formData = new FormData();
		formData.set('csv_file', file);
		formData.set('mapping', JSON.stringify(mapping));
		formData.set('values', JSON.stringify(values));
		try {
			const response = await api.post( `/user/contacts/import-csv`, formData);

			if (response.data.success) {
				showSuccess(response.data.message);
				return;
			}
			showError(response.data.message);
		} catch (e) {
			httpErrorHandler(e);
		} finally {
			setLoading(false);
			modalReset();
		}
	};

	const addFields = () => {
		const fields = extraFields.filter((field) => field !== toAdd);

		toAdd.selected = true;
		toAdd.remove = true;
		setExtraFields([...fields, toAdd]);
		setToAdd(null);
		setAddModal(false);
	};

	const removeFields = (toRemove) => {
		const fields = extraFields.filter((field) => field !== toRemove);
		delete toRemove.remove;
		delete toRemove.selected;
		setExtraFields([...fields, toRemove]);
	};

	useEffect(() => {
		getTags();
	}, [getTags]);

	return (
		<Modal
			open={modal}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Container maxWidth='sm' style={{ outline: 'none' }}>
				<Card
					style={{ padding: '32px', maxHeight: '90vh', overflowY: 'scroll' }}
				>
					<Typography variant='h6' style={{ marginBottom: '16px' }}>
						Upload CSV files to attach
					</Typography>

					{file ? null : (
						<Box
							sx={{
								border: '2px',
								borderStyle: uploadMsg.dragging ? 'solid' : 'dashed',
								borderColor: 'divider',
								padding: '32px',
								backgroundColor: uploadMsg.dragging
									? 'custom.search.main'
									: 'inherit',
								cursor: 'pointer',
							}}
							onDragOver={dragOver}
							onDrop={dropped}
							onDragLeave={dragLeave}
							onClick={() => fileRef.current.click()}
						>
							<input
								type='file'
								ref={fileRef}
								style={{ display: 'none' }}
								onChange={fileHandler}
							/>
							<Typography
								variant='body1'
								align='center'
								style={{ border: 'none' }}
							>
								{uploadMsg.msg}
							</Typography>
						</Box>
					)}

					{file ? (
						<Typography variant='body1' style={{ margin: '16px 0 0 0' }}>
							Uploaded files
						</Typography>
					) : null}

					{!file ? (
						<Box
							sx={{
								padding: '24px',
								textAlign: 'center',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							<Box
								component='img'
								src='/images/uploadImage.svg'
								style={{ height: '120px', padding: '8px 0' }}
							/>
							<Typography variant='subtitle3' component='Box'>
								The files you upload will appear here.
							</Typography>
						</Box>
					) : (
						<>
							<List style={{ textTransform: 'capitalize' }}>
								<ListItem>
									<IconButton edge='start' disableRipple>
										<TableChart />
									</IconButton>
									<ListItemText>{file.name}</ListItemText>
									<IconButton edge='end' onClick={() => modalReset('')}>
										<CloseIcon />
									</IconButton>
								</ListItem>
							</List>

							{csvFields.length ? (
								<>
									<Divider light sx={sx.divider} />
									<Box style={{ padding: '0 16px' }}>
										<Typography variant='h5' gutterBottom>
											Create Mapping
										</Typography>

										<Grid container alignItems='center'>
											{fields.map((field, i) => (
												<Fragment key={field.name}>
													<Grid
														item
														xs={6}
														style={{
															display: 'flex',
															justifyContent: 'start',
															gap: '8px',
														}}
													>
														<Typography variant='body1'>
															{field.label}
														</Typography>
														<Box>
															{field.remove ? (
																<CancelIcon
																	style={{
																		fontSize: '18px',
																		marginTop: '4px',
																	}}
																	onClick={() => removeFields(field)}
																/>
															) : null}
														</Box>
													</Grid>

													<Grid item xs={6}>
														<FormControl sx={sx.formControl}>
															<Select
																variant='outlined'
																sx={sx.select01}
																name={field.name}
																value={
																	field.options
																		? values[field.name]
																		: mapping[field.name]
																}
																onChange={(e) =>
																	onSelectHandler(
																		e,
																		field.options ? setValues : setMapping
																	)
																}
															>
																<MenuItem
																	disabled
																	value=''
																	style={{ fontSize: '12px' }}
																>
																	CSV Fields
																</MenuItem>
																{(field.options
																	? field.options
																	: csvFields
																).map((option, i) => (
																	<MenuItem value={option} key={i}>
																		{option}
																	</MenuItem>
																))}
															</Select>
														</FormControl>
													</Grid>
												</Fragment>
											))}
										</Grid>
										<Box align='right' style={{ marginTop: '16px' }}>
											<Button
												variant='outlined'
												color='primary'
												onClick={openAddModal}
												disabled={extraFields.every((field) => field.selected)}
											>
												Add More...
											</Button>
										</Box>
									</Box>
									<Divider light sx={sx.divider} />
								</>
							) : null}

							<Modal
								open={addModal}
								onClose={closeAddModal}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Container maxWidth='sm'>
									<Card style={{ width: '100%', padding: '32px' }}>
										<Grid container alignItems='center' spacing={3}>
											<Grid item>
												<Typography variant='body1'>Add Fields</Typography>
											</Grid>
											<Grid item xs>
												<FormControl sx={sx.formControl}>
													<Select
														variant='outlined'
														sx={sx.select01}
														fullWidth
														style={{ marginTop: 0 }}
														value={toAdd}
														onChange={(e) => setToAdd(e.target.value)}
													>
														<MenuItem
															disabled
															value=''
															style={{ fontSize: '12px' }}
														>
															Add more fields
														</MenuItem>

														{extraFields.map((field, i) =>
															field.selected ? null : (
																<MenuItem value={field} key={i}>
																	{field.label}
																</MenuItem>
															)
														)}
													</Select>
												</FormControl>
											</Grid>
										</Grid>
										<Box style={{ paddingTop: '16px', float: 'right' }}>
											<Button
												variant='outlined'
												onClick={closeAddModal}
												disabled={loading}
											>
												Cancel
											</Button>
											<Button
												variant='contained'
												color='secondary'
												style={{ marginLeft: '16px' }}
												onClick={addFields}
												disabled={loading}
												startIcon={<AddCircle />}
											>
												Add Fields
												{loading ? (
													<CircularProgress
														size='20px'
														style={{
															marginLeft: '8px',
															color: 'white',
														}}
													/>
												) : null}
											</Button>
										</Box>
									</Card>
								</Container>
							</Modal>
						</>
					)}

					<Grid container spacing={2}>
						<Grid item xs>
							<Button
								variant='outlined'
								fullWidth
								color='primary'
								onClick={modalReset}
							>
								Cancel
							</Button>
						</Grid>

						<Grid item xs>
							{csvFields.length ? (
								<Button
									variant='contained'
									color='primary'
									onClick={importFile}
									// disabled={!isValidated()}
									fullWidth
								>
									Import File
									{loading ? (
										<CircularProgress
											size='20px'
											style={{ marginLeft: '8px', color: 'white' }}
										/>
									) : null}
								</Button>
							) : (
								<Button
									variant='contained'
									color='primary'
									onClick={analyze}
									disabled={!file}
									fullWidth
								>
									Create Mapping
								</Button>
							)}
						</Grid>
					</Grid>
				</Card>
			</Container>
		</Modal>
	);
};
