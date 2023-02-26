import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import * as d3 from "d3";

export default function DistrictTab() {

  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event) => {
    store.setDistrict(event.target.value);
  };

  return (
    <Container >
      <FormControl fullWidth>
        <InputLabel id="select-district-label">District</InputLabel>
        <Select
          labelId="select-district-label"
          id="select-district"
          value={store.district}
          label="District"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{marginTop: 2, marginBottom: 2}}>
          <b> Name of Representative, </b> Name here <br/> 
          <b> 2022 Election Results: </b> Info here <br/>
          <b> 2020 vs 2022 District Details: </b> <br/>
          Probably another table here
      </Box>
    </Container>
      
  );
}