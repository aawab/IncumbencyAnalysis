import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { Container } from '@mui/system';
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

const stateStyle = {
    "color": "#0000FF"
}

function Component() {

    const { store } = useContext(GlobalStoreContext);
    const [zoom, setZoom] = useState(4);

    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(mapEvents.getZoom());
            store.setZoom(zoom);
        }
    }, () => { console.log("right after zoom") });
}


function RenderMap() {

    const { store } = useContext(GlobalStoreContext);

    console.log(store.zoom);
    return (
        <MapContainer center={[40, -80]} zoom={4} scrollWheelZoom={true} style={{ position:'fixed'}}>
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
