import { Button, Card, CircularProgress, Container, Divider, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "../../../components/Typography";
import { useContext, useState } from "react";
import { functions } from "./Segments";

import { Link } from "react-router-dom";
import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import { RemoveRedEye } from "@mui/icons-material";
import { useMessage } from "../../../components/Header";
import api from "../../../utilities/axios";

export default function Entries(props) {
	const sx = {
		root: {},
		titleGrid: {},
		divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
		rowDivider: {
			marginTop: 2,
			marginBottom: 2,
		},
		entries: {
			display: "flex",
			justifyContent: "space-between",
			flexDirection: "row",
			cursor: "default",
		},
		entriesText: {
			"& .MuiTypography-body1": {
				paddingLeft: 1,
			},
		},
		Button: {
			padding: "3px 14px",
			fontSize: "0.8rem",
			textTransform: "capitalize",
			borderRadius: "0px",
			marginLeft: 1,
			marginRight: 1,
		},
		viewButton: {
			padding: "5px 24px",
			borderRadius: "0px",

			"&:hover": {
				backgroundColor: "#4782da",
			},
		},
		toggleButton: {
			padding: "5px 0",
			borderRadius: "0px",
			minWidth: "30px",
		},
		timeLine: {
			fontSize: "0.7rem",
			paddingLeft: 1,
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
		inputRoot: {
			color: "inherit",
		},
		inputInput: {
			padding: (1, 1, 1, 0),
			transition: "ease",
			width: "100%",
		},
	};
	const { label, time, id } = props;
	const [deleteMsg, setDeleteMsg] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const { getSegments } = useContext(functions);
	const { showError, showSuccess } = useMessage()
	const httpErrorHandler = useHttpErrorHandler();

	const openDeleteModal = () => {
		setDeleteMsg(true);
	};

	const closeDeleteModal = () => {
		setDeleteMsg(false);
	};

	const deleteSegment = async () => {
		setDeleting(true);
		try {
			const response = await api.patch( `/user/segments/delete`,
				{ ids: [id] },
				{}
			);
			if (response.data.success) {
				showSuccess(response.data.message);
			} else {
				showError(response.data.message);
			}
			getSegments();
		} catch (e) {
			httpErrorHandler(e);
		} finally {
			closeDeleteModal();
			setDeleting(false);
		}
	};

	return (
		<>
			<div style={sx.entries}>
				<div>
					<Typography variant="h5" gutterBottom color="primary">
						{label}
					</Typography>
					<Typography component="div" variant="body2">
						<b>Date Created </b> {time}
					</Typography>
				</div>
				<div>
					<Button
						variant="contained"
						component={Link}
						to={`/contact/segments/view/${id}`}
						color="secondary"
						startIcon={<RemoveRedEye />}
						disableRipple
						disableTouchRipple>
						View
					</Button>
					<Button variant="contained" onClick={openDeleteModal} startIcon={<DeleteIcon />} color="error" sx={{ marginLeft: '8px' }} >Delete</Button>
				</div>
			</div>
			<Divider light sx={sx.rowDivider} />
			<Modal
				open={deleteMsg}
				onClose={closeDeleteModal}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Container maxWidth="sm">
					<Card style={{ width: "100%", padding: "32px" }}>
						<Typography variant="h6">Do you want to delete {label} ?</Typography>
						<div style={{ paddingTop: "16px", float: "right" }}>
							<Button
								variant="secondary"
								onClick={closeDeleteModal}
								disableRipple
								disabled={deleting}>
								Cancel
							</Button>
							<Button
								variant="contained"
								color="error"
								style={{ marginLeft: "16px" }}
								onClick={deleteSegment}
								disabled={deleting}
								startIcon={<DeleteIcon />}>
								Delete
								{deleting ? (
									<CircularProgress
										size="20px"
										style={{ marginLeft: "8px", color: "white" }}
									/>
								) : null}
							</Button>
						</div>
					</Card>
				</Container>
			</Modal>
		</>
	);
}
