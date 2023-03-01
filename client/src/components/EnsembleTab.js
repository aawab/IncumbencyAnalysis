import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IncumbentTable from './IncumbentTable';
import BoxAndWhisker from './BoxAndWhisker';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

function EnsembleTab() {

  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event) => {
    console.log("selector state " + event.target.value)
    store.setStateNoDistrict(event.target.value, false);
  };

  return (
        <Container>
        <FormControl fullWidth>
        <InputLabel id="select-state-label">State</InputLabel>
        <Select
          labelId="select-state-label"
          id="select-state"
          value={store.currentState}
          label="State"
          onChange={handleChange}
        >
          <MenuItem value={"Arizona"}>Arizona</MenuItem>
          <MenuItem value={"Colorado"}>Colorado</MenuItem>
          <MenuItem value={"Ohio"}>Ohio</MenuItem>
        </Select>
      </FormControl>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 0, marginLeft: 43}}>
            <h1>Ensemble Summary Data</h1>
            <b> Number of District Plans: </b> {"1000"} <br/>
            <b> Number of Incumbents: </b> {"9"} <br/>
            <b> Incumbents Predicted to Win: </b> {"5"} <br/>
            <b> Average Geographic Variation in Incumbent Districts: </b> {"1.3"} <br/>
            <b> Average Population Variation in Incumbent Districts: </b> {"1.2"} <br/>
        </Box>
        <BoxAndWhisker></BoxAndWhisker>
        </Container>
  );

}

export default EnsembleTab;