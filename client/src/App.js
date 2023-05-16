import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeScreen
} from './components'
import { ThemeProvider, createTheme } from '@mui/material/styles';

/*
    This is our application's top-level component.

*/

const App = () => {
    return (
            <BrowserRouter>
                <GlobalStoreContextProvider>
                    <Routes>
                        <Route path="/" exact element={<HomeScreen />} />
                    </Routes>
                </GlobalStoreContextProvider>
            </BrowserRouter>
    )
}

export default App
