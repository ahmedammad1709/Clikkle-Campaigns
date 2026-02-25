import {
	Box,
	Button,
	Container,
	Divider,
	TextField,
	FormControl,
	MenuItem,
	Modal,
	Select,
	CircularProgress,
	Card,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import React, { useContext, useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "../../../components/Typography";
import Segments from "../../../services/Segments";

import { functions } from "./Segments";
import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import { useMessage } from "../../../components/Header";
import api from "../../../utilities/axios";

const InputField = styled(TextField)(({ theme }) => ({
	width: "200px",
	margin: theme.spacing(0, 2, 0, 0),
	"& .MuiOutlinedInput-input": {
		padding: theme.spacing(1.3),
	},
}));

export default function CreateSegment(props) {
	const defaultOption = Segments[0];
	const defaultSubOption = Segments[0].options[0];

	const sx = {
		root: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh",
		},
		divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
		select: {
			width: "120px",
			margin: (0, 1),
			"& .MuiOutlinedInput-input": {
				padding: 1.3,
			},
		},
		select01: {
			width: "230px",
			margin: (0, 2, 0, 0),
			"& .MuiOutlinedInput-input": {
				padding: 1.3,
				fontSize: "14px",
			},
		},
	};

	const [segmentName, setSegmentName] = useState("");
	const [loading, setLoading] = useState(false);
	const { getSegments } = useContext(functions);
	const { showError, showSuccess } = useMessage()

	const [conditionMatch, setConditionMatch] = useState("AND");
	const [selectCM, setSelectCM] = useState(false);

	const [selectOption, setSelectOption] = useState([false]);
	const [selectSubOption, setSelectSubOption] = useState([false]);

	const inputs = useRef(null);

	const [options, setOptions] = useState([defaultOption]);
	const [subOptions, setSubOptions] = useState([defaultSubOption]);
	const httpErrorHandler = useHttpErrorHandler();

	const openCMSelect = () => {
		setSelectCM(true);
	};

	const closeCMSelect = () => {
		setSelectCM(false);
	};

	const onSelectHandler = e => {
		setConditionMatch(e.target.value);
	};

	const openOption = i => {
		const updated = [...selectOption];
		updated[i] = true;
		setSelectOption(updated);
	};

	const closeOption = i => {
		const updated = [...selectOption];
		updated[i] = false;
		setSelectOption(updated);
	};

	const onOptionHandler = (e, i) => {
		const updatedOptions = [...options];
		updatedOptions[i] = e.target.value;
		setOptions(updatedOptions);

		const updatedSubOption = [...subOptions];
		updatedSubOption[i] = e.target.value.options[0];
		setSubOptions(updatedSubOption);
	};

	const openSubOption = i => {
		const updated = [...selectSubOption];
		updated[i] = true;
		setSelectSubOption(updated);
	};

	const closeSubOption = i => {
		const updated = [...selectSubOption];
		updated[i] = false;
		setSelectSubOption(updated);
	};

	const onSubOptionHandler = (e, i) => {
		const updatedSubOptions = [...subOptions];
		updatedSubOptions[i] = e.target.value;
		setSubOptions(updatedSubOptions);
	};

	const addMoreConditions = () => {
		setOptions([...options, defaultOption]);
		setSubOptions([...subOptions, defaultOption]);
	};

	async function previewSegment() {
		setLoading(true);

		const allInputs = inputs.current.querySelectorAll(".sub-sub-option input");

		const filters = options.map((option, i) => {
			const { name } = option;
			const value = allInputs[i] && allInputs[i].value;

			return subOptions[i].getFilters(name, value);
		});

		const url = `/user/segments`;
		try {
			const response = await api.post(
				url,
				{ name: segmentName, filters, type: conditionMatch },
				{}
			);
			if (response.data.success) {
				showSuccess(response.data.message)
			} else {
				showError(response.data.message);
			}
		} catch (e) {
			httpErrorHandler(e);
		} finally {
			getSegments();
			setLoading(false);
			setSegmentName("");
			modalClose();
		}
	}

	const { modalOpen, modalClose } = props;
	return (
		<Modal open={modalOpen} sx={sx.root} elevation={4}>
			<Container maxWidth="md" style={{ padding: 0 }}>
				<Card>
					<Typography variant="h6" style={{ padding: "15px 24px" }}>
						Create a segment
						<CancelIcon
							onClick={modalClose}
							style={{ float: "right", marginTop: "3px", cursor: "pointer" }}
						/>

					</Typography>
					<Box style={{ padding: "32px 24px" }}>
						<div>
							<Typography
								variant="body1"
								style={{
									display: "inline-block",
									marginRight: "16px",
									marginTop: "7px",
								}}>
								Name of the segment
							</Typography>
							<InputField
								sx={sx.select01}
								variant="outlined"
								disabled={loading}
								value={segmentName}
								onChange={e => setSegmentName(e.target.value)}
							/>
						</div>
						<Divider light sx={sx.divider} />
						<Typography
							variant="body1"
							component="span"
							style={{ display: "inline-block", marginTop: "8px" }}>
							Contacts match
						</Typography>
						<FormControl sx={sx.formControl}>
							<Select
								variant="outlined"
								sx={sx.select}
								open={selectCM}
								onClose={closeCMSelect}
								onOpen={openCMSelect}
								value={conditionMatch}
								onChange={onSelectHandler}
								disabled={loading}>
								<MenuItem value="AND">AND</MenuItem>
								<MenuItem value="OR">OR</MenuItem>
							</Select>
						</FormControl>
						<Typography
							variant="body1"
							component="span"
							style={{ display: "inline-block", marginTop: "8px" }}>
							of the following conditions:
						</Typography>
						<Divider light sx={sx.divider} />
						<Box ref={inputs}>
							{options.map((option, i) => (
								<Box
									style={{ marginTop: "16px" }}
									key={i}>
									<FormControl sx={{ mr: 1 }}>
										<Select
											variant="outlined"
											sx={sx.select01}
											open={selectOption[i]}
											onClose={() => closeOption(i)}
											onOpen={() => openOption(i)}
											value={option}
											disabled={loading}
											onChange={e => onOptionHandler(e, i)}>
											<MenuItem
												disabled
												value=""
												style={{ fontSize: "12px" }}>
												Personal details about your contacts
											</MenuItem>
											{Segments.map((option, i) => (
												<MenuItem value={option} key={i}>
													{option.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<FormControl sx={{ mr: 1 }}>
										<Select
											variant="outlined"
											sx={sx.select01}
											open={selectSubOption[i]}
											onClose={() => closeSubOption(i)}
											onOpen={() => openSubOption(i)}
											value={subOptions[i]}
											disabled={loading}
											onChange={e => onSubOptionHandler(e, i)}>
											{option.options.map((subOption, i) => (
												<MenuItem value={subOption} key={i}>
													{subOption.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<span className="sub-sub-option">
										{subOptions[i].field || (
											<input style={{ display: "none" }} />
										)}
									</span>
								</Box>
							))}
						</Box>

						<Button
							variant="contained"
							color="primary"
							style={{ marginTop: "16px", marginRight: "16px" }}
							onClick={addMoreConditions}>
							Add More
						</Button>

						<Button
							variant="contained"
							color="primary"
							style={{ marginTop: "16px" }}
							onClick={previewSegment}>
							Create Segment
							{loading ? (
								<CircularProgress
									size="20px"
									style={{ marginLeft: "8px", color: "white" }}
								/>
							) : null}
						</Button>
					</Box>
				</Card>
			</Container>
		</Modal>
	);
}
