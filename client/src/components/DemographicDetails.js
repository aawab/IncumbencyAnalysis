import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import ReactApexChart from 'react-apexcharts';
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
          height: 430,
          toolbar: {
            show: false
          }
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
            colors: ["black"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["black"]
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ["White", ["Black or", "African American"], ["American Indian", "Alaska Native"], "Asian", ["Native Hawaiian", "and Other", "Pacific Islander"], "Other race"],
          labels: {
            style: {
              colors: "black",
            }
          },
          title: {
            text: "Population (%)",
            style: {
              color: "black"
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: "black",
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
            colors: "black"
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
          width="100%"
          height="auto">
      </ReactApexChart>
    </Box>
  )

}
export default DemographicDetails;