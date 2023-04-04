import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

let info = [500,0,0,0,3,5,321,2431,4312,2731,197,123,123,123,123]

function xAxisCategories(info)
{
  let array = []
  for(let i = 0; i < info.length; i++) 
  {
    array.push(i + "/" + (info.length-i-1))
  }
  console.log(array)
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
        colors: [
          function ({ value, seriesIndex, dataPointIndex, w }) {
            if (seriesIndex === 0) //republican
            {
              if (dataPointIndex === 8) //contains real split
              {
                return '#de2f2f'
              }
              return '#fb6767'
            }
            else //democrat
            {
              if (dataPointIndex === 8) //contains real split
              {
                return '#0585de'
              }
              return '#89CFF0'
            }
          }
        ],
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
                  color: '#FFFFFF'
                }
              }
            },
          },
        },
        // fill: {
        //   type: 'pattern',
        //   pattern: {
        //     style: function(value, { seriesIndex, dataPointIndex, w })
        //       {
        //         return ["verticalLines"]
        //       }
        //   }
        // },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: 'Republican/Democratic Splits',
          style: {
            color: '#FFFFFF',
            fontSize: "20px"
          }
        },
        xaxis: {
          categories: xAxisCategories(info),
          title: {
            text: "Republican/Democratic split (R/D)",
            style: {
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 'bold'
            }
          },
          labels: {
            // formatter: function (val) {
            //   return val + "K"
            // },
            style: {
              colors: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 'bold'
            }
          }
        },
        yaxis: {
          title: {
            text: "Count",
            style: {
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 'bold'
            }
          },
          labels: {
            style: {
              colors: '#FFFFFF',
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
          // style: {
          //   fontSize: "18px"
          // }
        },
        legend: {
          fontSize: "18px",
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
          customLegendItems: ["# of Republican Representatives", "# of Democrat Representatives", "Actual Split of 2022 Election", "Actual Split of 2022 Election"],
          markers: {
            fillColors: ['#fb6767', '#89CFF0', '#de2f2f', '#0585de'],
          },
          labels: {
            colors: '#FFFFFF',
          }
        },
        tooltip: {
          enabled: false
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