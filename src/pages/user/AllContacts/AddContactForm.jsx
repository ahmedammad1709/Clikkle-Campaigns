import Add from '@mui/icons-material/Add';
import { Box, Button, Chip, Grid, IconButton, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import Typography from '../../../components/Typography';

import { useMessage } from '../../../components/Header';
import { useTheme } from '@mui/material/styles';
import api from '../../../utilities/axios';

export default function AddContactForm({ handleClose }) {
  const { palette } = useTheme();
  const { background, text } = palette;
  const { showSuccess, showError } = useMessage();

  const [allTags, setAllTags] = useState([]);
  const [tagsModal, setTagsModal] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    birthday: '',
    tags: [],
  });

  // Fetch tags
  const getTags = async () => {
    try {
      const response = await api.get(`/tags`);
      setAllTags(response.data.tags);
    } catch (e) {
      console.error(e);
      showError('Failed to fetch tags');
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = (event, newTag) => {
    setFormValues((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    setAllTags((prev) => prev.filter((tag) => tag._id !== newTag._id));
    closeTagsModal();
  };

  const handleDelete = (id) => {
    const removedTag = formValues.tags.find((tag) => tag._id === id);
    setFormValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag._id !== id),
    }));
    setAllTags((prev) => [...prev, removedTag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/user/contacts`, {
        ...formValues,
        tags: formValues.tags.map((tag) => tag._id),
      });
      if (response.data.success) {
        showSuccess('Successfully added contact');
        handleClose();
      } else {
        showError(response.data.message);
      }
    } catch (e) {
      if (e.response?.status === 409) {
        showError('There is already a contact with this email address');
      } else {
        console.error(e);
        showError('Failed to add contact');
      }
    }
  };

  const openTagsModal = () => setTagsModal(true);
  const closeTagsModal = () => setTagsModal(false);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant='subtitle3'>First Name</Typography>
            <TextField
              fullWidth
              name='firstName'
              variant='outlined'
              value={formValues.firstName}
              onChange={handleChange}
              style={{ backgroundColor: background.default, color: text.secondary }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant='subtitle3'>Last Name</Typography>
            <TextField
              fullWidth
              name='lastName'
              variant='outlined'
              value={formValues.lastName}
              onChange={handleChange}
              style={{ backgroundColor: background.default, color: text.secondary }}
            />
          </Grid>
        </Grid>

        <Typography variant='subtitle3'>Email</Typography>
        <TextField
          fullWidth
          name='email'
          type='email'
          variant='outlined'
          value={formValues.email}
          onChange={handleChange}
          style={{ backgroundColor: background.default, color: text.secondary }}
        />

        <Typography variant='subtitle3'>Address</Typography>
        <TextField
          fullWidth
          name='address'
          variant='outlined'
          value={formValues.address}
          onChange={handleChange}
          style={{ backgroundColor: background.default, color: text.secondary }}
        />

        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant='subtitle3'>Phone</Typography>
            <TextField
              fullWidth
              name='phone'
              type='number'
              variant='outlined'
              value={formValues.phone}
              onChange={handleChange}
              style={{ backgroundColor: background.default, color: text.secondary }}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant='subtitle3'>Birthday</Typography>
            <TextField
              fullWidth
              name='birthday'
              type='date'
              variant='outlined'
              value={formValues.birthday}
              onChange={handleChange}
              style={{ backgroundColor: background.default, color: text.secondary }}
            />
          </Grid>
        </Grid>

        <Box style={{ border: '1px solid rgba(255, 255, 255, 0.12)' }} p={2}>
          <Typography variant='h6'>Tags</Typography>
          <IconButton style={{ float: 'right', padding: '6px' }} onClick={openTagsModal}>
            <Add />
          </IconButton>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {formValues.tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.name}
                variant='outlined'
                color='primary'
                onDelete={() => handleDelete(tag._id)}
              />
            ))}
          </Box>
        </Box>

        <Box textAlign='right' mt={2}>
          <Button type='submit' variant='contained' color='primary' size='small'>
            Add Contact
          </Button>
        </Box>
      </form>

      <Dialog open={tagsModal} onClose={closeTagsModal}>
        <DialogTitle>Choose a tag :</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Autocomplete
              options={allTags}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              onChange={addTag}
              renderInput={(params) => <TextField {...params} label='Search tags' variant='outlined' />}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
