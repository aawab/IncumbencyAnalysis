import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Map from './Map';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import FilterToolbar from './FilterToolbar';
import { GlobalStoreContext } from '../store';
import EnsembleTab from './EnsembleTab';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectGraph from './SelectGraph';

/*
    This React component functions as the HomeScreen, and will house the Leaflet map,
    any appBanners we add, legends, basically everything we'll need.
*/
const HomeScreen = () => {


    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.getStates()
    }, [])

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

    let topRightBox = ""
    if (store.currentState == "Arizona" || store.currentState == "Colorado")
    {
      topRightBox = "Redistricting Influenced By: Neutral"
    }
    else if(store.currentState == "Ohio")
    {
      topRightBox = "Redistricting Influenced By: Republican"
    }

    return (
        <Box>
            <div style={{top: "0px", position: "fixed", overflow: "hidden", width: "100%", zIndex: 2}}>
                <Topbar> </Topbar>
            </div>
        <Grid spacing={0} container>
        <Grid style = {{maxHeight: 'calc(100vh - 64px)', marginTop: '64px'}} xs={4.5} item>
          <Sidebar></Sidebar>
        </Grid>
        <Grid style = {{height: 'calc(100vh - 64px)', marginTop: '64px'}}  xs={7.5} item>
          <Grid spacing={0} direction="column" container>
            <Grid style = {{height: 'calc(45vh)', maxHeight: 'calc(45vh)', position:'relative'}}item>
            <Map></Map>
            <FilterToolbar></FilterToolbar>
            <Box sx={{ position: 'absolute', top: '0px', right: '0px', background: '#202124', opacity: 0.8, boxShadow:2, color:"white"  }}>
               {topRightBox}
            </Box>
            <Box sx={{ position: 'absolute', bottom: '0px', left: '0px', background: '#202124', opacity: 0.8, boxShadow:2  }}>
              <FormControlLabel sx={{color:"white"}} control={<Checkbox checked={store.displayIncumbentMap} onClick={() => store.setDisplayIncumbentMap(!store.displayIncumbentMap)}/>} label="Show only incumbent districts" />
            </Box>
            </Grid>
            <Grid style = {{height: 'calc(10vh)', maxHeight: 'calc(5vh)'}} item>
              <SelectGraph></SelectGraph>
            </Grid>
            <Grid style = {{height: 'calc(45vh)', maxHeight: 'calc(45vh)', overflowY: 'auto'}}item>
              <EnsembleTab></EnsembleTab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Box>
    )
}

export default HomeScreen;
