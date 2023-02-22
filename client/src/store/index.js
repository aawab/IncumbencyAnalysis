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
    PLACEHOLDER: "PLACEHOLDER",
    SET_ZOOM: "SET_ZOOM",
    SET_SIDEBAR_STATUS: "SET_SIDEBAR_STATUS"
}

const CurrentModal = {
    NONE: "NONE",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        sidebarOpen: false,
        placeholder: "placeholder",
        zoom: 4
    });
    const history = useNavigate();

    console.log("inside useGlobalStore");

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case ActionType.PLACEHOLDER: {
                return setStore({
                    placeholder: "blah"
                })
            }
            case ActionType.SET_ZOOM: {
                return setStore({
                    ...store,
                    zoom: payload
                })
            }
            case ActionType.SET_SIDEBAR_STATUS: {
                return setStore({
                    ...store,
                    sidebarOpen: payload
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

    store.setSidebarStatus = (status) =>
    {
        console.log("Current status of sidebar: " + status);
        storeReducer({
            type: ActionType.SET_SIDEBAR_STATUS,
            payload: status
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
