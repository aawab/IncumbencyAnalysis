import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import { useMap } from 'react-leaflet';
import React, { useContext, useState } from 'react'
import { Box } from '@mui/system';
// Full States
import Arizona from './geojson/states/Arizona.json'
import Colorado from './geojson/states/Colorado.json'
import Ohio from './geojson/states/Ohio.json'
// Congressional Districts
import AZDistricts2020 from './geojson/congressionaldistricts/2020/azdistricts.json'
import CODistricts2020 from './geojson/congressionaldistricts/2020/codistricts.json'
import OHDistricts2020 from './geojson/congressionaldistricts/2020/ohdistricts.json'

import AZDistricts2022 from "./geojson/congressionaldistricts/2022/azdistricts.json"
import CODistricts2022 from "./geojson/congressionaldistricts/2022/codistricts.json"
import OHDistricts2022 from "./geojson/congressionaldistricts/2022/ohdistricts.json"

import GlobalStoreContext from '../store';
import { Toolbar } from '@mui/material';

//HANDLE GENERAL MAP EVENTS AND RE-RENDERS ACCORDING TO STORE STATE CHANGES
function Component() {

    const { store } = useContext(GlobalStoreContext);
    const map = useMap();

    // MAP EVENTS
    const mapEvents = useMapEvents({
        zoomend: () => {
            store.setZoom(mapEvents.getZoom());
        },
    }, () => { console.log("right after zoom") });

    // ZOOM OUT WHEN NO STATE SELECTED
    if (store.currentState == "" && store.zoom == 4) {
        map.zoomOut(4);
    }

    //PAN TO STATE AFTER SELECTION
    if (!store.pannedToState && store.currentState == "Ohio") {
        map.flyTo([40, -80.9], 8)
        store.setState("Ohio", true)
    }
    else if (!store.pannedToState && store.currentState == "Arizona") {
        map.flyTo([34.68, -109.59], 8)
        store.setState("Arizona", true)
    }
    else if (!store.pannedToState && store.currentState == "Colorado") {
        map.flyTo([39.1, -103.5], 8)
        store.setState("Colorado", true)
    }

}

