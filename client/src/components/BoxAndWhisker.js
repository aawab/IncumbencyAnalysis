import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { Container } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

function BoxAndWhiskerPlot() {

    let boxplot = {
        options : {
        chart: {
            type: "boxPlot"
          }
        },
          series: [{
            type: 'boxPlot',
            data: [{
              x: "District 1",
              y: [40, 51.98, 56.29, 59.59, 63.85]
            },
            {
              x: "District 2",
              y: [43.66, 44.99, 51.35, 52.95, 59.42]
            },
            {
            x: "District 3",
            y: [43.66, 44.99, 51.35, 52.95, 59.42]
        }]
    }]
  };

  return (
    <ReactApexChart
          series={boxplot.series}
          options={boxplot.options}
      ></ReactApexChart>
  )
}

export default BoxAndWhiskerPlot;