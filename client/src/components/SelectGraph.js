import React, { useContext, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import Map from './Map';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import FilterToolbar from './FilterToolbar';
import { GlobalStoreContext } from '../store';
import EnsembleTab from './EnsembleTab';
import { DivIcon } from 'leaflet';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



/*
    This React component functions as the HomeScreen, and will house the Leaflet map,
    any appBanners we add, legends, basically everything we'll need.
*/
const SelectGraph = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);
    const { store } = useContext(GlobalStoreContext);

    //MENU STUFF
	const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
	const handleCloseMenu = () => {
        setAnchorEl(null);
    };

	let select = <></>

	if (store.currentState != "" && store.tab == 1)
	{
		select =
		<Box sx={{borderTop: 12, borderColor: '#272727'}} display={store.currentState==""? "none": "visible"}>
		<Button sx={{width:"20%", backgroundColor:"#FF69B4"}} variant="contained" onClick={ () =>{ store.setEnsembleGraph("summary")}}> Ensemble Summary </Button>
    	<Button sx={{width:"20%", backgroundColor:"#FF69B4"}} variant="contained" onClick={ () =>{ store.setEnsembleGraph("geo")}}> Geometric Var. </Button>
		<Button sx={{width:"20%", backgroundColor:"#FF69B4"}} variant="contained" onClick={ () =>{ store.setEnsembleGraph("pop")}}> Population Var. </Button>
		<Button sx={{width:"20%", backgroundColor:"#FF69B4"}} variant="contained" onClick={handleOpenMenu} endIcon={<KeyboardArrowDownIcon />}> Race Var. </Button>
		<Button sx={{width:"20%", backgroundColor:"#FF69B4"}} variant="contained" onClick={ () =>{ store.setEnsembleGraph("split")}}> Party Split  </Button>
			<Menu
				id="playlist-sort-menu"
				anchorEl={anchorEl}
				open={isMenuOpen}
				onClose={handleCloseMenu}
			>
			<Box>
				<MenuItem onClick={ () =>{ handleCloseMenu(); store.setEnsembleGraph("white")}}> White</MenuItem>
				<MenuItem onClick={ () =>{ handleCloseMenu(); store.setEnsembleGraph("black")}}> Black or African American </MenuItem>
				<MenuItem onClick={ () =>{ handleCloseMenu(); store.setEnsembleGraph("hispanic")}}> Hispanic</MenuItem>
				<MenuItem onClick={ () =>{ handleCloseMenu(); store.setEnsembleGraph("asian")}}> Asian</MenuItem>
			</Box>
			</Menu>
        </Box>
	}
	else if (store.currentDistrict != null && store.tab == 2)
	{
		if (store.stateInfo.districts[store.currentDistrict-1].incumbent.name == store.stateInfo.districts[store.currentDistrict-1].winner.name 
            || store.stateInfo.districts[store.currentDistrict-1].incumbent.name == store.stateInfo.districts[store.currentDistrict-1].loser.name)
			{
				select =
				<Box sx={{borderTop: 12, borderColor: '#272727'}} display={store.currentState==""? "none": "visible"}>
				<Button sx={{width:"50%", backgroundColor:"#FF69B4"}} variant="contained" onClick={ () =>{ store.setEnsembleGraph("incumbentgeo")}}> Incumbent Population Var. </Button>
				<Button sx={{width:"50%", backgroundColor:"#FF69B4"}} variant="contained" onClick={ () =>{ store.setEnsembleGraph("incumbentpop")}}> Incumbent Population Var. </Button>
				</Box>
			}
		else {
			select = 
			<Box sx={{borderTop: 12, borderColor: '#272727'}} display={store.currentState==""? "none": "visible"}>
			No information available. (Neither candidate is an incumbent)
			</Box>
		}
	}

    return (
		<>
			{select}
		</>		
    )
}

export default SelectGraph;
