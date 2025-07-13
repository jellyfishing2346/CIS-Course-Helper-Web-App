import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  School,
  Menu as MenuIcon,
  Person,
  Home,
  Schedule,
  CheckCircle
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Course Planner', path: '/planner', icon: <Schedule /> },
    { label: 'Prerequisites', path: '/prerequisites', icon: <CheckCircle /> },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <School sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CIS Course Helper
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                >
                  {item.icon}
                  <Box sx={{ ml: 1 }}>{item.label}</Box>
                </MenuItem>
              ))}
              {user ? (
                [
                  <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
                    <Person sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                ]
              ) : (
                <MenuItem component={Link} to="/auth" onClick={handleMenuClose}>
                  Login
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            ))}
            {user ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  startIcon={<Person />}
                >
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/auth">
                Login
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;