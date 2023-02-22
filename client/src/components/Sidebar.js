import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import './Sidebar.css';

/*
    This toolbar is a functional React component that
    manages any buttons
    
*/
function Sidebar() {
    const { store } = useContext(GlobalStoreContext);
    
    return (
        <>
            <div className={store.sidebarOpen ? 'sidebar-menu active' : 'sidebar-menu'}>
                <span> Test </span>
            </div>
        </>
    );
}

export default Sidebar;