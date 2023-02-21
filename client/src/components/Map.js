import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import Box from '@mui/material/Box';
import 'leaflet/dist/leaflet.css'
import USMap from './geojson/gz_2010_us_outline_500k.json'
import Arizona from './geojson/states/Arizona.json'
import Colorado from './geojson/states/Colorado.json'
import Ohio from './geojson/states/Ohio.json'
const USStyle = {
    "color": "#000000"
}

const stateStyle = {
    "color": "#0000FF"
}

function renderMap() {
    return (
        <MapContainer center={[40, -80]} zoom={4} scrollWheelZoom={true}>
            <GeoJSON data={USMap.features} style={USStyle} />
            <GeoJSON data={Arizona.features} style={stateStyle} />
            <GeoJSON data={Colorado.features} style={stateStyle} />
            <GeoJSON data={Ohio.features} style={stateStyle} />
        </MapContainer>

    );
}

export default renderMap;
