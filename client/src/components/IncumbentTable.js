import { useContext, useEffect, useState, Fragment } from 'react';
import { GlobalStoreContext } from '../store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from "@mui/material/TablePagination";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AppBar, Toolbar } from '@mui/material';


function IncumbentTable() {
  const { store } = useContext(GlobalStoreContext);
  const [incumbentFilter, setIncumbentFilter] = useState(false)

  const toggle = () =>{
    setIncumbentFilter(!incumbentFilter);
  }

  useEffect(() => {
    if(store.currentDistrict === null)
    {
      store.setIncumbentTablePage(0)
    }
    else
    {
      store.setIncumbentTablePage(Math.floor((store.currentDistrict-1)/5))
    }
  }, [store.currentDistrict]);

  // CHANGE THE INCUMBENT TABLE PAGE
  const handleChangePage = (event, newPage) => {
    store.setIncumbentTablePage(newPage);
  };

  // SELECT A DISTRICT FROM TABLE AND SHOW DETAILS
  function clickDistrict(districtNum)
  {
    store.setDistrictAndChangeTab(districtNum)
  }

  let table = ""
  let data = store.stateInfo.districts
  let sample = []
  for (let item in data)
  {
    if (incumbentFilter)
    {
      if (data[item].incumbent.name == data[item].winner.name || data[item].incumbent.name == data[item].loser.name)
      {
        if (store.currentPlan == "2020" || store.currentPlan == "2022")
        {
          console.log(data[item].incumbent)
          sample.push({districtNum: data[item].number, 
            detail:[
              {"candidate": data[item].winner.name, "result": "W", "incumbent": data[item].incumbent.name == data[item].winner.name, "party": data[item].winner.party, "popvar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.popVar.toFixed(1)) + "%" : "", "geovar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.geoVar.toFixed(1)) + "%" : ""}, 
            {"candidate": data[item].loser.name, "result": "L", "incumbent": data[item].incumbent.name == data[item].loser.name, "party": data[item].loser.party, "popvar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.popVar.toFixed(1)) + "%" : "", "geovar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.geoVar.toFixed(1)) + "%": ""}
          ]})
        }
        else
        {
          sample.push({districtNum: data[item].number, 
            detail:[
              {"candidate": data[item].winner.name, "result": "W", "incumbent": data[item].incumbent.name == data[item].winner.name, "party": data[item].winner.party, "popvar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.popVar.toFixed(1))+ "%" : "", "geovar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.geoVar.toFixed(1))+ "%" : "", "estVote": String(data[item].winner.votePercent.toFixed(1)) + "%"}, 
            {"candidate": data[item].loser.name, "result": "L", "incumbent": data[item].incumbent.name == data[item].loser.name, "party": data[item].loser.party, "popvar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.popVar.toFixed(1)) + "%": "", "geovar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.geoVar.toFixed(1)) + "%": "", "estVote": String(data[item].loser.votePercent.toFixed(1)) + "%" }
          ]})
        }
      }
    }
    else
    {
      if (store.currentPlan == "2020" || store.currentPlan == "2022")
      {
        sample.push({districtNum: data[item].number, 
          detail:[
            {"candidate": data[item].winner.name, "result": "W", "incumbent": data[item].incumbent.name == data[item].winner.name, "party": data[item].winner.party, "popvar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.popVar.toFixed(1))+ "%" : "", "geovar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.geoVar.toFixed(1))+ "%" : ""}, 
          {"candidate": data[item].loser.name, "result": "L", "incumbent": data[item].incumbent.name == data[item].loser.name, "party": data[item].loser.party, "popvar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.popVar.toFixed(1)) + "%": "", "geovar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.geoVar.toFixed(1)) + "%": ""}
        ]})
      }
      else
      {
        sample.push({districtNum: data[item].number, 
          detail:[
            {"candidate": data[item].winner.name, "result": "W", "incumbent": data[item].incumbent.name == data[item].winner.name, "party": data[item].winner.party, "popvar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.popVar.toFixed(1))+ "%" : "", "geovar": data[item].incumbent.name == data[item].winner.name ? String(data[item].incumbent.geoVar.toFixed(1))+ "%" : "", "estVote": String(data[item].winner.votePercent.toFixed(1)) + "%"}, 
          {"candidate": data[item].loser.name, "result": "L", "incumbent": data[item].incumbent.name == data[item].loser.name, "party": data[item].loser.party, "popvar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.popVar.toFixed(1)) + "%": "", "geovar": data[item].incumbent.name == data[item].loser.name ? String(data[item].incumbent.geoVar.toFixed(1)) + "%": "", "estVote": String(data[item].loser.votePercent.toFixed(1)) + "%" }
        ]})
      }
    }
  }
  console.log(sample)

  if (store.currentPlan == "2020" || store.currentPlan == "2022") //not an interesting plan
  {
    table =
    <Box>
              <AppBar sx={{bgcolor: "#272727"}} position="static">
            <Toolbar sx={{bgcolor: '#0000'}}>
                <Box style={{ marginRight: "auto"}}>
                <h3> {store.currentPlan} District Details</h3>
                </Box>
                <Box style={{marginLeft: 'auto'}}>
                  <FormControlLabel control={<Switch onChange={toggle} size="small"/>} label="Only incumbents"/>
                </Box>
            </Toolbar>
        </AppBar>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ padding: 1}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: "9%"}} align="center"><b>District</b></TableCell>
            <TableCell sx={{width: "1%"}} align="center"><b>Party</b></TableCell>
            <TableCell sx={{width: "50%"}} align="left"><b>Candidate</b></TableCell>
            <TableCell sx={{width: "10%"}} align="center"><b>Incumbent</b></TableCell>
            <TableCell sx={{width: "10%"}} align="center"><b>Result</b></TableCell>
            <TableCell sx={{width: "10%"}} align="center"><b>Pop. Var. </b></TableCell>
            <TableCell sx={{width: "10%"}} align="center"><b>Geo. Var.</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {sample.slice(store.currentIncumbentTablePage * 5, store.currentIncumbentTablePage * 5 + 5).map(row => (
        <Fragment>
            <TableRow
              hover={true}
              onClick={() => clickDistrict(row.districtNum)} 
              key={row.districtNum + row.detail.candidate}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              selected={store.currentDistrict == row.districtNum}
            >
            <TableCell rowSpan={row.detail.length + 1} component="th" scope="row" align="center">
              {row.districtNum}
            </TableCell>
          </TableRow>
          {row.detail.map(district => (
            <TableRow>
              <TableCell align="center">
                <Box 
                sx={{backgroundColor: district.party == "R" ? "#de2f2f" : district.party == "D" ? "#0585de" : "white", width:"25px", height: "25px"}}>
                </Box>
              </TableCell>
              <TableCell align="left">{district.candidate}</TableCell>
              <TableCell align="center">{district.incumbent === true ? <CheckCircleIcon> </CheckCircleIcon> : ""}</TableCell>
              <TableCell align="center">{district.result}</TableCell>
              <TableCell align="center">{district.popvar}</TableCell>
              <TableCell align="center">{district.geovar}</TableCell>
            </TableRow>
          ))}
        </Fragment>
      ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
            component="div"
            count={sample.length}
            rowsPerPage={5}
            rowsPerPageOptions={[]}
            page={store.currentIncumbentTablePage}
            onPageChange={handleChangePage}
    />
    </Box>
  }
  else //interesting plan
  {
    table=
        <Box>
              <AppBar sx={{bgcolor: "#272727"}} position="static">
            <Toolbar sx={{bgcolor: '#0000'}}>
                <Box style={{ marginRight: "auto"}}>
                <h3>District Details</h3>
                </Box>
                <Box style={{marginLeft: 'auto'}}>
                  <FormControlLabel control={<Switch onChange={toggle} size="small"/>} label="Only incumbents"/>
                </Box>
            </Toolbar>
        </AppBar>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ padding: 1}}>
        <TableHead>
          <TableRow>
          <TableCell sx={{width: "9%"}} align="center"><b>District</b></TableCell>
            <TableCell sx={{width: "1%"}} align="center"><b>Party</b></TableCell>
            <TableCell sx={{width: "50%"}} align="left"><b>Candidate</b></TableCell>
            <TableCell sx={{width: "8%"}} align="center"><b>Incumbent</b></TableCell>
            <TableCell sx={{width: "8%"}} align="center"><b>Est. Result</b></TableCell>
            <TableCell sx={{width: "8%"}} align="center"><b>Est. Vote</b></TableCell>
            <TableCell sx={{width: "8%"}} align="center"><b>Pop. Var.</b></TableCell>
            <TableCell sx={{width: "8%"}} align="center"><b>Geo. Var.</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {sample.slice(store.currentIncumbentTablePage * 5, store.currentIncumbentTablePage * 5 + 5).map(row => (
        <Fragment>
            <TableRow
              hover={true}
              onClick={() => clickDistrict(row.districtNum)} 
              key={row.districtNum + row.detail.candidate}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              selected={store.currentDistrict == row.districtNum}
            >
            <TableCell rowSpan={row.detail.length + 1} component="th" scope="row" align="center">
              {row.districtNum}
            </TableCell>
          </TableRow>
          {row.detail.map(district => (
            <TableRow>
              <TableCell align="center">
                <Box 
                sx={{backgroundColor: district.party == "R" ? "#de2f2f" : district.party == "D" ? "#0585de" : "white", width:"25px", height: "25px"}}>
                </Box>
              </TableCell>
              <TableCell align="left"><span>{district.candidate}</span></TableCell>
              <TableCell align="center">{district.incumbent === true ? <CheckCircleIcon> </CheckCircleIcon> : ""}</TableCell>
              <TableCell align="center">{district.result}</TableCell>
              <TableCell align="center">{district.estVote}</TableCell>
              <TableCell align="center">{district.popvar}</TableCell>
              <TableCell align="center">{district.geovar}</TableCell>
            </TableRow>
          ))}
        </Fragment>
      ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
            component="div"
            count={sample.length}
            rowsPerPage={5}
            rowsPerPageOptions={[]}
            page={store.currentIncumbentTablePage}
            onPageChange={handleChangePage}
    />
    </Box>
  }
  
  return (
    <>
      {table}
    </>
  );
}

export default IncumbentTable;