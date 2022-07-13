import React from 'react';
import { CookiesProvider, useCookies } from "react-cookie";
import './App.css';
import Home from './components/Home';

function App() {
    const [cookies] = useCookies();
    return (
        <CookiesProvider>
            <div className="App" style={{ height: '100vh' }}>
                <Home isLoggedIn={cookies.isLoggedIn} />
            </div>
        </CookiesProvider>
    );
}

export default App;
