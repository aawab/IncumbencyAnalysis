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
      colors: ['#0096FF', '#FF3131', '#cccccc'],
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
                color: '#FFFFFF'
              }
            }
          }
        },
      },
      xaxis: {
        categories: ["Safe Seats", "Unsafe Seats"],
        labels: {
          style: {
            colors: '#FFFFFF',
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 'bold'
          }
        }
      },
      dataLabels: {
        style: {
          fontSize: '13px',
          fontWeight: 'bold'
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetX: 40,
        labels: {
          colors: '#FFFFFF'
        }
      }
    },
  };

  let stateDetails = <></>
  if (store.currentState != "" && store.stateInfo != null)
  {
    stateDetails =
    <>
      <Box sx={{ fontFamily: 'Arial', fontSize: '11', marginTop: 2, marginBottom: 2 }} >
        <b> Number of Districts: </b> {store.stateInfo.numIncumbents} <br />
        <b> Number of Incumbents: </b> {store.stateInfo.numIncumbents} <br />
        <b> Incumbent District Variation: </b> {store.stateInfo.incumbentDistrictVariation} <br />
      </Box>
      <IncumbentTable ></IncumbentTable>
      {/* <ReactApexChart
        options={safeSeatGraph.options}
        series={store.stateInfo.safeSeatGraph}
        type="bar"
        width="100%"
        height="100%"
      ></ReactApexChart> */}
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
          <IconButton sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} onClick={ () =>{ store.resetState();}} disabled={store.currentDistrict==null}>
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
