import axios from "axios";

const MapService = {
    getLocationsForGoogleSheet: async (sheetId)=> {
        const response = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1`,
            {
                params: {
                    key: process.env.REACT_APP_SHEET_KEY,
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
                    const city = htmlDoc.querySelector('.Localizationstyled__City-sc-gdkcr2-1')?.textContent;
                    console.log(city);
                    if (city) {
                        if (!results[city]) results[city] = [];
                        results[city].push(url); // Add the URL to the city's list
                    }
                } catch (error) {
                    console.error('Error fetching the page:', error);
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
                                key: process.env.REACT_APP_MAP_KEY,
                            },
                        });
                        const geocode = res.data.results[0]?.geometry.location;
                        return [city, { location: geocode, urls }];
                    } catch {
                        return {city, location: null};
                    }
                })
            ));

        return geolocated;
    }
}

export default MapService;