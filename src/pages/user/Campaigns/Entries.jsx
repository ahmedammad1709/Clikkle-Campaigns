import {
	Button,
	ButtonGroup,
	Card,
	Chip,
	CircularProgress,
	Container,
	Divider,
	Grid,
	MenuItem,
	Modal,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "../../../components/Typography";

import { useMenu, Menu } from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";

import { functions } from "./Campaigns";
import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import api from "../../../utilities/axios";
// import { useEffect, useState } from "react";

export default function Entries(props) {
	const sx = {
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
			padding: "5px 16px",
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
			marginLeft: 4,
			fontSize: "0.7rem",
			paddingLeft: 1,
		},
		sortBy: {
			outlined: "inherit",
			"& .MuiSelect-outlined.MuiSelect-outlined": {
				padding: (1.4, 4.5),
			},
			"& .MuiSelect-select.MuiSelect-select": {
				padding: (1.4, 4.5),
			},
		},
	};
	const { label, status, to, createdAt, opensPercent, clicksPercent, id, sent } = props;
	const { anchorEl, openMenu, closeMenu } = useMenu();
	const [deleteMsg, setDeleteMsg] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const { getCampaigns, showMessage } = useContext(functions);
	const httpErrorHandler = useHttpErrorHandler();

	const openDeleteModal = () => {
		setDeleteMsg(true);
	};

	const closeDeleteModal = () => {
		setDeleteMsg(false);
	};

	const deleteCampaign = async id => {
		setDeleting(true);
		try {
			const response = await api.delete(`/user/campaigns/${id}`);
			if (response.data.success) {
				showMessage({ success: response.data.message });
			} else {
				showMessage({ error: response.data.message });
			}
		} catch (e) {
			httpErrorHandler(e);
		}
		getCampaigns();
		closeDeleteModal();
		setDeleting(false);
	};

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6} md={8} lg>
					<Typography variant="h5" color="primary">
						{label}
						<Chip
							label={status}
							size="small"
							style={{
								marginLeft: "16px",
								height: "21px",
								marginBottom: "5px",
							}}
						/>
					</Typography>

					{to ? (
						to.type === "segment" ? (
							<Typography variant="subtitle3" component="div" color="textSecondary">
								<b>Segment</b> : {to.name}
							</Typography>
						) : (
							<Typography variant="subtitle3" component="div" color="textSecondary">
								<b>Tag</b> : {to.name}
							</Typography>
						)
					) : (
						<Typography variant="subtitle3" component="div" color="textSecondary">
							<b> Tag</b> : Not Selected
						</Typography>
					)}

					{status === "ongoing" ? (
						<Typography variant="subtitle3" component="div" color="textSecondary">
							<b> Sent </b> : {sent}
						</Typography>
					) : null}
					<Typography variant="body2" component="div" color="textSecondary">
						<b>Created at </b>: {createdAt}
					</Typography>
				</Grid>

				<Grid item xs={6} sm={3} md={2} sx={{ my: 1 }} align="center">
					<Typography variant="subtitle1" color="primary">
						{opensPercent ? opensPercent + "%" : "-"}
					</Typography>
					<Typography variant="subtitle1" component="div" color="textSecondary">
						Opens
					</Typography>
				</Grid>

				<Grid item xs={6} sm={3} md={2} sx={{ my: 1 }} align="center">
					<Typography variant="subtitle1" color="primary">
						{clicksPercent ? clicksPercent + "%" : "-"}
					</Typography>
					<Typography variant="subtitle1" component="div" color="textSecondary">
						Clicks
					</Typography>
				</Grid>

				<Grid item xs lg={2.5} sx={{ my: 1 }} align="right">
					<ButtonGroup variant="contained" color="secondary" size="small">
						<Button
							sx={sx.viewButton}
							component={Link}
							to={`/campaigns/report/${id}`}
							disableRipple
							disableTouchRipple
							disabled={status !== "completed"}>
							View Report
						</Button>

						<Button
							variant="contained"
							sx={sx.toggleButton}
							disabled={status === "completed"}
							onClick={openMenu}>
							<KeyboardArrowDownIcon />
						</Button>
						<Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
							<MenuItem component={Link} to={`/campaigns/edit/${id}`}>
								Edit
							</MenuItem>
							<MenuItem onClick={openDeleteModal}>Delete</MenuItem>
						</Menu>
					</ButtonGroup>
				</Grid>
			</Grid>

			<Divider light sx={{ my: 2 }} />
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
								color="secondary"
								style={{ marginLeft: "16px" }}
								onClick={() => deleteCampaign(id)}
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
