import {
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Button,
  IconButton,
  Stack,
} from '@mui/material';

import { useState } from 'react';

import { styled } from '@mui/material/styles';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { addChannel } from '../api/apiChannel';

const Input = styled('input')({
  display: 'none',
});

const AddChannel = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    label: '',
    protocol: 'igmp',
    multicast: '',
    port: '8208',
    fileName: 'Please press button to upload file.',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    addChannel(formValues)
      .then((data) => {
        console.log(data.newChannel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });

    console.log(event);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    console.log('Filename: ', file.name);
    setFormValues({ ...formValues, fileName: file.name });
    console.log('File type: ', file.type);
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h5' component='div'>
        Create Channel
      </Typography>
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='standard-basic'
              label='Name'
              variant='standard'
              fullWidth
              onChange={handleChange}
              color='success'
              name='name'
              value={formValues.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='standard-basic'
              label='Label'
              variant='standard'
              fullWidth
              onChange={handleChange}
              color='success'
              name='label'
              value={formValues.label}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id='standard-basic'
              label='Protocol'
              variant='standard'
              fullWidth
              onChange={handleChange}
              color='success'
              value={formValues.protocol}
              name='protocol'
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id='standard-basic'
              label='Multicast Address'
              variant='standard'
              fullWidth
              onChange={handleChange}
              color='success'
              value={formValues.multicast}
              name='multicast'
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id='standard-basic'
              label='Port'
              variant='standard'
              fullWidth
              onChange={handleChange}
              color='success'
              value={formValues.port}
              name='port'
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              label='Filename'
              fullWidth
              variant='standard'
              value={formValues.fileName}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Stack
              spacing={2}
              justifyContent='center'
              alignItems='center'
              sx={{ marginTop: '8px' }}
            >
              <label htmlFor='icon-button-file'>
                <Input
                  accept='image/*'
                  id='icon-button-file'
                  type='file'
                  onChange={handleFileUpload}
                />
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <FileUploadOutlinedIcon />
                </IconButton>
              </label>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                startIcon={<CheckOutlinedIcon />}
                type='submit'
                variant='outlined'
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddChannel;
