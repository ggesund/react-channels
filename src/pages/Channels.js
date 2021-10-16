import { Fragment, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getAllChannels } from '../api/apiChannel';
import { IconButton, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'label',
    numeric: false,
    disablePadding: false,
    label: 'Label',
  },
  {
    id: 'multicast',
    numeric: false,
    disablePadding: false,
    label: 'Multicast',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Logo',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

// function, um die Elemente des Arrays zu sortieren
// Input sind Strings

const sort = (a, b) => {
  let nameA = a.name.toUpperCase();
  let nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const Channels = (props) => {
  const [allChannels, setAllChannels] = useState([]);

  useEffect(() => {
    loadAllChannels();
  }, []);

  const loadAllChannels = () => {
    getAllChannels()
      .then((res) => {
        // console.log(res);

        if (res.status === 'ok') {
          setAllChannels(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const channelDeleteHandler = (id) => {
    console.log('Delete channel with id', id);
  };

  const channelEditHandler = (id) => {
    console.log('Edit channel with id', id);
  };

  const channelInfoHandler = (id) => {
    console.log('Info for channel with id', id);
  };

  const tableHead = () => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((item) => (
            <TableCell key={item.id}>{item.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <Fragment>
      <Typography variant='h5' component='div' sx={{ marginBottom: '20px' }}>
        All Channels
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          {tableHead()}
          <TableBody>
            {allChannels.sort(sort).map((channel) => (
              <TableRow key={channel._id}>
                <TableCell>{channel.name}</TableCell>
                <TableCell>{channel.label}</TableCell>
                <TableCell>{channel.multicast}</TableCell>
                <TableCell>{channel.image.originalName}</TableCell>
                <TableCell>
                  <IconButton
                    color='error'
                    onClick={() => channelDeleteHandler(channel._id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => channelEditHandler(channel._id)}
                  >
                    <ModeEditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color='secondary'
                    onClick={() => channelInfoHandler(channel._id)}
                  >
                    <InfoOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default Channels;
