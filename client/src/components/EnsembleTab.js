import { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BoxAndWhisker from './BoxAndWhisker';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import EnsembleSplit from './EnsembleSplit';
import IncumbentTable from './IncumbentTable';
import IncumbentVariation from './IncumbentVariation';

function EnsembleTab() {

  const { store } = useContext(GlobalStoreContext);

  const handleState = (event) => {
    console.log("selector state " + event.target.value)
    store.setStateNoDistrict(event.target.value, false);
  };

  const handleDemographic = (event) => {
    store.setDemographic(event.target.value)
  };

  let demographicBox = <></>
  if (store.currentDemographic != "")
  {
    demographicBox = <BoxAndWhisker type = {store.currentGraph}></BoxAndWhisker>
  }

  let ensembleDetails = <></>
  if (store.currentState != "")
  {
    console.log(store.currentGraph)
    switch(store.currentGraph) {
        case "geo":
          ensembleDetails = <BoxAndWhisker type = "geo"></BoxAndWhisker>
          break;
        case "pop":
          ensembleDetails = <BoxAndWhisker type = "pop"></BoxAndWhisker>
          break;
        case "white":
          ensembleDetails = <BoxAndWhisker type = "white"></BoxAndWhisker>
          break;
        case "black":
          ensembleDetails =<BoxAndWhisker type = "black"></BoxAndWhisker>
          break;  
        case "indian":
          ensembleDetails =<BoxAndWhisker type = "indian"></BoxAndWhisker>
          break; 
        case "asian":
          ensembleDetails =<BoxAndWhisker type = "asian"></BoxAndWhisker>
          break; 
        case "pacific":
          ensembleDetails =<BoxAndWhisker type = "pacific"></BoxAndWhisker>
          break; 
        case "split":
          ensembleDetails = <EnsembleSplit></EnsembleSplit>
          break; 
        default:
          ensembleDetails =
          <Box sx={{fontFamily:'Arial', fontSize: '11', height: 'calc(40vh)', maxHeight: 'calc(40vh)'}}>
          <h1>Ensemble Summary Data</h1>
          <b> Number of District Plans: </b> {store.ensembleInfo.numDistrictPlans} <br/>
          <b> Number of Incumbents: </b> {store.ensembleInfo.numIncumbents} <br/>
          <b> Incumbents Predicted to Win: </b> {store.ensembleInfo.numIncumbentsPredictedToWin} <br/>
          <b> Average Geographic Variation in Incumbent Districts: </b> {store.ensembleInfo.avgGeoVar} <br/>
          <b> Average Population Variation in Incumbent Districts: </b> {store.ensembleInfo.avgPopVar} <br/>
          </Box>
    }
  }

  return (
        <Container sx={{height: "90%"}}>
            {ensembleDetails}
        </Container>
  );

}

export default EnsembleTab;