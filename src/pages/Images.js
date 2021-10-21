import { Fragment, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { deleteImage, getAllImages } from '../api/apiImage';
import ConfirmDialog from '../dialogs/ConfirmDialog';

import { useDispatch } from 'react-redux';
import { show } from '../redux/snackbarSlice';
// import UpdateImageDialog from '../dialogs/UpdateImageDialog';

const Images = () => {
  const [allImages, setAllImages] = useState([]); // list of all images

  // const [singleImage, setSingleImage] = useState(null); // single image (e.g. for update)

  const [dialogOpen, setDialogOpen] = useState(false);

  // const [updateImageDialogOpen, setUpdateImageDialogOpen] = useState(false);

  const [imageId, setImageId] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  // let singleImage;

  useEffect(() => {
    loadAllImages();
  }, []);

  const loadAllImages = () => {
    getAllImages()
      .then((res) => {
        // console.log(res);

        if (res.status === 'ok') {
          setAllImages(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onImageDeleteHandler = (id) => {
    setImageId(id);
    setDialogOpen(true);
  };

  const onImageUpdateHandler = (id) => {
    console.log('Reroute to image update page', id);
    history.push(`/image/${id}`);
  };

  const onRemoveFromDBHandler = () => {
    deleteImage(imageId)
      .then((res) => {
        // console.log('Result of delete image: ', res);

        dispatch(
          show({
            message: `Image ${res} successfully deleted from database and file storage`,
            severity: 'warning',
          })
        );
        setDialogOpen(false);
        loadAllImages();
      })
      .catch((err) => {
        dispatch(
          show({
            message: 'Image NOT deleted from database and file storage',
            severity: 'error',
          })
        );
        setDialogOpen(false);
      });
  };

  return (
    <Fragment>
      <ConfirmDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        title='Do you really want to delete that image?'
        subtitle='This action can not be undone!'
        onRemoveFromDBHandler={onRemoveFromDBHandler}
      />

      <h2>All Images</h2>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {/* {JSON.stringify(allImages)} */}
        {allImages.map((image) => {
          const contentType = image.img.contentType;
          const imgBase64 = Buffer.from(image.img.data).toString('base64');

          return (
            <Card
              sx={{
                width: 250,
                margin: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
              key={image._id}
              raised
            >
              <Box
                sx={{
                  height: '50px',
                }}
                component='div'
              >
                <CardMedia
                  component='img'
                  image={`data:${contentType};base64,${imgBase64}`}
                  alt={image.desc}
                  sx={{
                    padding: '10px',
                  }}
                />
              </Box>

              <CardContent>
                <Typography gutterBottom variant='h6' component='div'>
                  {image.originalName}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {image.desc}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {image.dimension}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  flexGrow: 1,
                  alignItems: 'flex-end',
                  width: '100%',
                }}
              >
                <Button
                  size='small'
                  color='error'
                  onClick={() => onImageDeleteHandler(image._id)}
                >
                  Delete
                </Button>
                <Button
                  size='small'
                  onClick={() => onImageUpdateHandler(image._id)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default Images;
