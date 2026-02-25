import { Box, Divider, Grid, Typography } from "@mui/material";
import Sync from "@mui/icons-material/Sync";

import React, { useCallback, useEffect, useState } from "react";
import ActionIcon from "../../../components/ActionIcon";

import { useParams } from "react-router-dom";
import ConditionalLoading from "../../../components/ConditionalLoading";
import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import api from "../../../utilities/axios";

export default function ViewReport() {
	const sx = {
		root: {
			cursor: "default",
		},
		tabsRoot: {
			flexGrow: 1,
		},
		appBar: {
			background: "inherit",
		},
		divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
		search: {
			position: "relative",
			paddingLeft: 1,
			borderRadius: 1,
			border: " 1px solid #626A76",
			backgroundColor: "inherit",
			"&:hover": {
				backgroundColor: "inherit",
			},
			marginRight: 2,
			marginLeft: 0,
			width: "50%",
		},
		searchIcon: {
			padding: (0, 0),
			height: "100%",
			position: "absolute",
			pointerEvents: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		inputRoot: {
			color: "inherit",
		},
		inputInput: {
			padding: (1, 1, 1, 0),
			paddingLeft: `calc(1em + ${4}px)`,
			transition: "ease",
			width: "100%",
		},
		box: {
			marginTop: 3,
			border: " 1px solid #626A76",
			padding: 4,
		},

		// Entries Css
	};
	const [report, setReport] = useState(null);
	const { id } = useParams();
	const httpErrorHandler = useHttpErrorHandler();

	const getReport = useCallback(async () => {
		setReport(null);
		try {
			const response = await api.get(`/user/reports/${id}`, {});
			setReport(response.data.data);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [setReport, id, httpErrorHandler]);

	useEffect(() => {
		getReport();
	}, [getReport]);

	return (
		<Box sx={sx.root}>
			<Grid container spacing={1} sx={sx.titleGrid}>
				<Grid item md xs={12}>
					<Typography variant="h5" gutterBottom>
						Reports
					</Typography>
					<Typography variant="body1" color="textSecondary">
						Manage your reports from here.
					</Typography>
				</Grid>
				<Grid item md xs={12} align="right">
					<ActionIcon color="primary" title="Sync" icon={<Sync onClick={getReport} />} />
				</Grid>
			</Grid>
			<Divider light sx={sx.divider} />
			<ConditionalLoading
				condition={report}
				message="No Report found"
				style={{ margin: "25% 50%" }}>
				{report ? (
					<>
						<Typography variant="h4">{report.sends} Recipients</Typography>
						<Grid container style={{ marginTop: "24px" }}>
							<Grid item xs={12} sm={6}>
								<Typography
									variant="body1"
									style={{ fontSize: "17px", marginBottom: "10px" }}>
									<b>Audience:</b> None Business.
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									style={{ fontSize: "17px" }}>
									<b>Subject:</b> New Camera out.
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography
									variant="body1"
									style={{ fontSize: "17px", marginBottom: "10px" }}>
									<b>Delivered:</b> Wed, Apr 20, 2022 7:12 am
								</Typography>
								<Typography variant="body1" color="primary" gutterBottom>
									View email - Download
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							style={{
								marginTop: "64px",
								marginBottom: "24px",
							}}>
							<Grid
								item
								xs={12}
								sm={6}
								md={3}
								align="center"
								style={{
									border: "1px solid rgba(255, 255, 255, 0.3)",
									padding: "24px",
								}}>
								<Typography variant="h4" gutterBottom>
									{report.opens}
								</Typography>
								<Typography variant="body1">Opened</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								md={3}
								align="center"
								style={{
									border: "1px solid rgba(255, 255, 255, 0.3)",
									padding: "24px",
								}}>
								<Typography variant="h4" gutterBottom>
									{report.clicks}
								</Typography>
								<Typography variant="body1">Clicked</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								md={3}
								align="center"
								style={{
									border: "1px solid rgba(255, 255, 255, 0.3)",
									padding: "24px",
								}}>
								<Typography variant="h4" gutterBottom>
									{report.bounces}
								</Typography>
								<Typography variant="body1">Bounced</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								md={3}
								align="center"
								style={{
									border: "1px solid rgba(255, 255, 255, 0.3)",
									padding: "24px",
								}}>
								<Typography variant="h4" gutterBottom>
									1
								</Typography>
								<Typography variant="body1">Unsubscribed</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={5} style={{ marginTop: "24px" }}>
							<Grid item xs={12} sm={6}>
								<Grid container>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Successful deliveries
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											{report.deliveries}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Total opens
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											1
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Last opened
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											{report.lastOpened
												? new Date(report.lastOpened).toLocaleString()
												: "N/A"}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Forwarded
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											0
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Grid container>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Click per unique opens
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											{report.clicksPerUniqueOpens}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Total clicks
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											{report.clicks}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Last clicked
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											{report.lastClicked
												? new Date(report.lastClicked).toLocaleString()
												: "N/A"}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", marginBottom: "10px" }}>
											Abuse reports
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography
											variant="body1"
											style={{ fontSize: "17px", float: "right" }}>
											{report.complaints}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</>
				) : null}
			</ConditionalLoading>
		</Box>
	);
}
