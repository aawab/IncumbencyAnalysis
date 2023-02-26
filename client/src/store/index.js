import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    SET_PLAN: "SET_PLAN",
    SET_ZOOM: "SET_ZOOM",
    SET_TAB: "SET_TAB",
    SET_DISTRICT_CHANGE_TAB: "SET_DISTRICT_CHANGE_TAB"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentState: "",
        currentDistrict: null,
        currentPlan:"2022",
        pannedToState:false,
        zoom: 4,
        tab: 1        
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
                })
            }
            case ActionType.SET_STATE: {
                return setStore({
                    ...store,
                    currentState: payload.state,
                    statePanned: payload.statePanned,
                    zoom: payload.zoom
                })
            }
            case ActionType.SET_DISTRICT: {
                return setStore({
                    ...store,
                    currentDistrict: payload
                })
            }
            case ActionType.SET_DISTRICT_CHANGE_TAB: {
                return setStore({
                    ...store,
                    currentDistrict: payload.district,
                    tab: payload.tab
                })
            }
            case ActionType.SET_TAB: {
                return setStore({
                    ...store,
                    tab: payload
                })
            }
            case ActionType.SET_PLAN: {
                return setStore({
                    ...store,
                    currentPlan: payload
                })
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
        });
    }

    store.setState = (state, statePanned) =>
    {
        // CHANGED A BIT TO ADD STATEPANNED AS A BOOLEAN TO MAKE SURE PANNING TO STATE ONLY HAPPENS ON INITIAL
        // SELECTION AND NOT FOREVER AFTER SELECTING A STATE(cant zoom or move if we remove this)
        console.log("Current state: " + state);
        storeReducer({
            type: ActionType.SET_STATE,
            payload: {state: state, statePanned: statePanned, zoom: 8}
        });
    }

    store.setDistrict = (district) =>
    {
        console.log("Current district: " + district);
        storeReducer({
            type: ActionType.SET_DISTRICT,
            payload: district
        });
    }


    store.setTab = (tab) =>
    {
        console.log("Current tab: " + tab);
        storeReducer({
            type: ActionType.SET_TAB,
            payload: tab
        });
    }

    store.setDistrictAndChangeTab = (districtNum) =>
    {
        storeReducer({
            type: ActionType.SET_DISTRICT_CHANGE_TAB,
            payload:
            {
                district: districtNum,
                tab: 2
            } 
        });
    }

    store.setPlan = (plan) =>
    {
        storeReducer({
            type: ActionType.SET_PLAN,
            payload: plan
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
