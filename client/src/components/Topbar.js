import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import { AppBar, IconButton, Toolbar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

function Topbar()
{
    const { store } = useContext(GlobalStoreContext);

    const changeView = (event) => {

        if (store.view === "ensemble"){
            store.setView("map");
        }
        else{
            store.setView("ensemble");
        }
      };
    return (
        <AppBar position="static">
            <Toolbar sx={{bgcolor: '#0000'}}>
                <IconButton style={{marginRight: 'auto'}} onClick={changeView}>
                    <QueryStatsIcon></QueryStatsIcon>  <h1 style={{fontSize:'80%'}}>Ensembles</h1>
                </IconButton>
                <h1 style={{fontSize:'120%'}}>Redistricting Simulator</h1>
                <IconButton style={{ marginLeft: "auto" }}>
                <InfoIcon> </InfoIcon>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar;