import { createContext, useContext, useState, useEffect } from 'react'
/*
    This is our global data store.
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const ActionType = {
    SET_STATE: "SET_STATE",
    SET_STATE_NO_DISTRICT: "SET_STATE_NO_DISTRICT",
    SET_DISTRICT: "SET_DISTRICT",
    SET_DEMOGRAPHIC: "SET_DEMOGRAPHIC",
    SET_PLAN: "SET_PLAN",
    SET_ZOOM: "SET_ZOOM",
    SET_TAB: "SET_TAB",
    SET_DISTRICT_CHANGE_TAB: "SET_DISTRICT_CHANGE_TAB",
    SET_INCUMBENT_TABLE_PAGE: "SET_INCUMBENT_TABLE_PAGE",
    SET_VIEW: "SET_VIEW",
    SET_PLANS_LIST: "SET_PLANS_LIST",
    SET_GEOJSON: "SET_GEOJSON",
    SET_STATES_GEOJSON: "SET_STATES_GEOJSON",
    RESET: "RESET"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentState: "",
        currentDistrict: null,
        currentPlan: "2022",
        currentDemographic: "",
        pannedToState: false,
        zoom: 4,
        tab: 1,
        currentIncumbentTablePage: 0,
        view: "map",
        plansList: [],
        currentStateJSON: {features:{}},
        statesGeoJSON: null
    });

    console.log("inside useGlobalStore");

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case ActionType.SET_ZOOM: {
                return setStore({
                    ...store,
                    zoom: payload
                });
            }
            case ActionType.SET_STATE: {
                return setStore({
                    ...store,
                    currentState: payload.state,
                    pannedToState: payload.pannedToState,
                    zoom: payload.zoom,
                });
            }
            case ActionType.SET_STATE_NO_DISTRICT: {
                return setStore({
                    ...store,
                    currentState: payload.state,
                    pannedToState: payload.pannedToState,
                    zoom: payload.zoom,
                    currentDistrict: payload.district,
                    currentIncumbentTablePage : payload.page,
                    currentStateJSON: payload.geojson
                });
            }
            case ActionType.SET_DISTRICT: {
                return setStore({
                    ...store,
                    currentDistrict: payload
                });
            }
            case ActionType.SET_DISTRICT_CHANGE_TAB: {
                return setStore({
                    ...store,
                    currentDistrict: payload.district,
                    tab: payload.tab
                });
            }
            case ActionType.SET_TAB: {
                return setStore({
                    ...store,
                    tab: payload
                });
            }
            case ActionType.SET_INCUMBENT_TABLE_PAGE: {
                return setStore({
                    ...store,
                    currentIncumbentTablePage: payload
                });
            }
            case ActionType.SET_PLAN: {
                return setStore({
                    ...store,
                    currentDistrict:null,
                    currentPlan: payload
                });
            }
            case ActionType.SET_DEMOGRAPHIC: {
                return setStore({
                    ...store,
                    currentDemographic:payload,
                });
            }
            case ActionType.SET_VIEW: {
                return setStore({
                    ...store,
                    view: payload,
                    tab: 1
                });
            }
            case ActionType.SET_PLANS_LIST: {
                return setStore({
                    ...store,
                    plansList: payload
                });
            }
            case ActionType.SET_GEOJSON: {
                return setStore({
                    ...store,
                    currentStateJSON: payload
                });
            }
            case ActionType.SET_STATES_GEOJSON: {
                return setStore({
                    ...store,
                    statesGeoJSON: payload
                });
            }
            case ActionType.RESET: {
                return setStore({
                    currentState: "",
                    currentDistrict: null,
                    currentPlan: "2022",
                    pannedToState: false,
                    zoom: 4,
                    tab: 1,
                    currentIncumbentTablePage: 0,
                    view: "map",
                    plansList: [],
                    currentStateJSON: store.currentStateJSON
                });
            }
            default:
                return store;
        }
    }

    // All store functions here

    store.setZoom = (zoom) => {
        console.log(zoom + " store is set ");
        storeReducer({
            type: ActionType.SET_ZOOM,
            payload: zoom
        }, () => { console.log(store.zoom + " store zoom"); });
    }

    store.setState = (state, pannedToState) => {
        console.log("Current state: " + state);
        storeReducer({
            type: ActionType.SET_STATE,
            payload: { state: state, pannedToState: pannedToState, zoom: 8 }
        });
    }

    store.setStateNoDistrict = async function(state, pannedToState) {
        console.log("Current state: " + state);

        await fetch("http://localhost:8080/state/" + state, {credentials:'include'})
        .then(res=>res.json())
        .then(
            (response) => {
                console.log(response)
            },
            (error) => {
                alert(error);
            }
        )

        await fetch("http://localhost:8080/" + state + store.currentPlan)
        .then(res=>res.json())
        .then(
            (geojson) => {
                console.log(geojson)
                storeReducer({
                    type: ActionType.SET_STATE_NO_DISTRICT,
                    payload: { state: state, pannedToState: pannedToState, zoom: 8, district: null, 
                        page: 0, geojson: geojson }
                });
            },
            (error) => {
                alert(error);
            }
        )
    }

    store.setDistrict = (district) => {
        console.log("currentDistrict " + district);
        storeReducer({
            type: ActionType.SET_DISTRICT,
            payload: district
        });
    }

    store.getPlansList = () => {
        fetch("http://localhost:8080/plans")
        .then(res=> res.json())
        .then(
            (response) => {
                console.log(response)
                storeReducer({
                    type: ActionType.SET_PLANS_LIST,
                    payload: response
                })
            },
            (error) => {
                alert(error);
            }
        )
    }

    store.setTab = (tab) => {
        console.log("Current tab: " + tab);
        storeReducer({
            type: ActionType.SET_TAB,
            payload: tab
        });
    }

    store.setDemographic = (demographic) => {
        console.log("Current demographic: " + demographic);
        storeReducer({
            type: ActionType.SET_DEMOGRAPHIC,
            payload: demographic
        });
    }

    store.setIncumbentTablePage = (page) => {
        console.log("Current page: " + page);
        storeReducer({
            type: ActionType.SET_INCUMBENT_TABLE_PAGE,
            payload: page
        });
    }

    store.setDistrictAndChangeTab = (districtNum) => {
        console.log("currentDistrict " + districtNum)
        storeReducer({
            type: ActionType.SET_DISTRICT_CHANGE_TAB,
            payload:
            {
                district: districtNum,
                tab: 2
            }
        });
    }

    store.setPlan = (plan) => {
        storeReducer({
            type: ActionType.SET_PLAN,
            payload: plan
        });
    }

    store.changeView = () => {
        let newView=(store.view === "ensemble")? "map":"ensemble"
        storeReducer({
            type: ActionType.SET_VIEW,
            payload: newView
        });
    }

    store.reset = () => {
        storeReducer({
            type: ActionType.RESET,
            payload: null
        });
    }

    store.getStates = () => {
        fetch("http://localhost:8080/states", {credentials:'include'})
        .then(res=> res.json())
        .then(
            (response) => {
                // console.log((JSON.parse(response[0].geoJSON)).features)
                storeReducer({
                    type: ActionType.SET_STATES_GEOJSON,
                    payload: response
                });
            },
            (error) => {
                alert(error);
            }
        )
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
