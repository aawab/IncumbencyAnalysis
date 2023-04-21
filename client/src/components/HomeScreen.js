import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import Map from './Map';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import FilterToolbar from './FilterToolbar';
import { GlobalStoreContext } from '../store';
import EnsembleTab from './EnsembleTab';
import { DivIcon } from 'leaflet';
import { calendarPickerClasses } from '@mui/lab';

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
            <div style={{top: "0px", position: "fixed", overflow: "hidden", width: "100%", zIndex: 2}}>
                <Topbar> </Topbar>
            </div>
            <Box style={{maxHeight: '100vh', marginTop: "75px"}}>
                <EnsembleTab style={{height: '100vh', overflowY: 'scroll'}}/>
            </Box>
        </Box>
       ); 
    }
    return (
        <Box style={{maxHeight: '100vh', overflow: 'hidden'}}>
            <Topbar />
            <Grid container direction="row" style={{maxHeight: '100vh', minHeight: '100vh'}}>
                <Grid item xs={4.5} style={{height: 'calc(100vh - 48px)', overflow: 'auto'}}>
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
