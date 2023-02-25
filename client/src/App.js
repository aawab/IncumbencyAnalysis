import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeScreen
} from './components'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

/*
    This is our application's top-level component.

*/

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <GlobalStoreContextProvider>
                    <AppBanner />
                    <Routes>
                        <Route path="/" exact element={<HomeScreen />} />
                    </Routes>
                </GlobalStoreContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
