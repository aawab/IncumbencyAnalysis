import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IncumbentTable from './IncumbentTable';
import { Box } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

export default function StateTab() {

  const { store } = useContext(GlobalStoreContext);

  // SELECT A DISTRICT
  const selectState = (event) => {
    store.setStateNoDistrict(event.target.value, false);
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
      <ReactApexChart
        options={safeSeatGraph.options}
        series={store.stateInfo.safeSeatGraph}
        type="bar"
        width="100%"
        height="100%"
      ></ReactApexChart>
    </>
  }

  return (
    <Box >
      <FormControl fullWidth>
        <InputLabel id="select-state-label">State</InputLabel>
        <Select
          labelId="select-state-label"
          id="select-state"
          value={store.currentState}
          label="State"
          onChange={selectState}
          sx={{fontSize:'20px', fontWeight: 'bold'}}
        >
          <MenuItem value={"Arizona"}>Arizona</MenuItem>
          <MenuItem value={"Colorado"}>Colorado</MenuItem>
          <MenuItem value={"Ohio"}>Ohio</MenuItem>
        </Select>
      </FormControl>
      <Box>
        {stateDetails}
      </Box>
    </Box>

  );
}
