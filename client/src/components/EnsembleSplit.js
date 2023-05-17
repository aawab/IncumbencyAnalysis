import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts';


function xAxisCategories(info)
{
  let array = []
  for(let i = 0; i < info.length; i++) 
  {
    array.push(i + "/" + (info.length-i-1))
  }
  return array
}

function arrayPercentageRepublican(info)
{
  let array = []
  for(let i = 0; i < info.length; i++) 
  {
    array.push(Math.round(info[i] * (i/(info.length-1))));
  }
  return array
}

function arrayPercentageDemocrat(info)
{
  let array = []
  for(let i = 0; i < info.length; i++) 
  {
    array.push(Math.round(info[i] * (((info.length-1) - i)/(info.length-1))));
  }
  return array
}

function EnsembleSplit() {
  const { store } = useContext(GlobalStoreContext);

  //[0R/14D,1R/13D,2R/12D,...]
  let info = [0,0,0,0,3,5,321,2431,4999,2240,197,123,123,123,123]
  // R/D
  let actualSplit = "8/6" 
  if (store.currentState == "Arizona")
  {
    info = [0,0,0,0,5,24,49,22,0,0]
    actualSplit = "6/3"
  }
  if (store.currentState == "Ohio")
  {
    info = [0,0,0,0,0,0,0,0,0,18,51,30,1,0,0,0]
    actualSplit = "10/5"
  }
  if (store.currentState == "Colorado")
  {
    info = [0,0,10,71,18,0,0,0,0]
    actualSplit = "3/5"
  }

    let boxplot = {};
    boxplot = {
      series: [
        {
          name: '# of Republican Representatives',
          data: arrayPercentageRepublican(info)
        },
        {
          name: '# of Democrat Representatives',
          data: arrayPercentageDemocrat(info)
        }
    ],
      options: {
        colors: ['#de2f2f','#0585de'],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              total: {
                enabled: true,
                formatter: function(value, { seriesIndex, dataPointIndex, w })
                {
                  return value
                },
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: 'black'
                }
              }
            },
          },
        },
        stroke: {
          width: 1,
          colors: ['black']
        },
        title: {
          text: 'Republican/Democratic splits',
          style: {
            color: 'black',
            fontSize: "20px"
          }
        },
        subtitle: {
          text: '⠀',
          style: {
            fontSize: "35px"
          }
        },
        xaxis: {
          categories: xAxisCategories(info),
          title: {
            text: "Republican/Democratic split (R/D)",
            style: {
              color: 'black',
              fontSize: '18px',
              fontWeight: 'bold'
            }
          },
          labels: {
            style: {
              colors: 'black',
              fontSize: '16px',
              fontWeight: 'bold'
            }
          }
        },
        yaxis: {
          title: {
            text: "Count",
            style: {
              color: 'black',
              fontSize: '18px',
              fontWeight: 'bold'
            }
          },
          labels: {
            style: {
              colors: 'black',
              fontSize: '16px',
              fontWeight: 'bold'
            }
          }
        },
        dataLabels: {
          formatter: function(value, { seriesIndex, dataPointIndex, w })
            {
              if (seriesIndex === 0)
                return dataPointIndex
              else
                return (info.length-1) - dataPointIndex
            },
        },
        legend: {
          fontSize: "18px",
          position: 'bottom',
          horizontalAlign: 'center',
          offsetX: 40,
          labels: {
            colors: 'black'
          }
        },
        tooltip: {
          enabled: false
        },
        annotations: {
          xaxis: [
            {
              x: actualSplit,
              borderColor: '#775DD0',
              fillColor: '#775DD0',
              label: {
                text: 'Actual Split',
                borderWidth: 20,
                borderRadius: 1,
                borderColor: '#775DD0',
                textAnchor: 'middle',
                position: 'top',
                offsetY: -50,
                orientation: 'horizontal',
                style: {
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white'
              },
              }
            }
          ]
        }
      },
    };


  

  return (
    <ReactApexChart 
          series={boxplot.series}
          options={boxplot.options}
          type="bar"
          width="100%"
          height="100%">
    </ReactApexChart>
  )

}


export default EnsembleSplit;