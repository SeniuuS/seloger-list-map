import React, { useState } from 'react';
import {APIProvider, Map, AdvancedMarker, InfoWindow, Pin} from "@vis.gl/react-google-maps";
import SelectedLocationInfo from "./SelectedLocationInfo";

const MapComponent = ({ locations, currentSelectLocation, mapKey, setSelectedLocation }) => {
    return (
        <APIProvider apiKey={mapKey}>
            <Map
                mapId={process.env.REACT_APP_MAP_ID}
                style={{width: '100%', height: '800px'}}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                defaultCenter={ {lat: 48.8566, lng: 2.3522 } } // Default center (Paris)
                defaultZoom={10}
            >
                {Object.entries(locations).map(([city, data], index) => (
                    <AdvancedMarker
                        key={index}
                        position={data.location}
                        onClick={() => setSelectedLocation(city, data)}>
                        <Pin
                            background={'#0f679d'}
                            borderColor={'#006461'}
                            glyphColor={'#ffffff'}
                        />
                    </AdvancedMarker>
                ))}

                {currentSelectLocation && (
                    <InfoWindow
                        position={currentSelectLocation.location}
                        onCloseClick={() => setSelectedLocation(null, null)}
                    >
                        <SelectedLocationInfo currentLocation={currentSelectLocation} />
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
    );
};

export default MapComponent;