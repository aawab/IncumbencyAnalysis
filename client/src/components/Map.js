import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import { useMap } from 'react-leaflet';
import React, { useContext, useState, useEffect } from 'react'
import { Box } from '@mui/system';

import GlobalStoreContext from '../store';

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

    useEffect(() => {
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
      }, [store.pannedToState, store.currentState]);

}

// MAP COMPONENT RENDERING
function RenderMap() {

    const { store } = useContext(GlobalStoreContext);

    // SETUP DATA ACCORDING TO PLAN AND STATE

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
        let color = "#FFFFFF"
        if (district)
        {
            // console.log(store.stateInfo.districts[district.properties.DISTRICT-1].winner.party)
            color= store.stateInfo.districts[district.properties.DISTRICT-1].winner.party=="R"?"#FF3131":"#0096FF"
            store.currentDistrict == parseInt(district.properties.DISTRICT)?color = "#fcba03":color=color
        }

        return {
            fillColor: color,
            color: color,
            weight: 0.8
        };
    }

    // GEOJSON DISPLAY PRESET

    let states = <></>
    let AZ2020 = <></>
    let CO2020 = <></>
    let OH2020 = <></>
    let AZ2022 = <></>
    let CO2022 = <></>
    let OH2022 = <></>
    if (store.statesGeoJSON)
    {
        if (store.zoom < 6 || store.currentState == '')
        {
            states = 
            <>
            <GeoJSON key="1" data={store.statesGeoJSON[0].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="2" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="3" data={store.statesGeoJSON[2].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
        }
        else
        {
            AZ2020 = <>
            <GeoJSON key="10" data={store.currentStateJSON} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="11" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="12" data={store.statesGeoJSON[2].geoJSON.features} stylecurrentStateDistrictJson={stateStyle} onEachFeature={onEachState} />
            </>
            CO2020 = <>
            <GeoJSON key="13" data={store.currentStateJSON} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="14" data={store.statesGeoJSON[0].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="15" data={store.statesGeoJSON[2].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
            OH2020 = <>
            <GeoJSON key="16" data={store.currentStateJSON} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="17" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="18" data={store.statesGeoJSON[0].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
            AZ2022 = <>
            <GeoJSON key="19" data={store.currentStateJSON} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="20" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="21" data={store.statesGeoJSON[2].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
            CO2022 = <>
            <GeoJSON key="22" data={store.currentStateJSON} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="23" data={store.statesGeoJSON[0].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="24" data={store.statesGeoJSON[2].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
            OH2022 = <>
            <GeoJSON key="25" data={store.currentStateJSON} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="26" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="27" data={store.statesGeoJSON[0].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
        }
    }

    // LOGIC TO DISPLAY DIFF GEOJSON PRESETS
    
    function renderSwitch() {
        if (store.zoom < 6 || store.currentState == '') {
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
                                return;
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
                                return;
                        }
                    }
                default: {
                    return
                }
            }
        }
    }

    // LOGIC TO DISPLAY DIFF GEOJSON PRESETS

    return (
        <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer center={[40.4, -82.9]} zoom={store.zoom} minZoom={4} maxBounds={[[50.175, -116.292], [20, -55.722]]}
                scrollWheelZoom={true} style={{ position: 'fixed' }}>
                <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                <Component />
                {renderSwitch()}
            </MapContainer >
        </Box >


    );
}



export default RenderMap;
