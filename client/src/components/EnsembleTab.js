import { useContext } from 'react';
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

  let demographicBox = ""
  if (store.currentDemographic != null)
  {
    demographicBox = <BoxAndWhisker type = {store.currentDemographic}></BoxAndWhisker>
  }

  return (
        <Container>
          <FormControl fullWidth>
            <InputLabel id="select-state-label">State</InputLabel>
            <Select
              labelId="select-state-label"
              id="select-state"
              value={store.currentState}
              label="State"
              onChange={handleState}
              sx={{fontSize:'20px', fontWeight: 'bold'}}>
              <MenuItem value={"Arizona"}>Arizona</MenuItem>
              <MenuItem value={"Colorado"}>Colorado</MenuItem>
              <MenuItem value={"Ohio"}>Ohio</MenuItem>
            </Select>
          </FormControl>
          <Box visibility={store.currentState== null ? "hidden": "visible"}> 
            <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 0, marginLeft: 0}}>
              <h1>Ensemble Summary Data</h1>
              <b> Number of District Plans: </b> {"10000"} <br/>
              <b> Number of Incumbents: </b> {"9"} <br/>
              <b> Incumbents Predicted to Win: </b> {"5"} <br/>
              <b> Average Geographic Variation in Incumbent Districts: </b> {"1.3"} <br/>
              <b> Average Population Variation in Incumbent Districts: </b> {"1.2"} <br/>
              <BoxAndWhisker type = "geo"></BoxAndWhisker>
              <BoxAndWhisker type = "pop"></BoxAndWhisker>
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
              <EnsembleSplit></EnsembleSplit>
              <IncumbentVariation></IncumbentVariation>
            </Box>
          </Box>
        </Container>
  );

}

export default EnsembleTab;