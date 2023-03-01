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

  // SELECT A DISTRICT
  const selectDistrict = (event) => {
    store.setStateNoDistrict(event.target.value, false);
  };

  // OPTIONS FOR BAR CHART
  let chartStuff = {
    series: [{
      name: 'Democrat',
      data: [4]
    }, {
      name: 'Republican',
      data: [1]
    }, {
      name: 'Open Seats',
      data: [0, 3]
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
          onChange={selectDistrict}
        >
          <MenuItem value={"Arizona"}>Arizona</MenuItem>
          <MenuItem value={"Colorado"}>Colorado</MenuItem>
          <MenuItem value={"Ohio"}>Ohio</MenuItem>
        </Select>
      </FormControl>
      <Box display={store.currentState == "" ? 'none' : 'block'}>
        <Box sx={{ fontFamily: 'Arial', fontSize: '11', marginTop: 2, marginBottom: 2 }} >
          <b> Number of Districts: </b> {"8"} <br />
          <b> Number of Incumbents: </b> {"8"} <br />
          <b> Incumbent District Variation: </b> {"0.9"} <br />
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
