import { Container, Dialog as MuiDialog, Divider, Typography } from "@mui/material";
import { } from "@mui/material/styles";
import AddContactForm from "./AddContactForm";
import AddTagDialog from "./AddTagDialog";

function Dialog(props) {
	const sx = {
		root: {
			padding: "40px",
			"& .MuiTextField-root": {
				marginTop: 1,
				marginBottom: 1,
			},
		},
		divider: {
			marginTop: 1,
			marginBottom: 2,
		},
	};
	const { state, handleClose } = props;

	return (
		<MuiDialog open={state} onClose={handleClose}>
			<Container maxWidth="md" sx={sx.root}>
				<Typography variant="h6" component="span">
					Add Contact
				</Typography>
				<Divider m={1} sx={sx.divider} />

				<AddContactForm handleClose={handleClose} />
			</Container>
		</MuiDialog>
	);
}

function Dialog2(props) {
	const { state, handleClose, updateRows } = props;

	return (
		<MuiDialog open={state} onClose={handleClose}>
			<Container maxWidth="md">
				<AddTagDialog updateRows={updateRows} handleClose={handleClose} />
			</Container>
		</MuiDialog>
	);
}
export { Dialog, Dialog2 };
