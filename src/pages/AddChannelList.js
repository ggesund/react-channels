import { useState, useEffect, Fragment } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { getAllChannels } from '../api/apiChannel';

import { addChannelList } from '../api/apiChannelList';

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

const AddChannelList = () => {
  // state for channels loaded from DB
  const [loadedChannels, setLoadedChannels] = useState([]);

  // channels available for selection
  const [availableChannels, setAvailableChannels] = useState([]);

  // selected channels
  const [selectedChannels, setSelectedChannels] = useState([]);

  // name of list
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

  // we have to initialise some states for DnD
  const [isDragging, setIsDragging] = useState(false); // check, if we are currently dragging
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [draggedTo, setDraggedTo] = useState(null);
  const [updatedList, setUpdatedList] = useState([]);

  useEffect(() => {
    loadAllChannels();
    setSelectedChannels([]);
  }, []);

  const loadAllChannels = () => {
    getAllChannels()
      .then((res) => {
        setLoadedChannels(res.data);
        setAvailableChannels(res.data);
      })
      .catch((err) => {
        console.log('Can not load channels');
      });
  };

  const handleListItemClickAvailable = (event, id) => {
    // wenn man auf ein List Item klickt
    // 1. Entferne das Item vom Array (available)
    // 2. F??ge das Item in Array selected ein

    // finde item mit id im array der verf??gbaren Channels
    let foundItem = availableChannels.find((item) => {
      if (item._id === id) {
        return true;
      }

      return false;
    });

    // wenn ein item gefunden -> add to selected array
    setSelectedChannels((oldValue) => [...oldValue, foundItem]);

    // and remove from available array
    setAvailableChannels(availableChannels.filter((item) => item._id !== id));

    // console.log('Item gefunden: ', foundItem);
  };

  const handleListItemClickSelected = (event, id) => {
    let foundItem = selectedChannels.find((item) => {
      if (item._id === id) {
        return true;
      }
      return false;
    });

    // add to available channel list
    setAvailableChannels((oldValue) => [...oldValue, foundItem]);

    // remove from selected channel list
    setSelectedChannels(selectedChannels.filter((item) => item._id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form submitted');

    const newChannelList = {
      name: listName,
      description: listDescription,
      channels: selectedChannels.map((item) => item._id),
    };

    addChannelList(newChannelList);

    resetForm();
  };

  const handleNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setListDescription(event.target.value);
  };

  const resetChannels = () => {
    setAvailableChannels(loadedChannels);
    setSelectedChannels([]);
  };

  const handleResetForm = () => {
    resetForm();
  };

  const resetForm = () => {
    setAvailableChannels(loadedChannels);
    setSelectedChannels([]);
    setListDescription('');
    setListName('');
  };

  const onDragStartHandler = (event) => {
    // beim Starten des DnD Vorgangs speichern wir die Position des zu bewegende ListItems
    const initialPosition = Number(event.currentTarget.dataset.position);

    setIsDragging(true);
    setDraggedFrom(initialPosition);
  };

  const onDragOverHandler = (event) => {
    event.preventDefault();

    // store the selectedList in a variable
    let newList = selectedChannels;

    // index of the item beeing dragged
    const draggedFromPosition = draggedFrom;

    // index of the drop area being hovered
    const draggedToPosition = Number(event.currentTarget.dataset.position);

    // get the element that's at the position of "draggedFrom"
    const itemDragged = newList[draggedFromPosition];

    // filter out the item being dragged
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFromPosition
    );

    // update the list
    newList = [
      ...remainingItems.slice(0, draggedToPosition),
      itemDragged,
      ...remainingItems.slice(draggedToPosition),
    ];

    // since this event fires many times
    // we check if the targets are actually
    // different:
    if (draggedToPosition !== draggedTo) {
      setUpdatedList(newList);
      setDraggedTo(draggedToPosition);
    }
  };

  const onDropHandler = (event) => {
    setSelectedChannels(updatedList);
    setIsDragging(false);
    setDraggedFrom(false);
    setDraggedTo(false);
  };

  return (
    <Fragment>
      <Typography variant='h5' component='div' sx={{ marginBottom: '20px' }}>
        Create Channel List
      </Typography>
      <Box component='form' onSubmit={handleSubmit} maxWidth='sm'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='channellist-name'
              label='List name'
              variant='standard'
              fullWidth
              onChange={handleNameChange}
              color='success'
              name='name'
              value={listName}
              required
            />
            <TextField
              id='channellist-description'
              label='Short description'
              variant='standard'
              fullWidth
              onChange={handleDescriptionChange}
              color='success'
              name='description'
              rows={3}
              multiline
              value={listDescription}
              required
              sx={{ marginBottom: '20px' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          {/* Liste aller verf??baren Kan??le */}
          <Grid item xs={4}>
            <Typography variant='caption' component='div'>
              Available Channels
            </Typography>
            <List
              sx={{
                width: '100%',
                maxWidth: 200,
                bgcolor: 'background.paper',
                maxHeight: '400px',
                overflow: 'auto',
                marginTop: '10px',
              }}
              dense
            >
              {loadedChannels &&
                availableChannels.sort(sort).map((channel) => (
                  <ListItem
                    alignItems='flex-start'
                    divider
                    key={channel._id}
                    sx={{ padding: 0, margin: 0 }}
                  >
                    <ListItemButton
                      onClick={(e) =>
                        handleListItemClickAvailable(e, channel._id)
                      }
                    >
                      <ListItemText
                        primary={channel.name}
                        secondary={channel.multicast}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Grid>
          {/* Liste aller ausgew??hlten Kan??le */}
          <Grid item xs={4}>
            <Typography variant='caption' component='div'>
              Selected Channels
            </Typography>
            <List
              sx={{
                width: '100%',
                maxWidth: 200,
                bgcolor: 'background.paper',
                maxHeight: '400px',
                overflow: 'auto',
                marginTop: '10px',
              }}
              dense
            >
              {selectedChannels &&
                selectedChannels.map((channel, index) => (
                  <ListItem
                    alignItems='flex-start'
                    divider
                    key={channel._id}
                    draggable
                    onDragStart={onDragStartHandler}
                    onDragOver={onDragOverHandler}
                    onDrop={onDropHandler}
                    data-position={index}
                  >
                    <ListItemButton
                      onClick={(e) =>
                        handleListItemClickSelected(e, channel._id)
                      }
                    >
                      <ListItemText
                        primary={channel.name}
                        secondary={channel.multicast}
                        sx={{ cursor: 'move' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='caption' component='div'>
              &nbsp;
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                height: '400px',
              }}
            >
              <Button
                startIcon={<ClearOutlinedIcon />}
                type='button'
                variant='outlined'
                color='error'
                sx={{
                  marginBottom: '12px',
                  justifyContent: 'flex-start',
                  width: '75%',
                }}
                onClick={handleResetForm}
              >
                Reset
              </Button>
              <Button
                startIcon={<ClearOutlinedIcon />}
                type='button'
                variant='outlined'
                color='warning'
                sx={{
                  marginBottom: '12px',
                  justifyContent: 'flex-start',
                  width: '75%',
                }}
                onClick={resetChannels}
              >
                Unselect
              </Button>
              <Button
                startIcon={<CheckOutlinedIcon />}
                type='submit'
                variant='outlined'
                sx={{
                  width: '75%',
                  justifyContent: 'flex-start',
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default AddChannelList;
