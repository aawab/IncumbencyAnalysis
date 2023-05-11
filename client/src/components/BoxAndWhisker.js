import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { useState } from 'react'
import { Container } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import Button from '@mui/material/Button'
import { Box } from '@mui/system';

//server sends the series 
function BoxAndWhiskerPlot(props) {

  const { store } = useContext(GlobalStoreContext);

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
            fontSize: '15px',
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

  let nameDictionary =
  {
      "geo": "Geometric Variation",
      "pop": "Population Variation"
  }
  boxplot.options.title.text= nameDictionary[props.type]

  switch(props.type) {
    case "geo":
      boxplot.series = store.ensembleInfo.geoVarGraph
      break;
    case "pop":
      boxplot.series = store.ensembleInfo.popVarGraph
      break;
    case "white":
      boxplot.series = store.ensembleInfo.whiteVarGraph
      break;
    case "black":
      boxplot.series = store.ensembleInfo.blackVarGraph
      break;  
    case "indian":
      boxplot.series = store.ensembleInfo.indianVarGraph
      break; 
    case "asian":
      boxplot.series = store.ensembleInfo.asianVarGraph
      break; 
    case "pacific":
      boxplot.series = store.ensembleInfo.hawaiianVarGraph
      break; 
    case "income":
      boxplot.series = store.ensembleInfo.incomeVarGraph
      break; 
    case "age":
      boxplot.series = store.ensembleInfo.ageVarGraph
      break; 
    default:
      boxplot.series = {}
  }
  

  return (
    <ReactApexChart 
          series={boxplot.series}
          options={boxplot.options}
          type="boxPlot"
          width="100%"
          height="100%">
    </ReactApexChart>
  )
}

export default BoxAndWhiskerPlot;