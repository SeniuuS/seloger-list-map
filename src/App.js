import React, {useState} from 'react';
import MapService from "./services/MapService";
import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import Body from "./components/structure/Body";

const App = () => {
    const [locations, setLocations] = useState([]);

    // Process data from Google Sheets
    const processGoogleSheet = async (sheetId) => {
        try {
            const geolocated = await MapService.getLocationsForGoogleSheet(sheetId);
            setLocations(geolocated);
        } catch (error) {
            console.error('Error fetching Google Sheets data', error);
        }
    };

    const calculateDistance = async (targetAddress) => {
        if (!targetAddress || locations.length === 0) return;
        try {
            const updatedLocationsWithDistance = await MapService.getDistancesForLocation(locations, targetAddress);
            setLocations(updatedLocationsWithDistance);
        } catch (error) {
            console.error('Error fetching Google Sheets data', error);
        }
    }

    return (
        <>
            <Header processGoogleSheet={processGoogleSheet} calculateDistance={calculateDistance} />
            <Body locations={locations} />
            <Footer />
        </>
    );
};

export default App;