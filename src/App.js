import React, {useState} from 'react';
import UploadGoogleSheet from './UploadGoogleSheet';
import MapComponent from './MapComponent';
import axios from 'axios';

const SHEET_KEY = 'YOURKEY';
const MAP_KEY = 'YOURKEY';

const App = () => {
    const [locations, setLocations] = useState([]);

    // Process data from Google Sheets
    const processGoogleSheet = async (sheetId) => {
        try {
            const response = await axios.get(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1`,
                {
                    params: {
                        key: SHEET_KEY,
                    },
                }
            );
            const rows = response.data.values;
            const urls = rows.map(row => row[0]); // Assuming URLs are in the first column
            const results = {}; // Initialize a dictionary to hold city and URL data

            console.log(urls);

            // Fetch city names from SeLoger pages
            for (const url of urls) {
                if(url != null &&  url.startsWith('http')) {
                    try {
                        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                        const response = await axios.get(proxyUrl + url);
                        const parser = new DOMParser();
                        const htmlDoc = parser.parseFromString(response.data, 'text/html');
                        console.log(response.data);
                        const city = htmlDoc.querySelector('.Localizationstyled__City-sc-gdkcr2-1')?.textContent;
                        console.log(city);
                        if (city) {
                            if (!results[city]) results[city] = [];
                            results[city].push(url); // Add the URL to the city's list
                        }
                    } catch (error) {
                        console.error('Error fetching the page:', error);
                        return null;
                    }
                }
            }

            // Geolocate the cities
            const geolocated = Object.fromEntries(
                await Promise.all(
                    Object.entries(results).map(async ([city, urls]) => {
                    try {
                        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                            params: {
                                address: city,
                                key: MAP_KEY,
                            },
                        });
                        const geocode = res.data.results[0]?.geometry.location;
                        return [city, { location: geocode, urls }];
                    } catch {
                        return {city, location: null};
                    }
                })
            ));

            setLocations(geolocated);
        } catch (error) {
            console.error('Error fetching Google Sheets data', error);
        }
    };

    return (
        <div>
            <h1>Carte des villes SeLoger</h1>
            <UploadGoogleSheet onProcess={processGoogleSheet}/>
            <MapComponent locations={locations} mapKey={MAP_KEY}/>
        </div>
    );
};

export default App;