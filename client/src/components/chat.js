import React , {useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainListItems } from './ListItems';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { ListItem, ListItemText } from '@mui/material';

import {connect, useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProtectedRoute } from '../auth/index';
import { addMessage } from '../actions/AddMessage';
import { getMessage } from '../actions/chatActions';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})
(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


function Chatbubble({ message, sender, main }) {
  return (
    <ListItem >
      <ListItemText
        primary={message}
        primaryTypographyProps={{
          variant: 'body1',
          style: {
            borderRadius: '16px',
            backgroundColor: sender === main ? '#F44336' : '#2196F3',
            color: '#fff',
            padding: '8px 16px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          },
        }}
      />
    </ListItem>
  );
}


const mdTheme = createTheme();

function DashboardContent(props) {

  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {user, userUp  } = props;

  let mainuser = user != null ? user : userUp;

  const chats = useSelector(state => state.message.messages);
  // when the user first joins, chats should be either null or chats.sender equal to mainuser.email
  

  const [messages, setMessages] = React.useState(chats ? chats.messages: []);
  const [message, setMessage] = React.useState('');


  const recipient = chats ? chats.recipient : '';


useEffect(() => {  


  if(mainuser == null) navigate('/signin');    

  getProtectedRoute().then(response => {
    console.log("Success");
    
  }).catch(error => {
    console.log(error);
    
    navigate('/signin');

  })

}, [mainuser, navigate])


  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSend = (event) => {
    event.preventDefault();

    dispatch(addMessage(chats.sender, chats.recipient, message)).then(() => {

      
    dispatch(getMessage(chats.sender, chats.recipient)).then(() => {

      console.log(chats);

      setMessages([...messages, { text: message, sender: chats.sender }]);

      navigate('/chat');
      

    }).catch(error => {
      
    });
      

    }).catch(error => {
      
    });


    // Clear the message field
    setMessage('');

  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    
    // Redirect the user to the login page
    
    navigate('/signin');
    
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Welcome, {mainuser.username}
            </Typography>


            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />


          {/* CONTAINER */}
          <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }} style={{ height: '80%'}} >

          <Typography variant="h6"  sx={{ mb: 2, fontSize: '2rem', fontWeight: 'bold', textAlign: 'center',
          color: recipient === '' ?  '#F44336' : 'primary'
        }}>

  Chatting with {recipient}
</Typography>


          <Paper style={{ height: '500px', overflow: 'auto' }}>

        <List> 
          {messages.map((message) => (
            < Chatbubble message={message.text} sender={message.sender} main={mainuser.email} />
          ))}
        </List>
      </Paper>


          <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <TextField
          margin="normal"
          fullWidth
          id="send"
          label="Send"
          name="send"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          autoFocus
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleSend}>
          <SendIcon />
        </Button>
        
      </Grid>
    </Grid>

            <Copyright sx={{ pt: 1 }} />
          </Container>



        </Box>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userUp: state.userUp.user,
  };
};

const ConnectedDashboardContent = connect(mapStateToProps)(DashboardContent);

export default function Dashboard() {
  return <ConnectedDashboardContent />;
}