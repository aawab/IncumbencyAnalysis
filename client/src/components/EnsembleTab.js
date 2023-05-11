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
  console.log(store.currentDemographic)
  if (store.currentDemographic != "")
  {
    demographicBox = <BoxAndWhisker type = {store.currentDemographic}></BoxAndWhisker>
  }

  useEffect(() => {
    //PAN TO STATE AFTER SELECTION
    store.setEnsemble();
  }, [store.currentState]);
  console.log(store.ensembleInfo)

  let ensembleDetails = <></>
  if (store.currentState != "" && store.ensembleInfo != null)
  {
    ensembleDetails = 
    <>
            <Box sx={{fontFamily:'Arial', fontSize: '11', height: 'calc(40vh)', maxHeight: 'calc(40vh)'}}>
              {/* <h1>Ensemble Summary Data</h1>
              <b> Number of District Plans: </b> {store.ensembleInfo.numDistrictPlans} <br/>
              <b> Number of Incumbents: </b> {store.ensembleInfo.numIncumbents} <br/>
              <b> Incumbents Predicted to Win: </b> {store.ensembleInfo.numIncumbentsPredictedToWin} <br/>
              <b> Average Geographic Variation in Incumbent Districts: </b> {store.ensembleInfo.avgGeoVar} <br/>
              <b> Average Population Variation in Incumbent Districts: </b> {store.ensembleInfo.avgPopVar} <br/> */}
              {/* <BoxAndWhisker type = "geo"></BoxAndWhisker> */}
              {/* <BoxAndWhisker type = "pop"></BoxAndWhisker>
              <Box>
                <span id = "chartTitle"> Demographic Variation </span>
                <FormControl fullWidth sx={{marginTop: 2, marginBottom: 2}}>
                <InputLabel id="select-demographic-label">Demographic</InputLabel>
                  <Select
                    labelId="select-demographic-label"
                    id="select-demographic"
                    value={store.currentDemographic}
                    label="Demographic"
                    onChange={handleDemographic}
                    sx={{fontSize:'20px', fontWeight: 'bold'}}>
                    <MenuItem value={"white"}>White</MenuItem>
                    <MenuItem value={"black"}>Black or African American	</MenuItem>
                    <MenuItem value={"indian"}>American Indian and Alaska Native</MenuItem>
                    <MenuItem value={"asian"}>Asian</MenuItem>
                    <MenuItem value={"pacific"}>Native Hawaiian and Other Pacific Islander	</MenuItem>
                    <MenuItem value={"income"}>Income</MenuItem>
                    <MenuItem value={"age"}>Age</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {demographicBox}
              // <EnsembleSplit></EnsembleSplit> */}
              <EnsembleSplit></EnsembleSplit>
              {/* <IncumbentVariation></IncumbentVariation> */}
            </Box>
    </>
  }

  return (
        <Container>
            {ensembleDetails}
        </Container>
  );

}

export default EnsembleTab;