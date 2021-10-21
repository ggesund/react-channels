import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getImage, updateImage } from '../api/apiImage';

import {
  Container,
  Typography,
  Box,
  Grid,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import Resizer from 'react-image-file-resizer';

import { useDispatch } from 'react-redux';
import { show } from '../redux/snackbarSlice';

const Input = styled('input')({
  display: 'none',
});

const initialState = {
  desc: '',
  img: {
    data: null,
    contentType: '',
  },
  originalName: '',
  dimension: '',
};

const UpdateImage = (props) => {
  // save the image in a state
  const [image, setImage] = useState(initialState);

  const [imageSrc, setImageSrc] = useState('');
  const [resize, setResize] = useState(true); // check if images should be resized
  const [imageFile, setImageFile] = useState(null); // image file object for sending to backend
  const [descriptionChanged, setDescriptionChanged] = useState(false); // if the description has changed

  const { match } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  // get the image based on the URL parameter
  useEffect(() => {
    const imageId = match.params.imageId;

    loadImage(imageId);
  }, []);

  const loadImage = (imageId) => {
    getImage(imageId)
      .then((res) => {
        console.log(res);
        setImage(res);

        // and set the pure Image for display in preview
        const contentType = res.img.contentType;
        const imgBase64 = Buffer.from(res.img.data).toString('base64');

        setImageSrc(`data:${contentType};base64,${imgBase64}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    // checken, ob nur die Beschreibung geändert wurde
    if (descriptionChanged) {
      formData.append('description', image.desc);
    }

    // wenn auch das Image geändert wurde, dann schickn wir alles mit, egal, ob es geändert wurde
    // weil es sind keine großen Datenmengen; es wird dann in der DB einfach mit dem gleichen Content
    // überschrieben
    // file + metadata
    if (imageFile) {
      formData.append('file', imageFile);
      formData.append('originalName', image.originalName);
      formData.append('dimension', image.dimension);
      formData.append('desc', image.desc);
    }

    updateImage(image._id, formData)
      .then((res) => {
        console.log('Update image result: ', res.data);
        dispatch(
          show({
            message: `Image ${res.data.originalName} successfully updated in database.`,
            severity: 'success',
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          show({
            message: `Can not update image.`,
            severity: 'error',
          })
        );
      });
  };

  const handleSwitchChange = (event) => {
    setResize(event.target.checked);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionChanged(true);
    setImage({ ...image, desc: event.target.value });
  };

  const handleFileNameChange = (event) => {
    setImage({ ...image, originalName: event.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    console.log('File ausgewählt: ', event.target.files[0]);

    if (file) {
      // setButtonDisabled(false);
      if (resize) {
        console.log('File will be resized...');
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

              const reader = new FileReader();
              let urlString = '';

              reader.addEventListener('load', () => {
                urlString = reader.result;
                setImageSrc(urlString);
                // console.log(urlString);
              });

              if (uri) {
                reader.readAsDataURL(uri);
              }

              // determine size of the image and store it in state
              getImageDimensions(uri);
              setImageFile(uri);
              setImage({ ...image, originalName: uri.name.toLowerCase() });
            },
            'file'
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        // file will not be resized
        // ------------------------

        console.log('File will NOT be resized...');

        setImageFile(file);
        getImageDimensions(file);

        const reader = new FileReader();
        let urlString = '';

        reader.addEventListener('load', () => {
          urlString = reader.result;
          setImageSrc(urlString);
          // console.log(urlString);
        });

        if (file) {
          reader.readAsDataURL(file);
        }

        setImage({ ...image, originalName: file.name.toLowerCase() });
      }
    }
  };

  const getImageDimensions = (file) => {
    console.log('getImageDimensions');
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      setImage({ ...image, dimension: `${img.width} x ${img.height} Pixel` });
    };
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h5' component='div'>
        Update Image
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
          <Grid item xs={12} sx={{ marginBottom: '15px' }}>
            <TextField
              name='description'
              label='Description'
              fullWidth
              variant='standard'
              value={image.desc}
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
              value={image.originalName}
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
                startIcon={<CancelOutlinedIcon />}
                type='button'
                variant='outlined'
                color='error'
                onClick={() => history.push('/images')}
                sx={{
                  marginRight: '12px',
                }}
              >
                Cancel
              </Button>
              <Button
                startIcon={<CheckOutlinedIcon />}
                type='submit'
                variant='outlined'
                color='success'
                // disabled={buttonDisabled}
              >
                Update
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Stack
              spacing={0}
              justifyContent='center'
              alignItems='center'
              sx={{ marginTop: '10px' }}
            >
              {image && <img src={imageSrc} alt='' />}

              <span>{image.dimension}</span>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UpdateImage;
