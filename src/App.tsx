import React from 'react';
import {Map} from './ui/Map/Map'
import {RequestList} from "./ui/Requests/RequestsList/RequestList";

function App() {
    return (
        <div className="App">
            <RequestList />
            <Map />
        </div>
    );
}

export default App;
