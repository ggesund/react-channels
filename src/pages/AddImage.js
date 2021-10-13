import {
  Typography,
  Container,
  Box,
  Stack,
  IconButton,
  TextField,
  Grid,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import { uploadImage } from '../api/apiImage';

import { useDispatch } from 'react-redux';
import { show } from '../redux/snackbarSlice';

const Input = styled('input')({
  display: 'none',
});

const AddImage = () => {
  const [fileName, setFileName] = useState(
    'Please press button to select image.'
  );

  const [resize, setResize] = useState(true);
  const [reroute, setReroute] = useState(true);

  const [resizedImage, setResizedImage] = useState(null); // file object
  const [imgDimensions, setImgDimensions] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const history = useHistory();

  const dispatch = useDispatch();

  const resetForm = () => {
    setButtonDisabled(true);
    setFileName('Please press button to select image.');
    setImgDimensions('');
    // setResizedImage(null);
    setImage(null);
    setDescription('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // we have to create FormDate for Uploading a file to the backend
    const formData = new FormData();

    formData.append('file', resizedImage);
    formData.append('description', description);
    formData.append('fileName', fileName);
    formData.append('dimension', imgDimensions);

    // upload image
    uploadImage(formData)
      .then((res) => {
        dispatch(
          show({
            message: 'Image successfully uploaded to database.',
            severity: 'success',
          })
        );

        if (reroute) {
          history.push('/images');
        }

        // now reset the form
        resetForm();
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          show({
            message: 'Can not upload image to database!',
            severity: 'error',
          })
        );
      });
  };

  const getImageDimensions = (file) => {
    console.log('getImageDimensions');
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      setImage(img);
      setImgDimensions(`${img.width} x ${img.height} Pixel`);
    };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    console.log(event.target.files);

    if (file) {
      setButtonDisabled(false);
      if (resize) {
        try {
          Resizer.imageFileResizer(
            event.target.files[0],
            300,
            50,
            'PNG',
            100,
            0,
            (uri) => {
              // console.log(uri);
              // console.log(uri.name.toLowerCase());

              // determine size of the image and store it in state
              getImageDimensions(uri);
              setResizedImage(uri);
              setFileName(uri.name.toLowerCase());
            },
            'file'
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        setResizedImage(file);
        getImageDimensions(file);
        setFileName(file.name.toLowerCase());
      }
    }
  };

  const handleSwitchChange = (event) => {
    // console.log(event.target.checked);
    setResize(event.target.checked);
  };

  const handleRouteSwitchChange = (event) => {
    // console.log(event.target.checked);
    setReroute(event.target.checked);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h5' component='div'>
        Upload Image
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        sx={{ marginTop: '20px' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={resize}
                    color='warning'
                    onChange={handleSwitchChange}
                  />
                }
                label='Resize to 50px height'
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={reroute}
                    color='primary'
                    onChange={handleRouteSwitchChange}
                  />
                }
                label='Go to All Images after upload'
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: '15px' }}>
            <TextField
              name='description'
              label='Description'
              fullWidth
              variant='standard'
              value={description}
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              // we need name for the multer middleware in the backend, have to have the same name
              name='logoImage'
              label='Filename'
              fullWidth
              variant='standard'
              value={fileName}
              // InputProps={{
              //   readOnly: true,
              // }}
              onChange={handleFileNameChange}
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
                startIcon={<ClearOutlinedIcon />}
                type='button'
                variant='outlined'
                color='error'
                onClick={() => resetForm()}
                sx={{
                  marginRight: '12px',
                }}
              >
                Reset
              </Button>
              <Button
                startIcon={<CheckOutlinedIcon />}
                type='submit'
                variant='outlined'
                color='success'
                disabled={buttonDisabled}
              >
                Upload
              </Button>
            </Box>
          </Grid>

          <hr />

          <Grid item xs={12}>
            <Stack
              spacing={0}
              justifyContent='center'
              alignItems='center'
              sx={{ marginTop: '10px' }}
            >
              {image && <img src={image.src} alt='' />}

              <span>{imgDimensions}</span>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddImage;
