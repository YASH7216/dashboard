import React from 'react';
import { Link, Typography, Box, InputBase, IconButton } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="space-between" 
      style={{ padding: '10px 20px', backgroundColor: '#f5f5f5' }}
    >
      {/* Left side: Home and Dashboard */}
      <Box display="flex" alignItems="center">
        <Link underline="hover" color="inherit" href="/" style={{ marginRight: '8px' }}>
          Home
        </Link>
        <Typography color="textPrimary" style={{ margin: '0 8px' }}>
          &gt;
        </Typography>
        <Typography color="textPrimary">
          Dashboard
        </Typography>
      </Box>

      {/* Right side: Search bar, Notification bell, and Profile icon */}
      <Box display="flex" alignItems="center">
        <Box 
          component="form" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginRight: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '2px 4px'
          }}
        >
          <InputBase
            placeholder="Search…"
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton type="submit" sx={{ p: '10px' }}>
            <Search />
          </IconButton>
        </Box>

        <IconButton sx={{ marginRight: '16px' }}>
          <Notifications />
        </IconButton>

        <IconButton>
          <AccountCircle />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
