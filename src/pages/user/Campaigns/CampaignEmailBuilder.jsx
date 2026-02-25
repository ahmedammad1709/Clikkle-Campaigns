
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Input,
	Button,
	Card,
	Container,
	Modal,
	Typography,
} from '@mui/material';
import api from '../../../utilities/axios';

const CampaignEmailBuilder = () => {
	const { id } = useParams();
	const [campaign, setCampaign] = useState(null);
	const [template, setTemplate] = useState({
		templateHtml: '',
		templateJson: {},
	});
	const [modalOpen, setModalOpen] = useState(false);
	const [placeholderValues, setPlaceholderValues] = useState({});

	const handleSubmitMappings = async () => {
		await api.patch(`/user/campaigns/${id}`, {
			templateMappings: placeholderValues,
		});
		setModalOpen(false);
	};

	const getCampaignsData = async () => {
		if (!id) return;
		try {
			const { data } = await api.get( `/user/campaigns/details/${id}`);
			setCampaign(data.data);
			setTemplate({
				templateHtml: data.data.template?.templateHtml || '',
				templateJson: data.data.template?.templateJson || {},
			});
			setPlaceholderValues(
				(data.data.template?.placeholders || []).reduce(
					(acc, placeholder) => ({
						...acc,
						[placeholder]: data.data.templateMappings?.[placeholder] || '',
					}),
					{}
				)
			);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCampaignsData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!campaign) return <h1>Loading...</h1>;
	return (
		<div>
			<div className='flex items-center justify-between gap-4 mb-4'>
				<Typography variant='h5'>{campaign.name}</Typography>
				<Button
					size='small'
					color='secondary'
					variant='contained'
					onClick={() => setModalOpen(true)}
				>
					Create Mapping
				</Button>
			</div>

			<Modal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Container maxWidth='sm'>
					<Card style={{ width: '100%', padding: '32px' }}>
						<Typography variant='h5'>Create Mapping</Typography>
						<Typography>
							Create a mapping of variables between your template and the
							entries of selected tag/segment
						</Typography>

						{(campaign.template?.placeholders || []).map((placeholder) => {
							return (
								<div className='grid grid-cols-2 my-4' key={placeholder}>
									<Typography>{placeholder}</Typography>
									<Input
										type='text'
										variant='outlined'
										name={placeholder}
										value={placeholderValues[placeholder]}
										onChange={(e) =>
											setPlaceholderValues((prev) => ({
												...prev,
												[placeholder]: e.target.value,
											}))
										}
									/>
								</div>
							);
						})}

						<Button
							size='small'
							type='submit'
							color='secondary'
							variant='contained'
							onClick={handleSubmitMappings}
						>
							Confirm
						</Button>
					</Card>
				</Container>
			</Modal>

			<iframe
				title='Template'
				style={{ width: '100%', height: '500px' }}
				srcDoc={template.templateHtml ? template.templateHtml : "<h1>Template</h1>"}
			/>
		</div>
	);
};

export default CampaignEmailBuilder;
