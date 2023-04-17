import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import teamLogo from './img/white-dragon.png'

import InfoIcon from '@mui/icons-material/Info';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

function Topbar()
{
    const { store } = useContext(GlobalStoreContext);

    // CHANGE VIEWS BETWEEN ENSEMBLES AND MAP
    const changeView = (event) => {
        store.changeView();
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{bgcolor: '#0000'}}>
                <IconButton style={{marginRight: 'auto'}} onClick={changeView}>
                    <QueryStatsIcon></QueryStatsIcon>  <h1 style={{fontSize:'80%'}}>{store.view=="map"?"Ensembles":"Map"}</h1>
                </IconButton>
                <h1 style={{fontSize:'120%'}}>Incumbency Analysis</h1>
                <Box style={{ marginLeft: "auto" }}>
                    <img src={teamLogo} width={40} height={40} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar;