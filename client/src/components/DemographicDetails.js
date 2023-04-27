import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { useState } from 'react'
import { Container } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import Button from '@mui/material/Button'
import { Box } from '@mui/system';


function DemographicDetails() 
{
  const { store } = useContext(GlobalStoreContext);

    let district = store.stateInfo.districts[store.currentDistrict-1]
    let demographicDetailsGraph = {};

    demographicDetailsGraph = {
      options: {
        chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ["White", ["Black or", "African American"], ["American Indian", "Alaska Native"], "Asian", ["Native Hawaiian", "and Other", "Pacific Islander"], "Other race"],
          labels: {
            style: {
              colors: '#FFFFFF',
            }
          },
          title: {
            text: "Voting Age Population (%)",
            style: {
              color: '#FFFFFF'
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
    <Box>
      <ReactApexChart 
          series={district.demographicGraph}
          options={demographicDetailsGraph.options}
          type="bar"
          width="105%"
          height="auto"> {/* 500 */}
      </ReactApexChart>
    </Box>
  )

}
export default DemographicDetails;