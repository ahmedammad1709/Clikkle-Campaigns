import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	InputAdornment,
} from "@mui/material";
import React, { useMemo, useReducer, useRef, useState } from "react";
import Typography from "../../../components/Typography";
import ColorPicker from "../../../components/inputs/ColorPicker";
import useHttpErrorHandler from "../../../utilities/httpErrorHandler";

import signUpFields from "../../../data/signUpFields";
import { Form, Submit, useForm } from "./../../../hooks/useForm";
import { Input } from "./../../../hooks/useForm/inputs";

import { useNavigate } from "react-router-dom";
import api from "../../../utilities/axios";

const allInputsReducer = (inputs, action) => {
	switch (action.action) {
		case "toggle":
			return inputs.map(input => {
				if (action.name === input.name) return { ...input, isVisible: !input.isVisible };
				else return input;
			});

		default:
			return inputs;
	}
};

const stylesReducer = (styles, func) => {
	let newObj = JSON.parse(JSON.stringify(styles));
	func(newObj);

	return newObj;
};

const sx = {
	root: {
		cursor: "default",
	},
	titleGrid: {},
	divider: {
		marginTop: 2,
		marginBottom: 3.15,
	},
	spacingText: {
		padding: (1, 0),
	},
	spacingText2: {
		padding: (0, 5),
	},
	numText: {
		mr: 1.5,
		"& .MuiInputBase-input": {
			textAlign: "right",
		},
		// "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
		//     marginLeft: "5px",
		// },
		"& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
		{
			"-webkit-appearance": "none",
			"-moz-appearance": "none",
			appearance: "none",
			margin: 0,
		},
	},
	sortBy: {
		outlined: "inherit",
		"& .MuiSelect-outlined.MuiSelect-outlined": {
			padding: (1.4, 4.5, 1.4, 1),
		},
		"& .MuiSelect-select.MuiSelect-select": {
			padding: (1.4, 4.5, 1.4, 1),
		},
	},

	formContainer: {
		height: "70vh",
		padding: "24px 48px",
		overflow: "auto",
	},
};

