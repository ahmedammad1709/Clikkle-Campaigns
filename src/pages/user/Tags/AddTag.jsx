import { Button, Card, Container, Grid, Modal, Typography, TextField } from '@mui/material';
import { useState, useContext } from 'react';

import { functions } from './Tags';
import { useMessage } from '../../../components/Header';
import api from '../../../utilities/axios';

export default function AddTag(props) {
	const { modal, setModal } = props;
	const { getTags } = useContext(functions);
	const { showSuccess, showError } = useMessage();

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	const closeModal = () => {
		setModal(false);
		setName(''); // reset field
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!name || name.length < 3 || name.length > 15) {
			showError('Tag name must be between 3 and 15 characters.');
			return;
		}

		setLoading(true);

		try {
			const response = await api.post('/user/tags', { name });
			const { success, message } = response.data;

			closeModal();
			getTags();

			if (success) {
				showSuccess(message);
			} else {
				showError(message);
			}
		} catch (error) {
			showError(error.response?.data?.message || 'Something went wrong!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			open={modal}
			onClose={closeModal}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Container maxWidth='md' fixed>
				<Card elevation={5} style={{ padding: '40px', width: '100%' }}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs>
								<Typography variant='subtitle3'>Tag Name</Typography>
								<TextField
									fullWidth
									variant='outlined'
									name='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									type='submit'
									size='large'
									color='primary'
									disabled={loading}
									style={{ marginTop: 35 }}
								>
									Add Tag {loading && '...'}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Card>
			</Container>
		</Modal>
	);
}
