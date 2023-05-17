import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

//probably fixed sized of 10
//0-1%, 1%-2%, 2%-3%
let info = [0,60,20,19,1,0,0,0,0,0]
let actualRange = ""
let actual = 20.4

function xAxisCategories() //this should be the percentage range per group 
{
  let array = []
  for(let i = 0; i < 10; i++) 
  {
    array.push(10*i + "%-" + 10*(i+1) + "%")
    if (actual >= (10*i) && actual <= 10*(i+1) )
    {
      actualRange = 10*i + "%-" + 10*(i+1) + "%"
    }
  }
  return array
}

function IncumbentVariation(props) {

    let boxplot = {};
    boxplot = {
      series: [
        {
          name: 'Count of Percentages',
          data: info
        }
    ],
      options: {
        colors: ['#EE7600'],
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
          text: 'Incumbent Variation',
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
            text: "Percentages",
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
          position: 'top',
          horizontalAlign: 'center',
          offsetX: 40,
          labels: {
            colors: 'black',
          }
        },
        tooltip: {
          enabled: false
        },
        annotations: {
          xaxis: [
            {
              x: actualRange,
              borderColor: '#775DD0',
              label: {
                text: 'Actual: ' + actual + '%',
                borderWidth: 20,
                borderRadius: 1,
                offsetY: -50,
                borderColor: '#775DD0',
                textAnchor: 'middle',
                position: 'top',
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

    let nameDictionary =
    {
        "geo": "Incumbent Geometric Variation",
        "pop": "Incumbent Population Variation",
    }

    boxplot.options.title.text= nameDictionary[props.type]


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


export default IncumbentVariation;