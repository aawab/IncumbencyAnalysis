import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Map from './Map';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/*
    This React component functions as the HomeScreen, and will house the Leaflet map,
    any appBanners we add, legends, basically everything we'll need.
*/
const HomeScreen = () => {

    return (
        <Box >
            <Topbar />
            <Grid container direction="row">
                <Grid item xs={5} >
                    <Sidebar />
                </Grid>
                <Grid item xs >
                    <Map />
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomeScreen;
