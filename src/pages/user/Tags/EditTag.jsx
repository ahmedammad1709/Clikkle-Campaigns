import { Button, Card, Grid, Modal, Typography } from "@mui/material";
import { useMemo } from "react";
import { Form, Submit, useForm } from "./../../../hooks/useForm";
import { Input } from "./../../../hooks/useForm/inputs";
import { useTheme } from '@mui/material/styles';
import api from '../../../utilities/axios';
import useHttpErrorHandler from '../../../utilities/httpErrorHandler';

export default function EditTag(props) {
	const { modal, setModal } = props;

	return (
		<Modal
			open={Boolean(modal)}
			onClose={() => setModal(null)}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Card elevation={5} style={{ padding: '40px', width: '50%' }}>
				<EditForm
					label={modal && modal.name}
					id={modal && modal._id}
					closeEditForm={() => setModal(null)}
				/>
			</Card>
		</Modal>
	);
}

const EditForm = ({ label, id, closeEditForm }) => {
	const { palette } = useTheme();
	const { background, text } = palette;
	const httpErrorHandler = useHttpErrorHandler();
	const handlers = useForm(
		useMemo(
			() => ({
				name: { value: label, required: true },
				id: { value: id },
			}),
			[id, label]
		)
	);

	const onSubmit = async (formData) => {
		try {
			const response = await api.patch(`/user/tags/${id}`, formData);
			const { success, message } = response.data;
			if (success) {
				setTimeout(closeEditForm, 1000);
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
		<Form
			onSubmit={onSubmit}
			handlers={handlers}
			onError={httpErrorHandler}
		>
			<Grid container spacing={3}>
				<Grid item xs>
					<Typography variant='body1'>Tag Name</Typography>
					<Input
						style={{
							width: '100%',
							backgroundColor: background.default,
							color: text.secondary,
						}}
						variant='outlined'
						label='Tag Name'
						name='name'
					/>
				</Grid>
				<Grid item>
					<Submit>
						{(loader) => (
							<Button
								variant='contained'
								type='submit'
								size='large'
								color='primary'
								style={{ marginTop: '30px' }}
								disabled={Boolean(loader)}
							>
								Done
								{loader}
							</Button>
						)}
					</Submit>
				</Grid>
			</Grid>
		</Form>
	);
};