export default function SignUpForm() {
	const formContainer = useRef(null);
	const navigate = useNavigate();
	const [title, setTitle] = useState("Subscribe to Newsletter");
	const httpErrorHandler = useHttpErrorHandler();

	const defaultStyles = useMemo(
		() => ({
			root: {
				boxSizing: "border-box",
				// backgroundColor: "#FFFFFF",
				width: "calc(60%)",
				marginLeft: "auto",
				marginRight: "auto",
				color: "#000",
				padding: "5px 32px",
			},
			title: {
				fontSize: "36px",
				color: "#000000",
			},
			label: {
				display: "block",
				fontSize: "15px",
			},
			inputs: {
				display: "block",
				width: "100%",
				height: "calc(1.5em + .75rem + 2px)",
				padding: ".375rem .75rem",
				fontSize: "1rem",
				fontWeight: "400",
				lineHeight: "1.5",
				color: "#495057",
				// backgroundColor: "#fff",
				backgroundClip: "padding-box",
				border: "1px solid #ced4da",
				borderRadius: ".25rem",
				transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
				paddingTop: "4px",
				paddingBottom: "4px",
			},
			inputWrapper: {
				marginTop: "8px",
				marginBottom: "8px",
			},
			button: {
				display: "inline-block",
				fontWeight: "400",
				textAlign: "center",
				verticalAlign: "middle",
				WebkitUserSelect: "none",
				MozUserSelect: "none",
				MsUserSelect: "none",
				userSelect: "none",
				border: "none",
				padding: ".375rem .75rem",
				fontSize: "1rem",
				lineHeight: "1.5",
				borderRadius: ".25rem",
				transition:
					"color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
				// color: "#ffffff",
				backgroundColor: "#0069d9",
				borderColor: "#0062cc",
				marginTop: "10px",
				marginBottom: "10px",
			},
		}),
		[]
	);
	const [styles, setStyles] = useReducer(stylesReducer, defaultStyles);

	const [inputs, changeInputs] = useReducer(allInputsReducer, signUpFields);

	const createInputs = useMemo(() => {
		return inputs.map(({ label, name, type = "text", isVisible }) => {
			if (isVisible)
				return (
					<div style={styles.inputWrapper} key={name}>
						<label style={styles.label}>{label}</label>
						<input type={type} style={styles.inputs} name={name} />
					</div>
				);
			else return null;
		});
	}, [inputs, styles]);

	const editor = useMemo(
		() => (
			<>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'>
						<Typography sx={sx.heading}>Fields</Typography>
					</AccordionSummary>
					<AccordionDetails
						sx={{
							display: "flex",
							flexDirection: "column",
						}}>
						{inputs.map(input => (
							<FormControlLabel
								key={input.name}
								control={<Checkbox color='primary' defaultChecked />}
								label={<Typography>{input.label}</Typography>}
								labelPlacement='end'
								onChange={() =>
									changeInputs({ name: input.name, action: "toggle" })
								}
							/>
						))}
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'>
						<Typography sx={sx.heading}>Design</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid
							container
							alignItems='center'
							style={{ marginLeft: "16px", marginRight: "16px" }}>
							<Grid item xs={12}>
								<Typography variant='body2' color='text.secondary'>
									Global
								</Typography>
							</Grid>
							<Grid item xs={8} sx={{ my: 2, ml: 1 }}>
								<Typography sx={{ pl: 1 }}>Background</Typography>
							</Grid>
							<Grid item xs align='right' sx={{ mr: 1.5 }}>
								<ColorPicker
									defaultValue={defaultStyles.root.backgroundColor}
									onInput={e =>
										setStyles(prev => {
											prev.root.backgroundColor = e.target.value;
										})
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography variant='body2' color='textSecondary'>
									Text Field
								</Typography>
							</Grid>
							<Grid item xs={8} sx={{ my: 2, ml: 1 }}>
								<Typography sx={{ pl: 1 }}>Margin</Typography>
							</Grid>
							<Grid item xs>
								<Input
									type='number'
									variant='outlined'
									defaultValue={parseInt(defaultStyles.inputWrapper.marginBottom)}
									onInput={e =>
										setStyles(prev => {
											prev.inputWrapper.marginBottom = `${e.target.value}px`;
											prev.inputWrapper.marginTop = `${e.target.value}px`;
										})
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end' sx={{ m: 0, p: 0 }}>
												px
											</InputAdornment>
										),
									}}
									sx={sx.numText}
								/>
							</Grid>
							<Grid item xs={8} sx={{ my: 2, ml: 1 }}>
								<Typography sx={{ pl: 1 }}>Padding</Typography>
							</Grid>
							<Grid item xs>
								<Input
									type='number'
									variant='outlined'
									defaultValue={parseInt(defaultStyles.inputs.paddingTop)}
									onInput={e =>
										setStyles(prev => {
											prev.inputs.paddingTop = `${e.target.value}px`;
											prev.inputs.paddingBottom = `${e.target.value}px`;
										})
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end' sx={{ m: 0 }}>
												px
											</InputAdornment>
										),
									}}
									sx={sx.numText}
								/>
							</Grid>
							<Grid item xs={8} sx={{ my: 2, ml: 1 }}>
								<Typography sx={{ pl: 1 }}>Font Size</Typography>
							</Grid>
							<Grid item xs>
								<Input
									type='number'
									variant='outlined'
									defaultValue={parseInt(defaultStyles.label.fontSize)}
									onChange={e =>
										setStyles(prev => {
											prev.label.fontSize = `${e.target.value}px`;
										})
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end' sx={{ m: 0 }}>
												px
											</InputAdornment>
										),
									}}
									sx={sx.numText}
								/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'>
						<Typography sx={sx.heading}>Title</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid
							container
							alignItems='center'
							style={{ marginLeft: "16px", marginRight: "16px" }}>
							<Grid item xs sx={{ my: 2 }}>
								Text
							</Grid>
							<Grid item xs={9} align='right' sx={{ mr: 1.5 }}>
								<Input
									variant='outlined'
									title='Text'
									// fullWidth
									defaultValue={title}
									onInput={e => setTitle(e.target.value)}
									style={{ marginTop: 0 }}
								/>
							</Grid>
							<Grid item xs={8} sx={{ my: 2 }}>
								<Typography>Size</Typography>
							</Grid>
							<Grid item xs align='center'>
								<Input
									type='number'
									variant='outlined'
									defaultValue={parseInt(defaultStyles.title.fontSize)}
									onInput={e =>
										setStyles(prev => {
											prev.title.fontSize = `${e.target.value}px`;
										})
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end' sx={{ m: 0, p: 0 }}>
												px
											</InputAdornment>
										),
									}}
									sx={sx.numText}
								/>
							</Grid>
							<Grid item xs={9} sx={{ my: 2 }}>
								<Typography variant='subtitle1'>Color</Typography>
							</Grid>
							<Grid item xs align='right' sx={{ mr: 1.5 }}>
								<ColorPicker
									defaultValue={defaultStyles.title.color}
									onInput={e =>
										setStyles(prev => {
											prev.title.color = e.target.value;
										})
									}
								/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'>
						<Typography sx={sx.heading}>Button</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid
							container
							alignItems='center'
							style={{ marginLeft: "16px", marginRight: "16px" }}>
							<Grid item sx={{ my: 2 }}>
								<Typography sx={{ pl: 1 }}>Size</Typography>
							</Grid>
							<Grid item xs align='right'>
								<Input
									type='number'
									variant='outlined'
									defaultValue={parseInt(defaultStyles.button.fontSize)}
									onInput={e =>
										setStyles(prev => {
											prev.button.fontSize = `${e.target.value}px`;
										})
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>px</InputAdornment>
										),
									}}
									sx={sx.numText}
								/>
							</Grid>
							<Grid item xs={9} sx={{ my: 2 }}>
								<Typography variant='subtitle1' sx={{ pl: 1 }}>
									Background
								</Typography>
							</Grid>
							<Grid item xs align='right' sx={{ mr: 1.5 }}>
								<ColorPicker
									defaultValue={defaultStyles.button.backgroundColor}
									onInput={e =>
										setStyles(prev => {
											prev.button.backgroundColor = e.target.value;
										})
									}
								/>
							</Grid>
							<Grid item xs={9} sx={{ my: 2 }}>
								<Typography variant='subtitle1' sx={{ pl: 1 }}>
									Color
								</Typography>
							</Grid>
							<Grid item xs align='right' sx={{ mr: 1.5 }}>
								<ColorPicker
									defaultValue={defaultStyles.button.color}
									onInput={e =>
										setStyles(prev => {
											prev.button.color = e.target.value;
										})
									}
								/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
			</>
		),
		[inputs, defaultStyles, title]
	);

	const handlers = useForm(
		useMemo(
			() => ({
				name: {
					required: true,
					validator: [
						value =>
							value.toLowerCase() === value ? "" : "Characters must be in Lowercase",
					],
				},
			}),
			[]
		)
	);

	const onSubmit = async (formData) => {
		try {
			const response = await api.post('/user/signupforms', formData);
			const { success, message } = response.data;
			if (success) {
				navigate("/contacts/signup-forms");
				return message;
			} else {
				throw new Error(message);
			}
		} catch (error) {
			httpErrorHandler(error);
			throw error;
		}
	};

	return (
		<Box sx={sx.root}>
			<Grid container spacing={3} sx={sx.titleGrid}>
				<Grid item xs>
					<Typography variant='h5' gutterBottom>
						Create Form
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						Create your form for your site.
					</Typography>
				</Grid>
				<Grid item xs align='right'></Grid>
			</Grid>
			<Divider light sx={sx.divider} />
			<Grid container spacing={2}>
				<Grid item xs={9}>
					<Card sx={sx.formContainer} ref={formContainer}>
						<div style={styles.root}>
							<h3 style={styles.title}>{title}</h3>
							<form>{createInputs}</form>
							<button style={styles.button}>Submit</button>
						</div>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Form
						onSubmit={onSubmit}
						handlers={handlers}
						onError={httpErrorHandler}
						final={values => ({
							...values,
							content: formContainer.current?.innerHTML,
						})}>
						<Input
							variant='outlined'
							label='Name'
							fullWidth
							name='name'
							style={{ marginBottom: "8px" }}
						/>
						<Card sx={{ my: 1 }}>{editor}</Card>
						<Submit>
							{loader => (
								<Button
									type='submit'
									variant='contained'
									fullWidth
									color='primary'
									disabled={Boolean(loader)}
									style={{ marginTop: "8px" }}>
									Save
									{loader}
								</Button>
							)}
						</Submit>
					</Form>
				</Grid>
			</Grid>
		</Box>
	);
}
