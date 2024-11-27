import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ locations, mapKey }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const mapContainerStyle = {
        width: '100%',
        height: '1200px',
    };

    const center = {
        lat: 48.8566, // Default center (Paris)
        lng: 2.3522,
    };

    return (
        <LoadScript googleMapsApiKey={mapKey}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={location.location}
                        onClick={() => setSelectedLocation(location)}
                    />
                ))}

                {selectedLocation && (
                    <InfoWindow
                        position={selectedLocation.location}
                        onCloseClick={() => setSelectedLocation(null)}
                    >
                        <div>
                            <h3>{selectedLocation.city}</h3>
                            <p>
                                <strong>Coordinates:</strong>
                                <br />
                                Lat: {selectedLocation.location.lat.toFixed(5)},
                                Lng: {selectedLocation.location.lng.toFixed(5)}
                            </p>
                            <a
                                href={`https://www.google.com/maps?q=${selectedLocation.location.lat},${selectedLocation.location.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'blue', textDecoration: 'underline' }}
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;