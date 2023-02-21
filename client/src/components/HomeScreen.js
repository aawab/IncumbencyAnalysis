import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { GlobalStoreContext } from '../store'
import Map from './Map'
import Box from '@mui/material/Box';

/*
    This React component functions as the HomeScreen, and will house the Leaflet map,
    any appBanners we add, legends, basically everything we'll need.
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    return (
        <Box sx={{ height: "50%" }}>
            <Map />
        </Box>

    )
}

export default HomeScreen;
