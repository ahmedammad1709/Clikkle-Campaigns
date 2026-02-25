import { Box, Container, Divider, Grid } from '@mui/material';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConditionalLoading from '../../../components/ConditionalLoading';
import Typography from '../../../components/Typography';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import api from '../../../utilities/axios';

export default function ViewSignUpForm() {
	const { id } = useParams();
	const [content, setContent] = useState({});
	const httpErrorHandler = useHttpErrorHandler();

	const getForms = useCallback(async () => {
		try {
			const response = await api.get(`/user/signupforms/${id}`, {});

			setContent(response.data.form);
		} catch (e) {
			httpErrorHandler(e);
		}
	}, [setContent, id, httpErrorHandler]);

	useEffect(() => {
		getForms();
	}, [getForms]);

	return (
		<ConditionalLoading condition={content} style={{ margin: '25% 50%' }}>
			<Box>
				<Grid container spacing={1}>
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							{content.name}
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							{`Subscribe to ${content.name}`}
						</Typography>
					</Grid>
				</Grid>

				<Divider
					light
					sx={{
						marginTop: 2,
						marginBottom: 3.15,
					}}
				/>
				<Container
					maxWidth='md'
					dangerouslySetInnerHTML={{ __html: content.content }}
				/>
			</Box>
		</ConditionalLoading>
	);
}
