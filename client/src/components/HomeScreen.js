import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Map from './Map';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import FilterToolbar from './FilterToolbar';
import { GlobalStoreContext } from '../store';
import EnsembleTab from './EnsembleTab';

/*
    This React component functions as the HomeScreen, and will house the Leaflet map,
    any appBanners we add, legends, basically everything we'll need.
*/
const HomeScreen = () => {

    const { store } = useContext(GlobalStoreContext);

    if (store.view === "ensemble")
    {
       return (
            <Box style={{maxHeight: '100vh', overflow: 'hidden'}}>
                <Topbar />
                <EnsembleTab style={{maxHeight: '100vh', overflow: 'scroll'}}/>
            </Box>
       ); 
    }
    return (
        <Box style={{maxHeight: '100vh', overflow: 'hidden'}}>
            <Topbar />
            <Grid container direction="row" style={{maxHeight: '100vh', minHeight: '100vh'}}>
                <Grid item xs={4.5} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Sidebar />
                </Grid>
                <Grid item xs >
                    <Map />
                </Grid>
            </Grid>
            <FilterToolbar></FilterToolbar>
        </Box>
    )
}

export default HomeScreen;
