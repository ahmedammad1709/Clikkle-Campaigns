import { Avatar, Box, Card, Divider, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import ActionIcon from "../../components/ActionIcon";
import Typography from "../../components/Typography";
import Sync from "@mui/icons-material/Sync";
import FilterList from "@mui/icons-material/FilterList";
import Add from "@mui/icons-material/Add";

const InputField = styled(TextField)(({ theme }) => ({
	marginTop: theme.spacing(2.5),
	marginBottom: theme.spacing(2.5),
	"& .MuiOutlinedInput-input": {
		padding: theme.spacing(1.3),
	},
}));

const EditUser = props => {
	const sx = {
		divider: {
			marginTop: 2,
			marginBottom: 4,
		},
		divider2: {
			marginTop: 2,
			marginBottom: 2,
		},
		avatar: {
			width: 30,
			height: 30,
		},
		formInput: {
			marginTop: "16px",
			marginBottom: "16px",
		},
		input: {
			marginTop: 2.5,
			marginBottom: 2.5,
			"& .MuiOutlinedInput-input": {
				padding: 1.3,
			},
		},
	};

	return (
		<Box sx={sx.root}>
			<Grid container spacing={3} sx={sx.titleGrid}>
				<Grid item xs>
					<Typography variant="h5" gutterBottom>
						Edit User
					</Typography>
					<Typography variant="body1" color="textSecondary">
						Manage your contacts from here
					</Typography>
				</Grid>
				<Grid item xs align="right">
					<ActionIcon color="primary" title="Sync" icon={<Sync />} />
					<ActionIcon color="primary" title="Filter" icon={<FilterList />} />
					<ActionIcon color="primary" title="Add Contact" icon={<Add />} />
				</Grid>
			</Grid>
			<Divider light sx={sx.divider} />
			<Card style={{ padding: "80px" }}>
				<Grid container alignItems="center">
					<Grid item xs={3}>
						<Avatar
							alt="user"
							sx={sx.avatar}
							src="data:image/jpeg;base64,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"
						/>
					</Grid>
					<Grid item xs={9}>
						<Typography variant="h3">John Doe</Typography>
						<Typography variant="body1" component="span" color="primary">
							johndoe123@gmail.com
						</Typography>
						<Typography
							variant="subtitle1"
							component="span"
							style={{ marginLeft: "8px" }}>
							- User
						</Typography>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: "56px" }}>
						<Typography variant="h4">Account</Typography>
						<Divider light sx={sx.divider2} />
					</Grid>

					<Grid item xs={3}>
						<Typography variant="subtitle1" color="textPrimary">
							First Name
						</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Last Name</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Username</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Password</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Email</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Address</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Prospects</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Employees</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Industry</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="subtitle1">Username</Typography>
					</Grid>
					<Grid item xs={9}>
						<InputField fullWidth variant="outlined" />
					</Grid>
				</Grid>
			</Card>
		</Box>
	);
};

export default EditUser;
