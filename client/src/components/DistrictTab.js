import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DistrictTable from './DistrictTable';
import DemographicDetails from './DemographicDetails';
import { Container } from '@mui/system';
import { Box } from '@mui/system';

export default function DistrictTab() {

  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event) => {
    store.setDistrict(event.target.value);
  };

  let numDistrictArray = Array.from(store.stateInfo.districts, (_, index) => index + 1);
  let showMessage = ""
  let district = store.stateInfo.districts[store.currentDistrict-1]
  let districtDetails = <></>

  if (store.currentDistrict != null && store.stateInfo != null)
  {
    districtDetails =
    <>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 2}}>
          <b> Incumbent Name: </b> 
          <span style={ district.incumbent.party === "R" ? {color: '#FF3131'} : district.incumbent.party === "D" ? {color: '#0096FF'} : {color: 'white'}}>
              {district.incumbent.name}
          </span>  <br/> <br/> 
          <b> {store.currentPlan} Election Results: </b> <br/>
          {"Winner: "} 
          <span style={ district.winner.party === "R" ? {color: '#FF3131'} : district.winner.party === "D" ? {color: '#0096FF'} : {color: 'white'}}>
              {district.winner.name}
          </span> <br/>
          {"Loser: "} 
          <span style={ district.loser.party === "R" ? {color: '#FF3131'} : district.loser.party === "D" ? {color: '#0096FF'} : {color: 'white'}}>
          {district.loser.name} 
          </span> <br/>
          <i> {showMessage} </i> <br/> <br/> 
          <b> 2020 vs {store.currentPlan} District Details: </b> <br/>
        </Box>
        <DistrictTable/>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 2}}>
          <b> Demographic Details: </b> <br/> 
        Voting Age Population: 619,521 <br/>
        <DemographicDetails/>
        </Box>
    </>
      if ((district.incumbent.name != district.winner.name) && (district.incumbent.name != district.loser.name))
      {
        showMessage = "Incumbent not running for re-election in 2022."
      }
  }

  return (
    <Box >
      <FormControl fullWidth>
        <InputLabel id="select-district-label">District</InputLabel>
        <Select
          labelId="select-district-label"
          id="select-district"
          value={store.currentDistrict}
          label="District"
          onChange={handleChange}
          sx={{fontSize:'20px', fontWeight: 'bold'}}
        >
          {numDistrictArray.map((num) => (
            <MenuItem value={num}>{num}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
          {districtDetails}
      </Box>
    </Box>
  );
}