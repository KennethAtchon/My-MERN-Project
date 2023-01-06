import React, {useEffect, useState} from 'react';
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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainListItems } from './ListItems';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProtectedRoute } from '../auth/index';
import { createRequest } from '../actions/requests/SendReqActions';
import { persistor } from '../store';

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





const mdTheme = createTheme();

function DashboardContent(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recipient, setRecipient ] = useState('');
  const [reason, setReason ] = useState('');
  const [error, setError ] = useState('');


  // if the user signs up or signs up 
  const { user, userUp } = props;
  let mainuser = user != null ? user : userUp;

  useEffect(() => {  

    if(user == null && userUp == null) navigate('/signin');
  
    getProtectedRoute().then(response => {
      console.log("Success");
      
    }).catch(error => {
      console.log(error);
      
      navigate('/signin');
  
    })
  
  }, [navigate, user, userUp])
  
  
  const [open, setOpen] = React.useState(true);

  const handleSubmit = e => {
   
    dispatch(createRequest(mainuser.email,recipient,reason)).then(() => {
      // Sign in was successful, clear the error message
      
      
      
      setError("Success! Sent the user request.")
    })
    .catch(error => {
      // There was an error signing in, display an error message
      setError('That user does not exist!');
    });
  };
  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  function handleLogout() {
    localStorage.removeItem('jwt');
    
    persistor.purge();
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
              Welcome, { mainuser.username}
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

          <Typography variant="h6" color="primary" sx={{ mb: 2, fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>
  Send Requests
</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="recipient"
              label="Recipient"
              name="recipient"
              value={recipient}
              helperText={error}
              onChange={e => setRecipient(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="reason"
              label="Request Reason"
              id="reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
              helperText={error}
              autoFocus
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Request
            </Button>

            
          </Box>
        

          

            <Copyright sx={{ pt: 40 }} />
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