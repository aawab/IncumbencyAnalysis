import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { useState } from 'react'
import { Container } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import Button from '@mui/material/Button'
import { Box } from '@mui/system';

//server sends the series 
function BoxAndWhiskerPlot(props) {

    let boxplot = {};
    boxplot.options = {
          plotOptions: {
            boxPlot: {
              colors: {
                upper: '#36DA45',
                lower: '#84F074'
              }
            }
          },
        chart: {
            type: "boxPlot"
          },
          colors: ['#cc30ff'],
          stroke: {
            colors: ['#FFFFFF']
          },
          dataLabels: {
            colors: '#FFFFFF',
            style: {
              fontSize: '13px',
              fontWeight: 'bold'
            }
          },
          legend: {
            customLegendItems: ["Incumbent"],
            labels: {
              colors: '#FFFFFF'
            }
          },
          xaxis: {
            labels: {
              style: {
                colors: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 'bold'
              }
            },
            title: {
              text: "District #",
              style: {
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 'bold'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 'bold'
              }
            },
            title: {
              text: "Variation",
              style: {
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 'bold'
              }
            }
          },
          title: {
            text: 'Geometric Variation',
            style: {
              color: '#FFFFFF',
              fontSize: "20px"
            }
          },
        }
    if (props.type === 'geo')
    {
      boxplot.series = 
          [{
            name: 'Data',
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
      },
    {
        name : 'Incumbent',
        color : '#cc30ff',
        type : 'scatter',
        data : [
            {
                x: "District 1",
                y: 1.9
            },
            {
                x: "District 2",
                y: 1.8
            },
            {
                x: "District 3",
                y: 1.9
            },
            {
                x: "District 4",
                y: 1.9
            },
            {
                x: "District 5",
                y: 1.4
            },
            {
                x: "District 6",
                y: 1.9
            },
            {
                x: "District 7",
                y: 1.9
            },
            {
                x: "District 8",
                y: 1.9
            },
            {
                x: "District 9",
                y: 1.9
            }
        ]
    }]
    }
    else if (props.type === "pop") 
    {
      boxplot.series= 
      [{
            type: 'boxPlot',
            data: [{
              x: "District 1",
              y: [0.4, 0.55, 0.70, 1.1, 1.4]
            },
            {
              x: "District 2",
              y: [1.1, 1.25, 1.30, 1.35, 1.4]
            },
            {
            x: "District 3",
            y: [0.60, 0.70, 1.00, 1.6, 1.7]
            },
            {
            x: "District 4",
            y: [0.40, 0.60, 0.85, 1.2, 1.7]
            },
            {
            x: "District 5",
            y: [0.67, 0.75, 1.1, 1.3, 1.5]
        },
            {
            x: "District 6",
            y: [0.58, 0.97, 1.20, 1.25, 1.5]
            },
            {
            x: "District 7",
            y: [0.75, 0.9, 0.98, 1.3, 1.6]
            },
            {
            x: "District 8",
            y: [0.75, 0.83, 0.93, 1.2, 1.5]
            },
            {
            x: "District 9",
            y: [0.73, 0.81, 0.87, 1.3, 1.6]
        }]
    },
    {
        name : 'Incumbent',
        color : '#cc30ff',
        type : 'scatter',
        data : [
            {
                x: "District 1",
                y: 1.6
            },
            {
                x: "District 2",
                y: 1.7
            },
            {
                x: "District 3",
                y: 1.7
            },
            {
                x: "District 4",
                y: 1.4
            },
            {
                x: "District 5",
                y: 1.7
            },
            {
                x: "District 6",
                y: 1.7
            },
            {
                x: "District 7",
                y: 1.8
            },
            {
                x: "District 8",
                y: 1.5
            },
            {
                x: "District 9",
                y: 1.6
            }
        ]
    }]
    }
    else //server just sends the series to everything
    {
      boxplot.series = 
      [{
        name: 'Data',
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
  },
{
    name : 'Incumbent',
    color : '#cc30ff',
    type : 'scatter',
    data : [
        {
            x: "District 1",
            y: 1.9
        },
        {
            x: "District 2",
            y: 1.8
        },
        {
            x: "District 3",
            y: 1.9
        },
        {
            x: "District 4",
            y: 1.9
        },
        {
            x: "District 5",
            y: 1.4
        },
        {
            x: "District 6",
            y: 1.9
        },
        {
            x: "District 7",
            y: 1.9
        },
        {
            x: "District 8",
            y: 1.9
        },
        {
            x: "District 9",
            y: 1.9
        }
    ]
    }]
    }

  let nameDictionary =
  {
      "geo": "Geometric Variation",
      "pop": "Population Variation"
  }
  boxplot.options.title.text= nameDictionary[props.type]

  return (
    <Box>
        {/* <Button variant="geo" sx={{color: 'black', backgroundColor: 'yellow', width: 105, m: 2}} onClick={() => setComparator("geo")}>Geometric Variation</Button>
        <Button variant="pol" sx={{color: 'black', backgroundColor: 'cyan', width: 105}} onClick={() => setComparator("pol")}>Population Variation</Button>
        <Button variant="pol" sx={{color: 'black', backgroundColor: 'green', width: 105}} onClick={() => setComparator("demo")}>Demographic Variation</Button> */}
    <ReactApexChart 
          series={boxplot.series}
          options={boxplot.options}
          type="boxPlot"
          width="100%"
          height={500}>
    </ReactApexChart>
    </Box>
  )
}

export default BoxAndWhiskerPlot;