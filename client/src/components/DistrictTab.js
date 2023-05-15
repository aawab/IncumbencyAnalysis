import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DistrictTable from './DistrictTable';
import DemographicDetails from './DemographicDetails';
import { Box } from '@mui/system';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Container, Grid } from '@mui/material';
import { IconButton} from '@mui/material';

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
    if ((district.incumbent.name != district.winner.name) && (district.incumbent.name != district.loser.name))
    {
      showMessage = "Incumbent not running for re-election in 2022."
    }
    districtDetails =
    <>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 2}}>
          <b> Incumbent Name: </b> 
          <span style={ district.incumbent.party === "R" ? {color: '#FF3131'} : district.incumbent.party === "D" ? {color: '#0096FF'} : {color: 'white'}}>
              {district.incumbent.name}
          </span>  <br/> 
          <i> {showMessage} </i> <br/> <br/> 
          <b> {store.currentPlan} Election Results: </b> <br/>
          {"Winning Candidate: "} 
          <span style={ district.winner.party === "R" ? {color: '#FF3131'} : district.winner.party === "D" ? {color: '#0096FF'} : {color: 'white'}}>
              {district.winner.name}
          </span> <br/>
          {"Losing Candidate: "} 
          <span style={ district.loser.party === "R" ? {color: '#FF3131'} : district.loser.party === "D" ? {color: '#0096FF'} : {color: 'white'}}>
          {district.loser.name} 
          </span> <br/> <br/> 
          <b> 2020 vs {store.currentPlan} District Details: </b> <br/>
        </Box>
        <DistrictTable/>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 2}}>
          <b> Demographic Details: </b> <br/> 
        <DemographicDetails/>
        </Box>
    </>
  }

  return (
    <Box>
      <Grid container>
       <Grid xs={11} item>
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
       </Grid>
        <Grid xs={1} item sx={{position:'relative'}}>
          <IconButton sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} onClick={ () =>{ store.resetState();}} disabled={store.currentDistrict==null}>
            <RestartAltIcon fontSize='large'></RestartAltIcon>
          </IconButton>
        </Grid>
      </Grid>


      <Box>
        {districtDetails}
      </Box>
    </Box>
  );
}