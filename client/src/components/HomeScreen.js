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
        <Box>
            <Topbar />
            <EnsembleTab></EnsembleTab>
        </Box>
       ); 
    }
    return (
        <Box >
            <Topbar />
            <Grid container direction="row">
                <Grid item xs={4.5}>
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
