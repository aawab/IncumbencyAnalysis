import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IncumbentTable from './IncumbentTable';
import { Container } from '@mui/system';
import { Box } from '@mui/system';

export default function StateTab() {

  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event) => {
    store.setState(event.target.value);
  };

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel id="select-state-label">State</InputLabel>
        <Select
          labelId="select-state-label"
          id="select-state"
          value={store.state}
          label="State"
          onChange={handleChange}
        >
          <MenuItem value={"AZ"}>Arizona</MenuItem>
          <MenuItem value={"CO"}>Colorado</MenuItem>
          <MenuItem value={"OH"}>Ohio</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{fontFamily:'Arial', fontSize: '11'}}>
            <b> Number of District Plans: </b> {"use store.state to get nums"} <br/> 
            <b> Number of Incumbents: </b> {"use store.state to get nums"} <br/>
            <b> Incumbents Predicted to Win: </b> {"use store.state to get nums"} <br/>
            <b> Average Geographic Variation in Incumbent Districts: </b> {"use store.state to get nums"} <br/>
            <b> Average Population Variation in Incumbent Districts: </b> {"use store.state to get nums"} <br/>
        </Box>
      <IncumbentTable></IncumbentTable> 
    </Container>
      
  );
}