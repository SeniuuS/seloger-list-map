import React from "react";

const SelectedLocationInfo = ({ currentLocation }) => {
    return (
        <div>
            <h3>{currentLocation.city}</h3>
            <ul>
                {currentLocation.urls.map((url, idx) => (
                    <li key={idx}>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color: 'blue', textDecoration: 'underline'}}
                        >
                            {url}
                        </a>
                    </li>
                ))}
            </ul>
            <p>
                <strong>Coordinates:</strong>
                <br/>
                Lat: {currentLocation.location.lat.toFixed(5)},
                Lng: {currentLocation.location.lng.toFixed(5)}
            </p>
            {currentLocation.route &&
                <p>
                    <strong>Trajet:</strong>
                    <br/>
                    {currentLocation.route.duration} de {currentLocation.route.targetAddress}
                </p>
            }
            <a
                href={`https://www.google.com/maps?q=${currentLocation.location.lat},${currentLocation.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{color: 'blue', textDecoration: 'underline'}}
            >
                Open in Google Maps
            </a>
        </div>
    );
};

export default SelectedLocationInfo;