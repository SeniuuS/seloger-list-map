import React, {useState} from 'react';
import MapComponent from './components/map/MapComponent';
import MapService from "./services/MapService";
import Header from "./components/structure/Header";

const App = () => {
    const [locations, setLocations] = useState([]);

    // Process data from Google Sheets
    const processGoogleSheet = async (sheetId) => {
        try {
            console.log(sheetId);
            const geolocated = await MapService.getLocationsForGoogleSheet(sheetId);
            setLocations(geolocated);
        } catch (error) {
            console.error('Error fetching Google Sheets data', error);
        }
    };

    return (
        <div>
            <Header processGoogleSheet={processGoogleSheet} />
            <MapComponent locations={locations} mapKey={process.env.REACT_APP_MAP_KEY}/>
        </div>
    );
};

export default App;