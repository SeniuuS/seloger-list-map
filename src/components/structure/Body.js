import MapComponent from "../map/MapComponent";
import React, {useState} from "react";
import LocationInfo from "../map/LocationInfo";

class Body extends React.Component {
    state = {
        selectedLocation: null,
    }

    clickLocationInfo = (city, data) => {
        if (data && city) {
            this.setState({selectedLocation: {city, urls: data.urls, location: data.location, route: data.route}});
        } else {
            this.setState({selectedLocation: null});
        }
    }

    render() {
        return <div className={"row"}>
            <div className={"col-md-4"}>
                <div className="list-group p-1">
                    {Object.entries(this.props.locations).map(([city, data], index) => (
                        <LocationInfo clickLocationInfo={this.clickLocationInfo} city={city} data={data} index={index + 1} />
                    ))}
                </div>
            </div>
            <div className={"col-md-8"}>
                <MapComponent currentSelectLocation={this.state.selectedLocation} locations={this.props.locations} mapKey={process.env.REACT_APP_MAP_KEY} setSelectedLocation={this.clickLocationInfo} />
            </div>
        </div>
    }
}

export default Body;