import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import { useMap } from 'react-leaflet';
import React, { useContext, useState, useEffect } from 'react'
import { Box } from '@mui/system';

import AZDistrictsInteresting from './geojson/congressionaldistricts/interesting/aztest2.geojson'
import OHDistrictsInteresting from './geojson/congressionaldistricts/interesting/ohiointeresting.geojson'
import GlobalStoreContext from '../store';

//HANDLE GENERAL MAP EVENTS AND RE-RENDERS ACCORDING TO STORE STATE CHANGES
function Component() {

    const { store } = useContext(GlobalStoreContext);
    const map = useMap();

    if (store.currentState == "" && store.zoom == 4) {
        map.zoomOut(4);
    }

    useEffect(() => {
        //PAN TO STATE AFTER SELECTION
    
        if (store.currentState == "Ohio") {
            map.flyTo([40, -78.4], 7)
            switch(store.currentPlan)
            {
                case("2020"):
                {
                    switch(store.currentDistrict)
                    {
                        case(1):
                         map.flyTo([39.3, -83.3], 9)
                       break
                        case(2):
                        map.flyTo([39, -81.4], 8)
                        break
                        case(3):
                        map.flyTo([40, -82.4], 10)
                        break
                        case(4):
                        map.flyTo([40.6, -81.4], 8)
                        break
                        case(5):
                        map.flyTo([41, -81.6], 8)
                        break
                        case(6):
                        map.flyTo([39.5, -78], 7)
                        break
                        case(7):
                        map.flyTo([40.7, -80], 8)
                        break
                        case(8):
                        map.flyTo([39.7, -82.4], 8)
                        break
                        case(9):
                        map.flyTo([41.5, -81], 8.5)
                        break
                        case(10):
                        map.flyTo([39.7, -83.3], 9.3)
                        break
                        case(11):
                        map.flyTo([41.7, -80.7], 9)
                        break
                        case(12):
                        map.flyTo([40.2, -80.4], 8)
                        break
                        case(13):
                        map.flyTo([41, -80], 9.1)
                        break
                        case(14):
                        map.flyTo([41.5, -79], 8)
                        break
                        case(15):
                        map.flyTo([39.5, -81.5], 8.3)
                        break
                        case(16):
                        map.flyTo([41, -80.25], 8.5)
                        break
                    }
                }
                break
                case("2022"):
                {
                    switch(store.currentDistrict)
                    {
                        case(1):
                        map.flyTo([39.3, -83.3], 9)
                        break
                        case(2):
                        map.flyTo([39, -81.4], 8)
                        break
                        case(3):
                        map.flyTo([40, -82.4], 10)
                        break
                        case(4):
                        map.flyTo([40.3, -81.4], 8)
                        break
                        case(5):
                        map.flyTo([41, -81.6], 8)
                        break
                        case(6):
                        map.flyTo([40, -79.4], 8)
                        break
                        case(7):
                        map.flyTo([40.95, -80.7], 8.5)
                        break
                        case(8):
                        map.flyTo([39.7, -82.4], 8)
                        break
                        case(9):
                        map.flyTo([41.5, -82], 8)
                        break
                        case(10):
                        map.flyTo([39.7, -83.3], 9.3)
                        break
                        case(11):
                        map.flyTo([41.7, -80.7], 9)
                        break
                        case(12):
                        map.flyTo([39.8, -80.4], 8)
                        break
                        case(13):
                        map.flyTo([40.95, -80.5], 9)
                        break
                        case(14):
                        map.flyTo([41.5, -79], 8)
                        break
                        case(15):
                        map.flyTo([39.7, -82], 8.3)
                        break
                    }
                }
                break
                case("Interesting Geo Variation"):
                {
                    switch(store.currentDistrict)
                    {
                        case(1):
                        map.flyTo([40.25, -79.3], 8)
                      break
                       case(2):
                       map.flyTo([40, -82.5], 9.8)
                       break
                       case(3):
                       map.flyTo([40.1, -82.4], 10)
                       break
                       case(4):
                       map.flyTo([40.7, -79.4], 8.5)
                       break
                       case(5):
                       map.flyTo([39.7, -78.4], 7)
                       break
                       case(6):
                       map.flyTo([39.3, -83.3], 9)
                       break
                       case(7):
                       map.flyTo([39.7, -82.1], 9.5)
                       break
                       case(8):
                       map.flyTo([41.2, -80.7], 9)
                       break
                       case(9):
                       map.flyTo([41.5, -79], 8)
                       break
                       case(10):
                       map.flyTo([39.3, -83.3], 9)
                       break
                       case(11):
                       map.flyTo([41.7, -80.7], 9)
                       break
                       case(12):
                       map.flyTo([39.7, -82.4], 8)
                       break
                       case(13):
                       map.flyTo([41.3, -80.4], 9)
                       break
                       case(14):
                       map.flyTo([41.65, -83.4], 11)
                       break
                       case(15):
                       map.flyTo([40.5, -80], 7.5)
                       break
                       case(16):
                       map.flyTo([41, -81.6], 8)
                       break
                    }
                }
            }
        }
        else if (store.currentState == "Arizona") {
            map.flyTo([33.68, -104.59], 6)
            switch(store.currentPlan)
            {
                case("2020"):
                {
                    switch(store.currentDistrict)
                    {
                        case(1):
                        map.flyTo([34.77, -107.66], 6.5)
                        break
                        case(2):
                        map.flyTo([31.8, -108], 8)
                        break
                        case(3):
                        map.flyTo([32.5, -108.66], 7.2)
                        break
                        case(4):
                        map.flyTo([34.5, -108.66], 6.5)
                        break
                        case(5):
                        map.flyTo([33.3, -111.1], 10)
                        break
                        case(6):
                        map.flyTo([33.60, -111], 9.2)
                        break
                        case(7):
                        map.flyTo([33.37, -111.7], 10.2)
                        break
                        case(8):
                        map.flyTo([33.69, -111.5], 9.5)
                        break
                        case(9):
                        map.flyTo([33.37, -111.5], 10.2)
                        break
                    }
                }
                break
                case("2022"):
                {
                    switch(store.currentDistrict)
                    {
                        case(1):
                        map.flyTo([33.77, -110.66], 9)
                        break
                        case(2):
                        map.flyTo([34.77, -107.66], 6.5)
                         break
                        case(3):
                        map.flyTo([33.37, -111.7], 10.2)
                        break
                        case(4):
                        map.flyTo([33.37, -111.5], 10.2)
                        break
                        case(5):
                        map.flyTo([33.3, -111.1], 10)
                        break
                        case(6):
                        map.flyTo([32.5, -106.66], 7)
                        break
                        case(7):
                        map.flyTo([32.5, -108.66], 7.2)
                        break
                        case(8):
                         map.flyTo([33.69, -111.5], 9.5)
                        break
                        case(9):
                        map.flyTo([34.5, -108.66], 6.5)
                        break
                    }
                }
                break
                case("Interesting Geo Variation"):
                {
                    switch(store.currentDistrict)
                    {                        
                        case(1):
                        map.flyTo([33.37, -111.7], 10.2)
                        break
                        case(2):
                        map.flyTo([33.37, -111.5], 10.2)
                        break
                        case(3):
                        map.flyTo([34, -105.66], 6.5)
                        break
                        case(4):
                        map.flyTo([33.55, -111.7], 10.2)
                        break
                        case(5):
                        map.flyTo([34, -105.66], 6.5)
                        break
                        case(6):
                        map.flyTo([32.5, -108.66], 7.2)
                        break
                        case(7):
                        map.flyTo([33.75, -111.7], 9)
                        break
                        case(8):
                        map.flyTo([33.69, -110.9], 9.5)
                        break
                        case(9):
                        map.flyTo([32.3, -109.66], 9)
                        break
                    }
                }
            }
        }
        else if (store.currentState == "Colorado") {
            map.flyTo([39.1, -100.5], 7)
            switch(store.currentPlan)
            {
                case("2020"):
                {
                    switch(store.currentDistrict)
                    {
                        case(1):
                        map.flyTo([39.7, -104.5], 10)
                        break
                        case(2):
                        map.flyTo([40, -104], 8)
                        break
                        case(3):
                        map.flyTo([39.1, -102.5], 7)
                        break
                        case(4):
                        map.flyTo([39.1, -99.5], 7)
                        break
                        case(5):
                        map.flyTo([38.8, -103.5], 8)
                        break
                        case(6):
                        map.flyTo([39.7, -104.2], 9.5)
                        break
                        case(7):
                        map.flyTo([39.8, -104.5], 10)
                        break
                    }
                }
                break
                case("2022"):
                {
                    switch(store.currentDistrict)
                    {
                        case(1):
                        map.flyTo([39.7, -104.5], 10)
                        break
                        case(2):
                        map.flyTo([40, -104], 8)
                        break
                        case(3):
                        map.flyTo([39.1, -102.5], 7)
                        break
                        case(4):
                        map.flyTo([39.1, -99.5], 7)
                        break
                        case(5):
                        map.flyTo([38.8, -103.5], 9)
                        break
                        case(6):
                        map.flyTo([39.7, -104.2], 10)
                        break
                        case(7):
                        map.flyTo([38.9, -101.5], 7.2)
                        break
                        case(8):
                        map.flyTo([40.1, -103.8], 9)
                        break
                    }
                }
            }
        }
      }, [store.currentState, store.currentDistrict, store.currentPlan]);
  
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
    function selectState(e) {
        let state = e.target.feature.properties.NAME
        store.setState(state);
    };

    // SELECT A DISTRICT
    function selectDistrict(e) {
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
            color=store.stateInfo.districts[district.properties.DISTRICT-1].winner.party=="R"?"#FF3131":"#0096FF"
            store.currentDistrict == parseInt(district.properties.DISTRICT)?color = "#fcba03":color=color
            if (store.displayIncumbentMap)
            {
                if (store.stateInfo.districts[district.properties.DISTRICT-1].incumbent.name == store.stateInfo.districts[district.properties.DISTRICT-1].winner.name 
                    || store.stateInfo.districts[district.properties.DISTRICT-1].incumbent.name == store.stateInfo.districts[district.properties.DISTRICT-1].loser.name)
                {
                    color = "#3C0949"
                }
            }
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
    let AZinteresting = <></>
    let OHinteresting = <></>

    if (store.statesGeoJSON)
    {
        if (store.currentState == '')
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
            // console.log("interesting")
            // console.log(AZDistrictsInteresting)
            // console.log("current")
            // console.log(store.currentStateJSON)
            AZ2020 = <>
            <GeoJSON key="10" data={store.currentStateJSON} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="11" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="12" data={store.statesGeoJSON[2].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
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
            AZinteresting = <>
            <GeoJSON key="28" data={AZDistrictsInteresting} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="29" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="30" data={store.statesGeoJSON[2].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
            OHinteresting = <>
            <GeoJSON key="31" data={OHDistrictsInteresting} style={districtStyle} onEachFeature={onEachDistrict} />
            <GeoJSON key="32" data={store.statesGeoJSON[1].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            <GeoJSON key="33" data={store.statesGeoJSON[0].geoJSON.features} style={stateStyle} onEachFeature={onEachState} />
            </>
        }
    }

    // LOGIC TO DISPLAY DIFF GEOJSON PRESETS
    
    function renderSwitch() {
        if (store.currentState == '') {
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
                case "Interesting Geo Variation":
                        {
                            switch (store.currentState) {
    
                                case "Arizona":
                                    return AZinteresting;
                                case "Colorado":
                                    return CO2022;
                                case "Ohio":
                                    return OHinteresting;
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
            <MapContainer center={[40.4, -80.9]} zoom={store.zoom} minZoom={4} maxBounds={[[50.175, -130.292], [20, -20.722]]}
                scrollWheelZoom={true} style={{ position: 'fixed' }}>
                <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                <Component />
                {renderSwitch()}
            </MapContainer >
        </Box >


    );
}



export default RenderMap;
