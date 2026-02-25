import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Typography from "./Typography";
import WebBuilder from './newsletter-builder/WebBuilder';
import api from '../utilities/axios';

const style = {
	position: 'absolute',
	width: '100%',
	height: '100%',
};

function BasicModal({ handleClose, open, templateName, savedTemplate }) {
	const { id } = useParams()
	const navigate = useNavigate()
	const [email, setEmail] = React.useState(null)
	const [modal, setModalOpen] = React.useState(false)

	const component = {
		pages: [{ component: savedTemplate && savedTemplate.innerHTML }]
	}

	const exportTemplate = () => {
		const template = document.getElementsByTagName('iframe')[0]?.contentDocument.getElementsByTagName('html')[0].innerHTML
		setEmail(template)
	}

	const updateTemplate = async () => {
		const data = await api.patch(
			 `/user/templates/${id}`,
			{ "html": email, "css": '', "plain": '' }
		);
		if (data.status === 200) navigate('/campaigns/templates')
		else throw new Error('something went wrong')
	}
	const handelUpdater = () => {
		exportTemplate()
		setModalOpen(true)
	}

	const goHome = () => {
		navigate('/');
	}


	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className='flex flex-col h-full min-h-full overflow-y-scroll'>
						<div className='flex justify-between py-0 px-8 items-center h-[54px] bg-[#172d5a]'>
							<div style={{ display: 'flex' }}>
								<Box onClick={goHome} component="img" src="/images/logo-light.png" sx={{ maxHeight: 32, cursor: 'pointer', marginTop: '2px' }} />
								<span style={{ fontSize: '24px', fontWeight: '600', marginLeft: '32px' }}>{templateName}</span>
							</div>
							<Button variant='outlined' sx={{ color: 'white', borderColor: 'transparent', marginLeft: '32px' }} onClick={handelUpdater} >Exit</Button>
						</div>
						<div className='flex flex-1 h-full'>
							<WebBuilder component={component} dependency={savedTemplate && savedTemplate.innerHTML} />

						</div>
					</div>
					<Box sx={{ position: 'absolute', display: 'flex', top: '0', zIndex: '10', width: '400px', justifyContent: 'space-between', left: '20%' }}>
						<CreateModal open={modal} setOpen={setModalOpen} updateTemplate={updateTemplate} />
					</Box>
				</Box>
			</Modal>
		</div>
	);
}

export {
	BasicModal
};

export function CreateModal({ open, setOpen, updateTemplate }) {
	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		margin: 'auto',
		textAlign: 'center',
		top: '50%',
		left: '50%',
		padding: "50px",
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.default',
		boxShadow: 24,
		borderRadius: '20px',
		p: 4,
	};
	const handleClose = () => setOpen(false);
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography>Are you sure?</Typography>
					<Button
						variant="contained"
						size="small"
						sx={{ mb: 2, mt: 4, py: 1 }}
						color="secondary"
						onClick={updateTemplate}>
						Sure
					</Button>
					<Button
						variant="contained"
						size="small"
						sx={{ mb: 2, mt: 0, py: 1 }}
						color="secondary"
						onClick={handleClose}>
						close
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
