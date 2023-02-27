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
    }, () => { console.log("right after zoom") });

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
        let district = parseInt(e.target.feature.properties.DISTRICT)
        console.log(district)
        store.setDistrict(district);
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

    function districtStyle(district){
        console.log(district)
        let color = "#FFFFF"
        if (store.currentDistrict==parseInt(district.properties.DISTRICT)){
            color="#fcba03"
        }
        else color = "#0000FF"
        return {
            fillColor: color,
            color: color,
            weight: 0.8
        };
    }

    console.log(store.currentState);

    return (
        <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
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
                            {
                                store.currentPlan == "2020" ?
                                    <>
                                        <GeoJSON key="5" data={AZDistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
                                        <GeoJSON key="6" data={CODistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
                                        <GeoJSON key="7" data={OHDistricts2020.features} style={districtStyle} onEachFeature={onEachDistrict} />
                                    </>
                                    :

                                    store.currentPlan == "2022" ?
                                        <>
                                            <GeoJSON key="8" data={AZDistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
                                            <GeoJSON key="9" data={CODistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
                                            <GeoJSON key="10" data={OHDistricts2022.features} style={districtStyle} onEachFeature={onEachDistrict} />
                                        </>
                                        :
                                        <>
                                        </>


                            }

                        </>

                }
            </MapContainer >
            <Toolbar sx={{ position: 'absolute', top: '2%', right: '1%', width: '15%', height: '10%', background: '#202124', opacity: 0.8 }}>
                
            </Toolbar>
        </Box >


    );
}




export default RenderMap;
