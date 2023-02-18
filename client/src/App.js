import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeScreen
} from './components'

/*
    This is our application's top-level component.
    
*/
const App = () => {   
    return (
        <BrowserRouter>
            <GlobalStoreContextProvider>              
                <AppBanner />
                <Switch>
                    <Route path="/" exact component={HomeScreen} />
                </Switch>
            </GlobalStoreContextProvider>
        </BrowserRouter>
    )
}

export default App