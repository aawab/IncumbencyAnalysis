import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { useState } from 'react'
import { Container } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import Button from '@mui/material/Button'

function DemographicDetails() 
{
  const { store } = useContext(GlobalStoreContext);


    let barplot = {};

    barplot = {
          
      series: [{
        name: "2020",
        data: [49, 25, 3, 11, 5, 7]
      }, {
        name: store.currentPlan,
        data: [58, 20, 3, 7, 5, 7]
      }],
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
    <Container>
      <ReactApexChart 
          series={barplot.series}
          options={barplot.options}
          type="bar"
          width="105%"
          height={500}> {/* 500 */}
      </ReactApexChart>
    </Container>
  )

}
export default DemographicDetails;