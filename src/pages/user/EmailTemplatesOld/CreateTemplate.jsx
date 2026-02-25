import { Box, CircularProgress } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BasicModal } from '../../../components/FullscreenModal';
import { footer } from '../../../components/newsletter-builder/footer';
import api from '../../../utilities/axios';

const CreateTemplate = () => {
	const [open, setOpen] = useState(true);
	const [savedTemplate, setSavedTemplate] = useState(null);
	const [templateName, setTemplateName] = useState('');
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	const savedDataFetcher = async (id) => {
		setLoading(true);
		const data = await api.get(`/user/templates/${id}`);
		const judger = data.data.template[0].content;
		setTemplateName(data.data.template[0].name);
		setLoading(false);

		const tempNode = document.createElement('div');
		if (!judger) {
			tempNode.innerHTML = footer;
			setSavedTemplate(tempNode);
			return;
		}

		const htmlData = data.data.template?.[0].content.html;
		tempNode.innerHTML = htmlData;
		setSavedTemplate(tempNode);
		return;
	};

	useEffect(() => {
		savedDataFetcher(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<Box sx={{ width: '100%' }}>
			{loading ? (
				<CircularProgress
					size='100px'
					style={{
						position: 'absolute',
						left: '50%',
						top: '70%',
						color: '#172D5A',
					}}
				/>
			) : (
				<BasicModal
					{...{
						open,
						templateName,
						savedTemplate,
						handleClose: () => setOpen(false),
					}}
				/>
			)}
		</Box>
	);
};

export default CreateTemplate;
