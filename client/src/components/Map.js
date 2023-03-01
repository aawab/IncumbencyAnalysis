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
        store.currentDistrict == parseInt(district.properties.DISTRICT)?color = "#fcba03":color = "#0000FF"
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
        <GeoJSON key="22" data={CODistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
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
            <Toolbar sx={{ position: 'absolute', top: '0%', marginTop: "1%", right: '0%', marginRight: "1%", width: '15%', height: '10%', background: '#202124', opacity: 0.8, boxShadow: 2 }}/>
        </Box >


    );
}



export default RenderMap;
