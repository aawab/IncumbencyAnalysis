import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { GlobalStoreContext } from '../store'


import Box from '@mui/material/Box';

/*
    This React component functions as the HomeScreen, and will house the Leaflet map, 
    any appBanners we add, legends, basically everything we'll need.
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    return (
        <Box sx={{height:"110%", objectFit: 'contain'}}>
            test uwuwuwuwuuwuu
        </Box>
        
    )
}

export default HomeScreen;