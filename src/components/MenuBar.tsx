import React from 'react';
import { useNavigate } from 'react-router-dom'

//mui imports
import {
  AppBar, Box, Toolbar, Typography, Button
} from '@mui/material';


const MenuBar = () => {
    let navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ mr: 'auto'}}>
            PARKING SPACE ALLOCATION
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuBar;
