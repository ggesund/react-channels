import { Fragment, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { getAllImages } from '../api/apiImage';
import ConfirmDialog from '../components/ConfirmDialog';

import { useDispatch } from 'react-redux';
import { show } from '../redux/snackbarSlice';

const Images = () => {
  const [allImages, setAllImages] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllImages();
  }, []);

  const loadAllImages = () => {
    getAllImages()
      .then((res) => {
        console.log(res);

        if (res.status === 'ok') {
          setAllImages(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onImageDeleteHandler = (event) => {
    setDialogOpen(true);
  };

  const onRemoveFromDBHandler = () => {
    console.log('Now the image is removed from database and file storage');
    dispatch(
      show({
        message: 'Image successfully deleted from database and file storage',
        severity: 'warning',
      })
    );
    setDialogOpen(false);
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
              <CardMedia
                component='img'
                image={`data:${contentType};base64,${imgBase64}`}
                alt={image.desc}
                sx={{ padding: '10px' }}
              />

              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
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
                  onClick={onImageDeleteHandler}
                >
                  Delete
                </Button>
                <Button size='small'>Edit</Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default Images;