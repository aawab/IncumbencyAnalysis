import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IncumbentTable from './IncumbentTable';
import { Box } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import Button from '@mui/material/Button'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Container, Grid } from '@mui/material';
import { IconButton} from '@mui/material';



export default function StateTab() {

  const { store } = useContext(GlobalStoreContext);

  // SELECT A DISTRICT
  const selectState = (event) => {
    store.setState(event.target.value);
  };

  // OPTIONS FOR BAR CHART
  let safeSeatGraph = {
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        }
      },
      colors: ['#0096FF', '#FF3131'],
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: 'black'
              }
            }
          }
        },
      },
      xaxis: {
        categories: ["Safe Seats", "Competitive Seats"],
        labels: {
          style: {
            colors: 'black',
          }
        },
        title: {
          text: "Number of Incumbents",
          style: {
            color: 'black',
            fontSize: '13px',
            fontWeight: 'bold'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: 'black',
            fontSize: '13px',
            fontWeight: 'bold'
          }
        },
      },
      dataLabels: {
        style: {
          fontSize: '13px',
          fontWeight: 'bold'
        }
      },
      title: {
        text: 'Safe Seats Graph',
        style: {
          color: 'black',
          fontSize: "20px"
        }
      },
      subtitle: {
        text: 'Actual or predicted victory margin greater than 10% are considered safe.',
        style: {
          color: 'black',
          fontSize: "14px"
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetX: 40,
        labels: {
          colors: 'black'
        }
      }
    },
  };


  let stateDetails = <></>
  if (store.currentState != "" && store.stateInfo != null)
  {
    let safeGraph = <></>
    if (store.currentPlan != "2020")
    {
      console.log(store.stateInfo.safeSeatGraph)

      if(store.currentState == "Ohio")
      {
        store.stateInfo.safeSeatGraph = [{
          name: 'Democrats',
          data: [2, 1]
        }, {
          name: 'Republicans',
          data: [8, 2]
        }]
      }
      if(store.currentState == "Colorado")
      {
        store.stateInfo.safeSeatGraph = [{
          name: 'Democrats',
          data: [3, 0]
        }, {
          name: 'Republicans',
          data: [1, 2]
        }]
      }
      if(store.currentState == "Arizona")
      {
        store.stateInfo.safeSeatGraph = [{
          name: 'Democrats',
          data: [2, 2]
        }, {
          name: 'Republicans',
          data: [2, 2]
        }]
      }


      safeGraph = 
      <ReactApexChart
        options={safeSeatGraph.options}
        series={store.stateInfo.safeSeatGraph}
        type="bar"
        width="100%"
        height={350}
      ></ReactApexChart>
    }
    stateDetails =
    <>
      <Box sx={{ fontFamily: 'Arial', fontSize: '11', marginTop: 2, marginBottom: 2 }} >
        <b> Number of Districts: </b> {(store.stateInfo.districts).length} <br />
        <b> Number of Incumbents: </b> {store.stateInfo.numIncumbents} <br />
        {/* <b> Incumbent District Variation: </b> {store.stateInfo.incumbentDistrictVariation} <br /> */}
      </Box>
      <IncumbentTable ></IncumbentTable>
      {safeGraph}
    </>
  }

  return (
    <Box>
      <Grid container>
       <Grid xs={11} item>
       <FormControl fullWidth>
        <InputLabel id="select-state-label">State</InputLabel>
        <Select
          labelId="select-state-label"
          id="select-state"
          value={store.currentState}
          label="State"
          onChange={selectState}
          sx={{fontSize:'20px', fontWeight: 'bold', width: "100%"}}>
          <MenuItem value={"Arizona"}>Arizona</MenuItem>
          <MenuItem value={"Colorado"}>Colorado</MenuItem>
          <MenuItem value={"Ohio"}>Ohio</MenuItem>
        </Select>
      </FormControl>
       </Grid>
        <Grid xs={1} item sx={{position:'relative'}}>
          <IconButton sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} onClick={ () =>{ store.resetState();}} disabled={store.currentDistrict==""}>
            <RestartAltIcon fontSize='large'></RestartAltIcon>
          </IconButton>
        </Grid>
      </Grid>


      <Box>
        {stateDetails}
      </Box>
    </Box>

  );
}
