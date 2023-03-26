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

  let dataArray = []
  //incumbent, party, winner, party, loser, party

  // FILLING DATA ARRAY
  switch (true) {
    //forgive me
    //ohio 2020
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 1) : 
      dataArray = ["Steve Chabot", "R", "Steve Chabot", "R", "Kate Schroder", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 2) : 
      dataArray = ["Brad Wenstrup", "R", "Brad Wenstrup", "R", "Jaime Castle", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 3) : 
      dataArray = ["Joyce Beatty", "D", "Joyce Beatty", "D", "Mark Richardson", "R"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 4) : 
      dataArray = ["Jim Jordan", "R", "Jim Jordan", "R", "Shannon Freshour", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 5) : 
      dataArray = ["Robert Latta", "R", "Robert Latta", "R", "Nick Rubando", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 6) : 
      dataArray = ["Bill Johnson", "R", "Bill Johnson", "R", "Shawna Roberts", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 7) : 
      dataArray = ["Bob Gibbs", "R", "Bob Gibbs", "R", "Quentin Potter", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 8) : 
      dataArray = ["Warren Davidson", "R", "Warren Davidson", "R", "Vanessa Enoch", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 9) : 
      dataArray = ["Marcy Kaptur", "D", "Marcy Kaptur", "D", "Rob Weber", "R"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 10) : 
      dataArray = ["Michael Turner", "R", "Michael Turner", "R", "Desiree Tims", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 11) : 
      dataArray = ["Marcia Fudge", "D", "Marcia Fudge", "D", "Laverne Gore", "R"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 12) : 
      dataArray = ["Troy Balderson", "R", "Troy Balderson", "R", "Alaina Shearer", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 13) : 
      dataArray = ["Tim Ryan", "D", "Tim Ryan", "D", "Christina Hagan", "R"]; break;    
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 14) : 
      dataArray = ["David Joyce", "R", "David Joyce", "R", "Hillary Mueri", "D"]; break;    
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 15) : 
      dataArray = ["Steve Stivers", "R", "Steve Stivers", "R", "Joel Newby", "D"]; break;    
    case (store.currentState === "Ohio" && store.currentPlan  === "2020" && store.currentDistrict === 16) : 
      dataArray = ["Anthony Gonzalez", "R", "Anthony Gonzalez", "R", "Aaron Godfrey", "D"]; break;
    //ohio 2022
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 1) : 
      dataArray = ["Steve Chabot", "R", "Greg Landsman", "D", "Steve Chabot", "R"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 2) : 
      dataArray = ["Brad Wenstrup", "R", "Brad Wenstrup", "R", "Samantha Meadows", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 3) : 
      dataArray = ["Joyce Beatty", "D", "Joyce Beatty", "D", "Lee Stahley", "R"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 4) : 
      dataArray = ["Jim Jordan", "R", "Jim Jordan", "R", "Tamie Wilson", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 5) : 
      dataArray = ["Bob Latta", "R", "Bob Latta", "R", "Craig Swartz", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 6) : 
      dataArray = ["Bill Johnson", "R", "Bill Johnson", "R", "Louis Lyras", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 7) : 
      dataArray = ["Bob Gibbs", "R", "Max Miller", "R", "Matthew Diemer", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 8) : 
      dataArray = ["Warren Davidson", "R", "Warren Davidson", "R", "Vanessa Enoch", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 9) : 
      dataArray = ["Marcy Kaptur", "D", "Marcy Kaptur", "D", "JR Majewski", "R"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 10) : 
      dataArray = ["Michael Turner", "R", "Michael Turner", "R", "David Esrati", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 11) : 
      dataArray = ["Shontel Brown", "D", "Shontel Brown", "D", "Eric Brewer", "R"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 12) : 
      dataArray = ["Troy Balderson", "R", "Troy Balderson", "R", "Amy Rippel-Elton", "D"]; break;
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 13) : 
      dataArray = ["Anthony Gonzalez", "R", "Emilia Sykes", "D", "Madison Gesiotto", "R"]; break;    
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 14) : 
      dataArray = ["David Joyce", "R", "David Joyce", "R", "Matt Kilboy", "D"]; break;    
    case (store.currentState === "Ohio" && store.currentPlan  === "2022" && store.currentDistrict === 15) : 
      dataArray = ["Mike Carey", "R", "Mike Carey", "R", "Gary Josephson", "D"]; break;        
    //arizona 2020
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 1) : 
      dataArray = ["Tom O'Halleran", "D", "Tom O'Halleran", "D", "Tiffany Shedd", "R"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 2) : 
      dataArray = ["Ann Kirkpatrick", "D", "Ann Kirkpatrick", "D", "Brandon Martin", "R"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 3) : 
      dataArray = ["Raul Grijalva", "D", "Raul Grijalva", "D", "Daniel Wood", "R"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 4) : 
      dataArray = ["Paul Gosar", "R", "Paul Gosar", "R", "Delina Disanto", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 5) : 
      dataArray = ["Andy Biggs", "R", "Andy Biggs", "R", "Joan Greene", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 6) : 
      dataArray = ["David Schweikert", "R", "David Schweikert", "R", "Hiral Tipirneni", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 7) : 
      dataArray = ["Ruben Gallego", "D", "Ruben Gallego", "D", "Joshua Barnett", "R"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 8) : 
      dataArray = ["Debbie Lesko", "R", "Debbie Lesko", "R", "Michael Muscato", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2020" && store.currentDistrict === 9) : 
      dataArray = ["Greg Stanton", "D", "Greg Stanton", "D", "Dave Giles", "R"]; break;
    //arizona 2022
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 1) : 
      dataArray = ["David Schweikert", "R", "David Schweikert", "R", "Jevin Hodge", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 2) : 
      dataArray = ["Tom O'Halleran", "D", "Eli Crane", "R", "Tom O'Halleran", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 3) : 
      dataArray = ["Ruben Gallego", "D", "Ruben Gallego", "D", "Jeff Zink", "R"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 4) : 
      dataArray = ["Greg Stanton", "D", "Greg Stanton", "D", "Kelly Cooper", "R"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 5) : 
      dataArray = ["Andy Biggs", "R", "Andy Biggs", "R", "Javier Ramos", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 6) : 
      dataArray = ["Ann Kirkpatrick", "D", "Juan Ciscomani", "R", "Kirsten Engel", "D"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 7) : 
      dataArray = ["Raul Grijalva", "D", "Raul Grijalva", "D", "Luis Pozzolo", "R"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 8) : 
      dataArray = ["Debbie Lesko", "R", "Debbie Lesko", "R", "NONE", "X"]; break;
    case (store.currentState === "Arizona" && store.currentPlan  === "2022" && store.currentDistrict === 9) : 
      dataArray = ["Paul Gosar", "R", "Paul Gosar", "R", "NONE", "X"]; break;
    //colorado 2020
    case (store.currentState === "Colorado" && store.currentPlan  === "2020" && store.currentDistrict === 1) : 
      dataArray = ["Diana DeGette", "D", "Diana DeGette", "D", "Shane Bolling", "R"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2020" && store.currentDistrict === 2) : 
      dataArray = ["Joe Neguse", "D", "Joe Neguse", "D", "Charlie Winn", "R"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2020" && store.currentDistrict === 3) : 
      dataArray = ["Scott Tipton", "R", "Lauren Boebert", "R", "Diane Bush", "D"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2020" && store.currentDistrict === 4) : 
      dataArray = ["Ken Buck", "R", "Ken Buck", "R", "Ike McCorkle", "D"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2020" && store.currentDistrict === 5) : 
      dataArray = ["Doug Lamborn", "R", "Doug Lamborn", "R", "Jillian Freeland", "D"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2020" && store.currentDistrict === 6) : 
      dataArray = ["Jason Crow", "D", "Jason Crow", "D", "Steve House", "R"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2020" && store.currentDistrict === 7) : 
      dataArray = ["Ed Perlmutter", "D", "Ed Perlmutter", "D", "Casper Stockham", "R"]; break;
    //colorado 2022
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 1) : 
      dataArray = ["Diana DeGette", "D", "Diana DeGette", "D", "Jennifer Qualteri", "R"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 2) : 
      dataArray = ["Joe Neguse", "D", "Joe Neguse", "D", "Marshall Dawson", "R"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 3) : 
      dataArray = ["Lauren Boebert", "R", "Lauren Boebert", "R", "Adam Frisch", "D"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 4) : 
      dataArray = ["Ken Buck", "R", "Ken Buck", "R", "Ike McCorkle", "D"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 5) : 
      dataArray = ["Doug Lamborn", "R", "Doug Lamborn", "R", "David Torres", "D"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 6) : 
      dataArray = ["Jason Crow", "D", "Jason Crow", "D", "Steve Monahan", "R"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 7) : 
      dataArray = ["Ed Perlmutter", "D", "Brittany Pettersen", "D", "Erik Aadland", "R"]; break;
    case (store.currentState === "Colorado" && store.currentPlan  === "2022" && store.currentDistrict === 8) : 
      dataArray = ["OPEN", "X", "Yadira Caraveo", "D", "Barbara Kirkmeyer", "R"]; break;

    default: dataArray = ["Steve Chabot", "R", "Steve Chabot", "R", "Kate Schroder", "D"];
   }


  // DATA FOR DISTRICT PLAN SUMMARY
  let numDistricts = 0

  if (store.currentState == "Ohio")
  {
    if (store.currentPlan == "2020")
    {
      numDistricts = 16
    }
    else
    {
      numDistricts = 15
    }
  }
  else if (store.currentState == "Arizona" )
  {
    numDistricts = 9
  }
  else if (store.currentState == "Colorado")
  {
    if (store.currentPlan == "2020")
    {
      numDistricts = 7
    }
    else
    {
      numDistricts = 8
    }
  }

  // DATA TIDBITS
  let array = Array.from(Array(numDistricts), (_, index) => index + 1);


  let showMessage = ""
  if ((dataArray[0] != dataArray[2]) && (dataArray[0] != dataArray[4]) && (dataArray[0] != "OPEN"))
  {
    showMessage = "Incumbent not running for re-election in 2022."
  }

  let showPlan = store.currentPlan;
  if (store.currentPlan != "2020" && store.currentPlan != "2022")
  {
    showPlan = "2022"
  }


  return (
    <Container >
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
          {array.map((num) => (
            <MenuItem value={num}>{num}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box visibility={store.currentDistrict==null? "hidden": "visible"}>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 2}}>
          <b> Incumbent Name: </b> 
          <span style={ dataArray[1] === "R" ? {color: '#FF3131'} : dataArray[1] === "D" ? {color: '#0096FF'} : {color: 'white'}}>
              {dataArray[0]}
          </span>  <br/> <br/> 
          <b> {showPlan} Election Results: </b> <br/>
          <b> Winner: </b>
          <span style={ dataArray[3] === "R" ? {color: '#FF3131'} : dataArray[3] === "D" ? {color: '#0096FF'} : {color: 'white'}}>
              {dataArray[2]}
          </span> <br/>
          <b> Loser: </b> 
          <span style={ dataArray[5] === "R" ? {color: '#FF3131'} : dataArray[5] === "D" ? {color: '#0096FF'} : {color: 'white'}}>
          {dataArray[4]} 
          </span> <br/>
          <i> {showMessage} </i> <br/> <br/> 
          <b> 2020 vs 2022 District Details: </b> <br/>
        </Box>
        <DistrictTable/>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 2}}>
          <b> Demographic Details: </b> <br/> 
        Voting Age Population: 619,521 <br/>
        <DemographicDetails/>
        </Box>
      </Box>
    </Container>
  );
}