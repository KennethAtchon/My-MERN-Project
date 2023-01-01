import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const mainListItems = (
  <React.Fragment>

    <ListItemButton href="/chat">
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItemButton>
    
    <ListItemButton href="friends">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Friends" />
    </ListItemButton>

    <ListItemButton href="sendrequest">
      <ListItemIcon>
        <ArrowCircleRightIcon />
      </ListItemIcon>
      <ListItemText primary="Send Requests" />
    </ListItemButton>


    <ListItemButton href="acceptrequest">
      <ListItemIcon>
        <CheckCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Accept Requests" />
    </ListItemButton>

  </React.Fragment>
);
