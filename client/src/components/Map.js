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
import AZDistricts from './geojson/congressionaldistricts/azdistricts.json'
import CODistricts from './geojson/congressionaldistricts/codistricts.json'
import OHDistricts from './geojson/congressionaldistricts/ohdistricts.json'

import GlobalStoreContext from '../store';
import { Toolbar } from '@mui/material';

const stateStyle = {
    "color": "#0000FF",
    "weight": 0.8
}

//HANDLE GENERAL MAP EVENTS AND RE-RENDERS ACCORDING TO STORE STATE CHANGES
function Component() {

    const { store } = useContext(GlobalStoreContext);
    const map = useMap();

    const mapEvents = useMapEvents({
        zoomend: () => {
            store.setZoom(mapEvents.getZoom());
        },
        click: (e) => {
            console.log(e.latlng)
        }
    }, () => { console.log("right after zoom") });

    //PAN TO STATE AFTER SELECTION
    if (!store.statePanned && store.currentState == "Ohio") {
        map.flyTo([40, -80.9], 8)
        store.setState("Ohio", true)
    }
    else if (!store.statePanned && store.currentState == "Arizona") {
        map.flyTo([34.68, -109.59], 8)
        store.setState("Arizona", true)
    }
    else if (!store.statePanned && store.currentState == "Colorado") {
        map.flyTo([39.1, -103.5], 8)
        store.setState("Colorado", true)
    }

}


function RenderMap() {

    const { store } = useContext(GlobalStoreContext);

    function highlightArea(e) {
        console.log(e.target)
        e.target.setStyle({
            weight: 5,
        });
    }

    function unhighlightArea(e) {
        e.target.setStyle({
            weight: 0.8,
        });
    }

    function selectState(e) {
        let state = e.target.feature.properties.NAME
        console.log(state)
        store.setState(state, false);
    }
    function selectDistrict(e) {
        let district = e.target.feature.properties.NAMELSAD20.slice(-1)
        console.log(district)
        store.setDistrict(district, false);
    }

    function onEachState(state, layer) {
        layer.on({
            mouseover: highlightArea,
            mouseout: unhighlightArea,
            click: selectState
        });
    }

    function onEachDistrict(district, layer) {
        layer.on({
            mouseover: highlightArea,
            mouseout: unhighlightArea,
            click: selectDistrict
        });
    }

    console.log(store.currentState);

    return (
        <Box style={{position:'relative', width: '100%', height: '100%'}}>
            <MapContainer center={[40.4, -82.9]} zoom={4} minZoom={4} maxBounds={[[50.175, -116.292], [20, -55.722]]}
            scrollWheelZoom={true} style={{ position: 'fixed' }}>
            <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
            <Component />
            {
                store.zoom < 6 ?
                    <>
                        <GeoJSON key="2" data={Arizona.features} style={stateStyle} onEachFeature={onEachState} />
                        <GeoJSON key="3" data={Colorado.features} style={stateStyle} onEachFeature={onEachState} />
                        <GeoJSON key="4" data={Ohio.features} style={stateStyle} onEachFeature={onEachState} />
                    </>
                    :
                    <>
                        <GeoJSON key="5" data={AZDistricts.features} style={stateStyle} onEachFeature={onEachDistrict} />
                        <GeoJSON key="6" data={CODistricts.features} style={stateStyle} onEachFeature={onEachDistrict} />
                        <GeoJSON key="7" data={OHDistricts.features} style={stateStyle} onEachFeature={onEachDistrict} />
                    </>

            }
            </MapContainer >
            <Toolbar sx={{position:'absolute', top: '2%', right:'1%', width: '15%', height: '10%', background: '#202124', opacity: 0.8}}>
                
            </Toolbar>
        </Box>
        

    );
}




export default RenderMap;
