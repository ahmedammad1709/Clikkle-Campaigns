import { Button, Card, Container, Input, List, ListItem,  ListItemIcon, ListItemText, Modal } from '@mui/material';

import { useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '../../../components/Typography';
import { useMessage } from '../../../components/Header';
import { useTheme } from '../../../styles/theme';
import {  Delete, } from '@mui/icons-material';
import api from '../../../utilities/axios';

const TemplateBuilder = () => {
	const emailEditorRef = useRef(null);
	const { showSuccess, showError } = useMessage();
	const [template, setTemplate] = useState(null);
	const [open, setOpen] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const { mode } = useTheme();
	const [placeholders, setPlaceholders] = useState([]);
	const [newPlaceholder, setNewPlaceholder] = useState('');

	const saveTemplate = () => {
		const unlayer = emailEditorRef.current?.editor;
		unlayer?.exportHtml((data) => {
			api
				.patch( `/user/templates/${id}`, {
					templateJson: data.design,
					templateHtml: data.html,
					placeholders,
				})
				.then((res) => {
					showSuccess('Template saved successfully');
				})
				.catch((err) => {
					console.log(err);
					showError('Something went wrong in saving the template');
				})
				.finally(() => {
					navigate(-1);
				});
		});
	};

	const getTemplate = async () => {
		try {
			const { data } = await api.get( `/user/templates/${id}`);
			setTemplate(data?.template);
			setPlaceholders(data?.template?.placeholders);
			emailEditorRef.current?.editor?.loadDesign(
				data?.template?.templateJson
			);
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (!id) return;
		getTemplate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const onReady = (unlayer) => {
		// editor is ready
		// you can load your template here;
		// the design json can be obtained by calling
		// unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

		// const templateJson = { DESIGN JSON GOES HERE };
		// unlayer.loadDesign(templateJson);
		// console.log(template?.templateJson);
		unlayer.loadDesign(template?.templateJson);
	};

	return (
		<>
			{template ? (
				<div className='flex items-center justify-between gap-4 mb-2'>
					<Typography variant='h5'>{template.name}</Typography>

					<div className='flex items-center gap-2'>
						<Button variant='contained' onClick={() => setOpen(true)} color='secondary'>
							Placeholders
						</Button>

						<Button variant='contained' onClick={saveTemplate}>
							Save Template
						</Button>
					</div>
				</div>
			) : null}

			<EmailEditor
				onReady={onReady}
				ref={emailEditorRef}
				options={{ appearance: { theme: mode } }}
				style={{ height: 'calc(100vh - 168px)' }}
			/>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Container maxWidth='sm'>
					<Card style={{ width: '100%', padding: '32px' }}>
						<Typography variant='h6'>Placeholders</Typography>
						<List dense>
							{placeholders.map((placeholder) => (
								<ListItem key={placeholder}>
									<ListItemText primary={placeholder} />
									<ListItemIcon onClick={() => {
										setPlaceholders((prev) => {
											const newPlaceholders = [...prev];
											newPlaceholders.splice(newPlaceholders.indexOf(placeholder), 1);
											return newPlaceholders;
										})
									}}>
										<Delete />
									</ListItemIcon>
								</ListItem>
							))}
						</List>

						<div className='flex items-center gap-2'>
							<Input
								value={newPlaceholder}
								style={{ flexGrow: 1 }}
								placeholder='Enter new placeholder'
								onChange={(e) => setNewPlaceholder(e.target.value)}
							/>
							<Button variant='contained' color='secondary' onClick={() => {
								setPlaceholders((prev) => [...prev, newPlaceholder]);
								setNewPlaceholder('');
							}}>
								Add
							</Button>
						</div>

						<br />

						<Typography variant='body1'>
							Placeholders are the variables that you can use in your templates by wrapping them in curly braces like <code>{'{{name}}'}</code>. At the time of sending the email, these placeholders will be replaced with the actual values
						</Typography>
					</Card>
				</Container>
			</Modal>
		</>
	);
};

export default TemplateBuilder;
