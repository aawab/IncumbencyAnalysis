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
    SET_DISTRICT: "SET_DISTRICT",
    SET_DEMOGRAPHIC: "SET_DEMOGRAPHIC",
    SET_PLAN: "SET_PLAN",
    SET_TAB: "SET_TAB",
    SET_DISTRICT_CHANGE_TAB: "SET_DISTRICT_CHANGE_TAB",
    SET_INCUMBENT_TABLE_PAGE: "SET_INCUMBENT_TABLE_PAGE",
    SET_PLANS_LIST: "SET_PLANS_LIST",
    SET_GEOJSON: "SET_GEOJSON",
    SET_STATES_GEOJSON: "SET_STATES_GEOJSON",
    SET_ENSEMBLE_GRAPH: "SET_ENSEMBLE_GRAPH",
    RESET_ALL: "RESET_ALL",
    RESET_STATE: "RESET_STATE"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentState: "",
        currentDistrict: null,
        currentPlan: "2022",
        currentGraph: null,
        zoom: 4,
        tab: 1,
        currentIncumbentTablePage: 0,
        view: "map",
        plansList: [],
        currentStateJSON: {features:{}},
        statesGeoJSON: null,
        ensembleInfo: null,
        stateInfo: null
    });

    // console.log("inside useGlobalStore");

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case ActionType.SET_STATE: {
                return setStore({
                    ...store,
                    currentState: payload.state,
                    currentDistrict: payload.district,
                    currentIncumbentTablePage : payload.page,
                    currentStateJSON: payload.geojson,
                    ensembleInfo: payload.ensembleInfo,
                    stateInfo: payload.stateInfo,
                    currentGraph: "summary"
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
                    currentPlan: payload.name,
                    currentStateJSON: payload.geojson,
                    stateInfo: payload.stateInfo
                });
            }
            case ActionType.SET_DEMOGRAPHIC: {
                return setStore({
                    ...store,
                    currentDemographic:payload,
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
            case ActionType.SET_ENSEMBLE_GRAPH: {
                return setStore({
                    ...store,
                    currentGraph: payload
                });
            }
            case ActionType.RESET_ALL: {
                return setStore({
                    ...store,
                    currentState: "",
                    currentDistrict: null,
                    currentPlan: "2022",
                    currentDemographic: "",
                    tab: 1,
                    currentIncumbentTablePage: 0,
                    view: "map",
                    plansList: [],
                    currentStateJSON: null,
                    statesGeoJSON: store.statesGeoJSON,
                    ensembleInfo: null,
                    stateInfo: null,
                    zoom: 4
                });
            }
            case ActionType.RESET_STATE: {
                return setStore({
                    ...store,
                    currentDistrict: null
                });
            }
            default:
                return store;
        }
    }

    // All store functions here

    store.setState = async function(state) {
        console.log(state)
        Promise.all([
            fetch("http://localhost:8080/distPlan/" + state, {credentials:'include'}).then(value => value.json()),
            fetch("http://localhost:8080/ensemble/" + state, {credentials:'include'}).then(value => value.json())
            ])
            .then((value) => {
                console.log(value)
               const distPlan = value[0]
               const ensembleInfo = value[1]
               storeReducer({
                type: ActionType.SET_STATE,
                payload: { state: state, district: null,
                page: 0, geojson: distPlan.geoJSON, stateInfo: distPlan, ensembleInfo: ensembleInfo}
            });
            })
            .catch((err) => {
                console.log(err);
            });

    }

    store.setDistrict = (district) => {
        console.log("district")
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
        storeReducer({
            type: ActionType.SET_TAB,
            payload: tab
        });
    }

    store.setDemographic = (demographic) => {
        storeReducer({
            type: ActionType.SET_DEMOGRAPHIC,
            payload: demographic
        });
    }

    store.setIncumbentTablePage = (page) => {
        storeReducer({
            type: ActionType.SET_INCUMBENT_TABLE_PAGE,
            payload: page
        });
    }

    store.setDistrictAndChangeTab = (districtNum) => {
        console.log("setDistrictAndChangeTab")
        storeReducer({
            type: ActionType.SET_DISTRICT_CHANGE_TAB,
            payload:
            {
                district: districtNum,
                tab: 2
            }
        });
    }

    store.resetAll = () => {
        storeReducer({
            type: ActionType.RESET_ALL,
            payload: null
        });
    }

    store.resetState = () => {
        storeReducer({
            type: ActionType.RESET_STATE,
            payload: null
        });
    }

    store.getStates = () => {
        console.log("getStates")
        fetch("http://localhost:8080/states", {credentials:'include'})
        .then(res=> res.json())
        .then(
            (response) => {
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

    store.setPlan = async function(plan) {
        console.log("setPlan")
        await fetch("http://localhost:8080/plan/" + plan, {credentials:'include'})
        .then(res=> res.json())
        .then(
            (response) => {
                console.log(response)
                storeReducer({
                    type: ActionType.SET_PLAN,
                    payload: {name: response.name, geojson: response.geoJSON, stateInfo: response}
                });
            },
            (error) => {
                alert(error);
            }
        )
    }

    store.setEnsembleGraph = (graph) => {
        storeReducer({
            type: ActionType.SET_ENSEMBLE_GRAPH,
            payload: graph
        });
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
