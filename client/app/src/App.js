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
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Thoughtful Automation</p>
                    <a
                        className="App-link"
                        href="https://www.youtube.com/watch?v=D5_FHbdsjRc&list=PLmexTtcbIn_gP8bpsUsHfv-58KsKPsGEo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn Serverless
                    </a>
                </header> */}
            </div>
        </CookiesProvider>
    );
}

export default App;
