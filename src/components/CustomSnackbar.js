import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hide } from '../redux/snackbarSlice';

const CustomSnackbar = () => {
  const dispatch = useDispatch();

  // get all the global states for showing the snackbar
  const showSnackbar = useSelector((state) => state.snackbar.showSnackbar);
  const snackbarMessage = useSelector((state) => state.snackbar.message);
  const snackbarSeverity = useSelector((state) => state.snackbar.severity);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hide());
  };

  return (
    <Snackbar
      open={showSnackbar}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarSeverity}
        sx={{ width: '100%' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
