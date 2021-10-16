import {
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Button,
  MenuItem,
} from '@mui/material';

import { useEffect, useState } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import { useDispatch } from 'react-redux';
import { show } from '../redux/snackbarSlice';

import { addChannel } from '../api/apiChannel';

import { getImageIdAndName } from '../api/apiImage';

const AddChannel = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    label: '',
    protocol: 'igmp',
    multicast: '',
    port: '8208',
    image: '',
  });

  // state for image id and originalName
  const [imgIdAndName, setImgIdAndName] = useState([]);

  useEffect(() => {
    loadImgIdAndName();
  }, []);

  const loadImgIdAndName = () => {
    getImageIdAndName().then((res) => {
      setImgIdAndName(res.data);
    });
  };

  // get the global states for the snackbar
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    addChannel(formValues)
      .then((data) => {
        if (data.status === 'nok') {
          dispatch(
            show({
              message: 'Can not add channel - duplicate multicast address?',
              severity: 'error',
            })
          );
        } else {
          dispatch(
            show({
              message: 'Channel successfully added',
              severity: 'success',
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          show({
            message: 'Can not add channel',
            severity: 'error',
          })
        );
      });
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });

    console.log(event);
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setFormValues({ ...formValues, image: event.target.value });
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='filled-select-currency'
              select
              label='Select Image'
              value={formValues.image}
              onChange={handleSelectChange}
              helperText='Please select your image'
              variant='standard'
              fullWidth
              required
            >
              {imgIdAndName.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.originalName}
                </MenuItem>
              ))}
            </TextField>
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
