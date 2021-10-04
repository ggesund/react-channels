// import { useHistory, useLocation, Link } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const drawerWidth = 240;

export default function Layout(props) {
  const [selectedItem, setSelectedItem] = useState('');

  // const location = useLocation();

  const handleListItemClick = (itemKey, event) => {
    setSelectedItem(itemKey);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Settop Channel Management{' '}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem
              button
              key='dashboard'
              // onClick={() => history.push("/")}
              component={Link}
              to='/'
              onClick={(e) => handleListItemClick('dashboard', e)}
              selected={selectedItem === 'dashboard'}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key='allchannels'
              component={Link}
              to='/channels'
              onClick={(e) => handleListItemClick('allchannels', e)}
              selected={selectedItem === 'allchannels'}
            >
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary='All Channels' />
            </ListItem>
            <ListItem
              button
              key='addchannel'
              component={Link}
              to='/add-channel'
              onClick={(e) => handleListItemClick('addchannel', e)}
              selected={selectedItem === 'addchannel'}
            >
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary='Add Channel' />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
