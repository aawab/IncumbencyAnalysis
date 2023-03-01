import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IncumbentTable from './IncumbentTable';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

export default function StateTab() {

  const { store } = useContext(GlobalStoreContext);

  /**For some reason, after already having selected a state, if you select from dropdown instead of clicking
   * on state from zoom out on map, then it goes back to original state if you click on any of the districts
   */

  const handleChange = (event) => {
    console.log("selector state " + event.target.value)
    // store.setState(event.target.value, false);
    store.setStateNoDistrict(event.target.value, false);
  };

  let chartStuff = {
    series: [{
      name: 'Democrat',
      data: [44]
    }, {
      name: 'Republican',
      data: [53]
    }, {
      name: 'Open Seats',
      data: [0, 12]
    }],
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
        categories: ["Safe Seats", "Open Seats"],
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

  return (
    <Container >
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
      {/*move this stuff to a separate window since this is ensemble summary*/}
      <Box display='none' sx={{ fontFamily: 'Arial', fontSize: '11', marginTop: 2, marginBottom: 2 }}>
        <h1>Ensemble Summary Data</h1>
        <b> Number of District Plans: </b> {"use store.currentState to get nums"} <br />
        <b> Number of Incumbents: </b> {"use store.currentState to get nums"} <br />
        <b> Incumbents Predicted to Win: </b> {"use store.currentState to get nums"} <br />
        <b> Average Geographic Variation in Incumbent Districts: </b> {"use store.currentState to get nums"} <br />
        <b> Average Population Variation in Incumbent Districts: </b> {"use store.currentState to get nums"} <br />
      </Box>
      {/*everything below this shud be district plan summary, e.g list of incumbents, num of districts, etc*/}
      <Box display={store.currentState == "" ? 'none' : 'block'}>
        <Box sx={{ fontFamily: 'Arial', fontSize: '11', marginTop: 2, marginBottom: 2 }} >
          <b> Number of Districts: </b> {"nums dependent on currentState and currentPlan"} <br />
          <b> Number of Incumbents: </b> {"nums dependent on currentState and currentPlan"} <br />
          <b> Incumbent District Variation: </b> {"nums dependent on currentState and currentPlan"} <br />
        </Box>
        <IncumbentTable ></IncumbentTable>
        <ReactApexChart
          options={chartStuff.options}
          series={chartStuff.series}
          type="bar"
          width="100%"
          height="80%"
        ></ReactApexChart>
      </Box>
    </Container>

  );
}
