import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Container from '@mui/material/Container';

// Button Icons
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useEffect } from 'react';

const UpdateImageDialog = (props) => {
  const {
    dialogOpen,
    title,
    confirmButtonTitle,
    singleImage,
    setUpdateImageDialogOpen,
  } = props;

  //   useEffect(() => {
  //     console.log('Do nothing...');
  //   }, []);

  console.log('SINGLE IMAGE:', singleImage);

  return (
    <Dialog
      // onClose={handleClose}
      open={dialogOpen}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {'Stringify' + JSON.stringify(singleImage)}
        <Container maxWidth='sm'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      // checked={}
                      color='warning'
                      // onChange={}
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
                // value={singleImage.desc}
                // onChange={handleDescriptionChange}
              />
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<CancelOutlinedIcon />}
          type='button'
          variant='outlined'
          color='primary'
          onClick={() => setUpdateImageDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button
          startIcon={<DeleteForeverOutlinedIcon />}
          type='button'
          variant='outlined'
          color='error'
          //   onClick={onRemoveFromDBHandler}
        >
          {confirmButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateImageDialog;