// MAP COMPONENT RENDERING
function RenderMap() {

    const { store } = useContext(GlobalStoreContext);

    // SETUP DATA ACCORDING TO PLAN AND STATE

    function createData(districtNum, incumbent, party, result, geoVar, popVar) {
        return { districtNum, incumbent, party, result, geoVar, popVar };
      }

    let rows = []
    if (store.currentState == "Ohio")
    {
        if (store.currentPlan == "2020")
        {
        rows = 
        [
        createData(1, "Steve Chabot", "R", "W", 0.9, 1.1),
        createData(2, "Brad Wenstrup", "R", "W", 0.8, 1.2),
        createData(3, "Joyce Beatty", "D", "W", 0.6, 1.9),
        createData(4, "Jim Jordan", "R", "W", 0.4, 1.2),
        createData(5, "Bob Latta", "R", "W", 0.6, 1.1),
        createData(6, "Bill Johnson", "R", "W", 0.7, 1.3),
        createData(7, "Bob Gibbs", "R", "W", 1.1, 0.8),
        createData(8, "Warren Davidson", "R", "W", 0.7, 0.9),
        createData(9, "Marcy Kaptur", "D", "W", 0.9, 0.6),
        createData(10, "Michael Turner", "R", "W", 0.9, 1.1),
        createData(11, "Marcia Fudge", "D", "W", 1.2, 1.3),
        createData(12, "Troy Balderson", "R", "W", 1.3, 1.5),
        createData(13, "Tim Ryan", "D", "W", 0.8, 1.7),
        createData(14, "David Joyce", "R", "W", 0.8, 0.8),
        createData(15, "Steve Stivers", "R", "W", 0.7, 0.9),
        createData(16, "Anthony Gonzalez", "R", "W", 0.7, 0.9)
        ]
        }
        else //2022 and other plans
        {
        rows = 
        [
        createData(1, "Steve Chabot", "R", "L", 0.9, 1.1),
        createData(2, "Brad Wenstrup", "R", "W", 0.8, 1.2),
        createData(3, "Joyce Beatty", "D", "W", 0.6, 1.9),
        createData(4, "Jim Jordan", "R", "W", 0.4, 1.2),
        createData(5, "Bob Latta", "R", "W", 0.6, 1.1),
        createData(6, "Bill Johnson", "R", "W", 0.7, 1.3),
        createData(7, "Bob Gibbs", "R", "W", 1.1, 0.8),
        createData(8, "Warren Davidson", "R", "W", 0.7, 0.9),
        createData(9, "Marcy Kaptur", "D", "W", 0.9, 0.6),
        createData(10, "Michael Turner", "R", "W", 0.9, 1.1),
        createData(11, "Shontel Brown", "D", "W", 1.2, 1.3),
        createData(12, "Troy Balderson", "R", "W", 1.3, 1.5),
        createData(13, "Anthony Gonzalez", "R", "L", 0.8, 1.7),
        createData(14, "David Joyce", "R", "W", 0.8, 0.8),
        createData(15, "Mike Carey", "R", "W", 0.7, 0.9)
        ]
        }
    }
    else if (store.currentState == "Arizona")
    {
        if (store.currentPlan == "2020")
        {
        rows =
        [
        createData(1, "Tom O'Halleran", "D", "W", 0.9, 1.1),
        createData(2, "Ann Kirkpatrick", "D", "W", 0.8, 1.2),
        createData(3, "Raul Grijalva", "D", "W", 0.6, 1.9),
        createData(4, "Paul Gosar", "R", "W", 0.4, 1.2),
        createData(5, "Andy Biggs", "R", "W", 0.6, 1.1),
        createData(6, "David Schweikert", "R", "W", 0.7, 1.3),
        createData(7, "Ruben Gallego", "D", "W", 1.1, 0.8),
        createData(8, "Debbie Lesko", "R", "W", 0.7, 0.9),
        createData(9, "Greg Stanton", "D", "W", 0.9, 0.6)
        ]
        }
        else //2022 and other plans
        {
        rows =
        [
        createData(1, "David Schweikert", "R", "W", 0.9, 1.1),
        createData(2, "Tom O'Halleran", "D", "L", 0.8, 1.2),
        createData(3, "Ruben Gallego", "D", "W", 0.6, 1.9),
        createData(4, "Greg Stanton", "D", "W", 0.4, 1.2),
        createData(5, "Andy Biggs", "R", "W", 0.6, 1.1),
        createData(6, "Ann Kirkpatrick", "D", "L", 0.7, 1.3),
        createData(7, "Raul Grijalva", "D", "W", 1.1, 0.8),
        createData(8, "Debbie Lesko", "R", "W", 0.7, 0.9),
        createData(9, "Paul Gosar", "R", "W", 0.9, 0.6)
        ]
        }
    }
    else if (store.currentState == "Colorado")
    {
        if (store.currentPlan == "2020")
        {
        rows =
        [
        createData(1, "Diana DeGette", "D", "W", 0.9, 1.1),
        createData(2, "Joe Neguse", "D", "W", 0.8, 1.2),
        createData(3, "Scott Tipton", "R", "W", 0.6, 1.9),
        createData(4, "Ken Buck", "R", "W", 0.4, 1.2),
        createData(5, "Doug Lamborn", "R", "W", 0.6, 1.1),
        createData(6, "Jason Crow", "D", "W", 0.7, 1.3),
        createData(7, "Ed Perlmutter", "D", "W", 1.1, 0.8)
        ]
        }
        else //2022 and other plans
        {
        rows =
        [
        createData(1, "Diana DeGette", "D", "W", 0.9, 1.1),
        createData(2, "Joe Neguse", "D", "W", 0.8, 1.2),
        createData(3, "Lauren Boebert", "R", "W", 0.6, 1.9),
        createData(4, "Ken Buck", "R", "W", 0.4, 1.2),
        createData(5, "Doug Lamborn", "R", "W", 0.6, 1.1),
        createData(6, "Jason Crow", "D", "W", 0.7, 1.3),
        createData(7, "Ed Perlmutter", "D", "W", 1.1, 0.8),
        createData(8, "Yadira Caraveo", "D", "W", 0.7, 0.9)
        ]
        }
    }

    // HIGHLIGHT ON HOVER
    function highlightArea(e) {
        e.target.setStyle({
            weight: 5,
        });
    }

    // STOP HIGHLIGHT ON MOUSEOUT
    function unhighlightArea(e) {
        e.target.setStyle({
            weight: 0.8,
        });
    }

    // SELECT A STATE
    const selectState = (e) => {
        let state = e.target.feature.properties.NAME
        store.setStateNoDistrict(state, false);
    };

    // SELECT A DISTRICT
    const selectDistrict = (e) => {
        let district = parseInt(e.target.feature.properties.DISTRICT)
        store.setDistrictAndChangeTab(district);
    };

    // SETUP MOUSE EVENTS FOR STATE
    function onEachState(state, layer) {
        layer.on({
            mouseover: highlightArea,
            mouseout: unhighlightArea,
            click: selectState
        });
    }

    // SETUP MOUSE EVENTS FOR DISTRICTS
    function onEachDistrict(district, layer) {
        layer.on({
            mouseover: highlightArea,
            mouseout: unhighlightArea,
            click: selectDistrict
        });
    }

    // STYLE STATES BASED ON SELECTION
    function stateStyle(state){
        return {
            "color": "#0000FF",
            "weight": 0.8
        }
    }

    // STYLE DISTRICTS BASED ON SELECTION
    function districtStyle(district) {
        let color = "#FFFFF"
        color=rows[district.properties.DISTRICT-1].party=="R"?"#FF3131":"#0096FF"
        store.currentDistrict == parseInt(district.properties.DISTRICT)?color = "#fcba03":color=color
        return {
            fillColor: color,
            color: color,
            weight: 0.8
        };
    }

    // GEOJSON DISPLAY PRESETS
    let states = <>
        <GeoJSON key="1" data={Arizona.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="2" data={Colorado.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="3" data={Ohio.features} style={stateStyle} onEachFeature={onEachState} />
    </>
    let districts2020 = <>
        <GeoJSON key="4" data={AZDistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="5" data={CODistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="6" data={OHDistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
    </>
    let districts2022 = <>
        <GeoJSON key="7" data={AZDistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="8" data={CODistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="9" data={OHDistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
    </>
    let AZ2020 = <>
        <GeoJSON key="10" data={AZDistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="11" data={Colorado.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="12" data={Ohio.features} style={stateStyle} onEachFeature={onEachState} />
    </>
    let CO2020 = <>
        <GeoJSON key="13" data={CODistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="14" data={Arizona.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="15" data={Ohio.features} style={stateStyle} onEachFeature={onEachState} />
    </>
    let OH2020 = <>
        <GeoJSON key="16" data={OHDistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="17" data={Colorado.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="18" data={Arizona.features} style={stateStyle} onEachFeature={onEachState} />
    </>
    let AZ2022 = <>
        <GeoJSON key="19" data={AZDistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="20" data={Colorado.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="21" data={Ohio.features} style={stateStyle} onEachFeature={onEachState} />
    </>
    let CO2022 = <>
        <GeoJSON key="22" data={store.co2022json} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="23" data={Arizona.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="24" data={Ohio.features} style={stateStyle} onEachFeature={onEachState} />
    </>
    let OH2022 = <>
        <GeoJSON key="25" data={OHDistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
        <GeoJSON key="26" data={Colorado.features} style={stateStyle} onEachFeature={onEachState} />
        <GeoJSON key="27" data={Arizona.features} style={stateStyle} onEachFeature={onEachState} />
    </>

    // LOGIC TO DISPLAY DIFF GEOJSON PRESETS
    function renderSwitch() {
        if (store.zoom < 6) {
            return states;
        }
        else {
            switch (store.currentPlan) {
                case "2020":
                    {
                        switch (store.currentState) {
                            case "Arizona":
                                return AZ2020;
                            case "Colorado":
                                return CO2020;
                            case "Ohio":
                                return OH2020;
                            default:
                                return districts2020;
                        }
                    }
                case "2022":
                    {
                        switch (store.currentState) {

                            case "Arizona":
                                return AZ2022;
                            case "Colorado":
                                return CO2022;
                            case "Ohio":
                                return OH2022;
                            default:
                                return districts2022;
                        }
                    }
                default: {
                    return
                }
            }
        }
    }

    return (
        <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer center={[40.4, -82.9]} zoom={store.zoom} minZoom={4} maxBounds={[[50.175, -116.292], [20, -55.722]]}
                scrollWheelZoom={true} style={{ position: 'fixed' }}>
                <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                <Component />
                {
                    renderSwitch()
                }
            </MapContainer >
            {/* <Box sx={{ textAlign: 'right',position: 'absolute', padding:'1%',top: '0%', marginTop: "1%", right: '0%', marginRight: "1%", width: '15%', background: '#202124', opacity: 0.8, boxShadow: 2 }}>
                <b>US Map</b> <br/> 
                Click on a state to get started! <br/>
            </Box> */}
        </Box >


    );
}



export default RenderMap;
