import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import { useMap } from 'react-leaflet';
import React, { useContext, useState } from 'react'
// Full States
import Arizona from './geojson/states/Arizona.json'
import Colorado from './geojson/states/Colorado.json'
import Ohio from './geojson/states/Ohio.json'
// Congressional Districts
import AZDistricts from './geojson/congressionaldistricts/azdistricts.json'
import CODistricts from './geojson/congressionaldistricts/codistricts.json'
import OHDistricts from './geojson/congressionaldistricts/ohdistricts.json'
// Precincts


import GlobalStoreContext from '../store';
import { useRef } from 'react';

const stateStyle = {
    "color": "#0000FF",
    "weight": 0.8
}

function Component() {

    const { store } = useContext(GlobalStoreContext);
    const [zoom, setZoom] = useState(8);

    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(mapEvents.getZoom());
            store.setZoom(zoom);
        },
        click: (e) => {
            console.log(e.latlng)
        }
    }, () => { console.log("right after zoom") });

    //PAN TO STATE AFTER FIRST SELECTION
    const map = useMap();
    if (!store.statePanned && store.state=="OH"){
        map.flyTo([40,-80.9], 8)
        store.setState("OH", true)
    }
    else if (!store.statePanned && store.state=="AZ"){
        map.flyTo([34.68, -109.59], 8)
        store.setState("AZ", true)
    }
    else if (!store.statePanned &&store.state=="CO"){ 
        map.flyTo([39.1, -103.5], 8)
        store.setState("CO", true)
    }
    
}


function RenderMap() {

    const { store } = useContext(GlobalStoreContext);

    console.log(store.zoom);
    console.log(store.state);
    
    return (
        <MapContainer center={[40.4,-82.9]} zoom={4} scrollWheelZoom={true} style={{ position:'fixed'}}>
            <TileLayer url = {"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}/>
            <Component />
            {
                store.zoom < 5 ?
                    <>
                        <GeoJSON key="2" data={Arizona.features} style={stateStyle} />
                        <GeoJSON key="3" data={Colorado.features} style={stateStyle} />
                        <GeoJSON key="4" data={Ohio.features} style={stateStyle} />
                    </>
                    :
                    <>
                        <GeoJSON key="6" data={AZDistricts.features} style={stateStyle} />
                        <GeoJSON key="7" data={CODistricts.features} style={stateStyle} />
                        <GeoJSON key="8" data={OHDistricts.features} style={stateStyle} />
                    </>

            }
        </MapContainer >     

    );
}




export default RenderMap;
