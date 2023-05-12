import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import teamLogo from './img/white-dragon.png'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Topbar()
{
    const { store } = useContext(GlobalStoreContext);

    return (
        <AppBar position="static">
            <Toolbar sx={{bgcolor: '#0000'}}>
                <Box style={{ marginRight: "auto"}}>
                    <img src={teamLogo} width={40} height={40} />
                </Box>
                <h1 style={{fontSize:'120%', position: "absolute", left: "50%", transform: 'translate(-50%,0)'}}>Incumbency Analysis</h1>
                <IconButton onClick={ () =>{ store.reset();}} style={{marginLeft: 'auto'}} disabled={store.currentState==""}>
                <   RestartAltIcon></RestartAltIcon> <h1 style={{fontSize:'80%'}}>RESET</h1>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar;