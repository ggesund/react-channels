import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ConfirmDialog = (props) => {
  const { dialogOpen, setDialogOpen, title, subtitle, onRemoveFromDBHandler } =
    props;

  return (
    <Dialog
      // onClose={handleClose}
      open={dialogOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<CancelOutlinedIcon />}
          type='button'
          variant='outlined'
          color='primary'
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button
          startIcon={<DeleteForeverOutlinedIcon />}
          type='button'
          variant='outlined'
          color='error'
          onClick={onRemoveFromDBHandler}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
