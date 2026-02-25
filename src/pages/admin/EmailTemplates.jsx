import {
	Box,
	Divider,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	CardActions,
	CardMedia,
	Menu,
	MenuItem,
	IconButton,
} from "@mui/material";
import React from "react";
import ActionIcon from "../../components/ActionIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "../../components/Typography";
import Sync from "@mui/icons-material/Sync";
import FilterList from "@mui/icons-material/FilterList";
import Add from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function EmailTemplate() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const MenuClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const MenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Grid container spacing={3}>
				<Grid item xs>
					<Typography variant="h5" gutterBottom>
						Templates
					</Typography>
					<Typography variant="body1" color="textSecondary">
						Manage your users from here
					</Typography>
				</Grid>
				<Grid item xs align="right">
					<ActionIcon color="primary" title="Sync" icon={<Sync />} />
					<ActionIcon color="primary" title="Filter" icon={<FilterList />} />
					<ActionIcon
						color="primary"
						title="Add Contact"
						component={Link}
						to="/admin/add-new-template"
						icon={<Add />}
					/>
				</Grid>
			</Grid>
			<Divider
				light
				sx={{
					marginTop: 2,
					marginBottom: 4,
				}}
			/>
			<Grid container spacing={2}>
				{[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
					<Grid item xs={12} md={3}>
						<Card style={{ borderRadius: "8px" }}>
							<CardActionArea>
								<CardMedia
									style={{ height: "230px" }}
									component="img"
									image={`https://source.unsplash.com/random/${item}`}
									title="randomImage"></CardMedia>

								<CardContent style={{ padding: "16px" }}>
									<Typography variant="h5">Unsplash</Typography>
									<Typography variant="subtitle1">
										This is the caption of the card you can use it to describe
										the contents
									</Typography>
								</CardContent>
								<CardActions style={{ paddingRight: "8px", paddingLeft: "16px" }}>
									<Typography variant="body1" component="span">
										$
									</Typography>
									<Typography variant="h6" component="span">
										70
									</Typography>
									<IconButton style={{ marginLeft: "auto" }} onClick={MenuClick}>
										<MoreVertIcon />
									</IconButton>
									<Menu
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={MenuClose}>
										<MenuItem onClick={MenuClose}>Edit</MenuItem>
										<MenuItem onClick={MenuClose}>Delete</MenuItem>
									</Menu>
								</CardActions>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
