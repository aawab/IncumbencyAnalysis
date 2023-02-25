import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import { Box } from '@mui/system';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';

function Topbar()
{
    const { store } = useContext(GlobalStoreContext);
    
    function toggleSidebar() 
    {
        store.setSidebarStatus(!store.sidebarOpen)
    }    

    return (
        <AppBar position="static">
            <Toolbar sx={{bgcolor: '#3d5a80'}} variant="dense">
                <IconButton onClick={toggleSidebar} style={{ marginRight: "auto" }}>
                    <MenuIcon> </MenuIcon>
                </IconButton>
                REDISTRICTING SIMULATOR
                <IconButton style={{ marginLeft: "auto" }}>
                <InfoIcon> </InfoIcon>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar;