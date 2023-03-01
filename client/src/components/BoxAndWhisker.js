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
              y: [0.6, 0.75, 0.90, 1.3, 1.7]
            },
            {
              x: "District 2",
              y: [0.8, 0.95, 1.10, 1.5, 1.9]
            },
            {
            x: "District 3",
            y: [0.65, 0.75, 0.95, 1.4, 1.8]
            },
            {
            x: "District 4",
            y: [0.75, 0.85, 0.90, 1.4, 1.8]
            },
            {
            x: "District 5",
            y: [0.6, 0.70, 0.90, 1.1, 1.3]
        },
            {
            x: "District 6",
            y: [0.55, 0.93, 1.09, 1.24, 1.6]
            },
            {
            x: "District 7",
            y: [0.63, 0.71, 0.95, 1.2, 1.5]
            },
            {
            x: "District 8",
            y: [0.65, 0.70, 0.95, 1.4, 1.9]
            },
            {
            x: "District 9",
            y: [0.67, 0.76, 0.95, 1.4, 1.7]
        }]
    }]
  };

  return (
    <ReactApexChart
          series={boxplot.series}
          options={boxplot.options}
          type="boxPlot"
          width="100%"
          height="120%"
      ></ReactApexChart>
  )
}

export default BoxAndWhiskerPlot;