import { Fragment, useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { getChannelLists } from '../api/apiChannelList';

const ChannelLists = () => {
  const [allChannelLists, setAllChannelLists] = useState([]);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    // load all channel lists
    loadAllChannelLists();
  }, []);

  const loadAllChannelLists = () => {
    getChannelLists().then((res) => {
      setAllChannelLists(res.data);
    });
  };

  const handleGenerate = (event, id) => {
    console.log('Channellist ID: ', id);

    // with the channellist id we can get all relevant channel info
    const selectedChannelList = allChannelLists.find((item) => item._id === id);

    // console.log(selectedChannelList);

    const outputArray = selectedChannelList.channels.map((channel, index) => {
      return {
        number: index + 1,
        name: channel.name,
        uri: `${channel.protocol}://${channel.multicast}:${channel.port}`,
        id: channel.name.substring(0, 15).toUpperCase().replace(/ /g, ''),
        channelType: 'TV',
        image: `image/${channel.image.originalName}`,
      };
    });

    setPreview(JSON.stringify(outputArray, null, 2));
  };

  const handleClearPreview = () => {
    setPreview('');
  };

  const handleSaveToDisk = () => {
    if (preview) {
      let blob = new Blob([preview], { type: 'application/json' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'channel_list.json';
      a.click();
    } else {
      return;
    }
  };

  return (
    <Fragment>
      <Typography component='div' variant='h6'>
        All channel lists
      </Typography>
      {/* {JSON.stringify(allChannelLists)} */}
      <Box maxWidth='lg'>
        <Grid container spacing={7}>
          <Grid item lg={4}>
            {allChannelLists &&
              allChannelLists.map((channellist) => (
                <Card
                  sx={{
                    width: '100%',
                    margin: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                  key={channellist._id}
                  raised
                >
                  <CardContent>
                    <Typography gutterBottom variant='h6' component='div'>
                      {channellist.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      # channels: {channellist.channels.length}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      flexGrow: 1,
                      alignItems: 'flex-end',
                      width: '100%',
                    }}
                  >
                    <Button size='small' color='error' onClick={null}>
                      Delete
                    </Button>
                    <Button
                      size='small'
                      onClick={(e) => handleGenerate(e, channellist._id)}
                    >
                      Generate
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </Grid>
          <Grid item lg={8}>
            <TextField
              id='generated-json'
              label='Channel File Preview'
              multiline
              rows={25}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={preview}
            />

            <Button
              color='warning'
              variant='outlined'
              sx={{ marginTop: '8px', marginRight: '8px' }}
              disabled={!preview}
              onClick={handleClearPreview}
            >
              Clear Preview
            </Button>

            <Button
              color='success'
              variant='outlined'
              sx={{ marginTop: '8px' }}
              disabled={!preview}
              onClick={handleSaveToDisk}
            >
              Save to disk
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ChannelLists;
