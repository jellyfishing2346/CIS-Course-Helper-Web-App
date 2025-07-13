import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { School, Person, ExitToApp } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static">
      <Toolbar>
        <School sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          CIS Course Helper
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ 
              mx: 1,
              bgcolor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Home
          </Button>
          {user && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/planner')}
                sx={{ 
                  mx: 1,
                  bgcolor: isActive('/planner') ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                Course Planner
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/prerequisites')}
                sx={{ 
                  mx: 1,
                  bgcolor: isActive('/prerequisites') ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                Prerequisites
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Welcome, {user.firstName}
              </Typography>
              <Avatar
                sx={{ cursor: 'pointer', bgcolor: 'secondary.main' }}
                onClick={handleUserMenuOpen}
              >
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleUserMenuClose(); }}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => navigate('/auth')}
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
