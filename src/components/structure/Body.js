import MapComponent from "../map/MapComponent";
import React from "react";
import LocationInfo from "../map/LocationInfo";

class Body extends React.Component {
    render() {
        return <div className={"row"}>
            <div className={"col-md-4"}>
                <div className="list-group p-1">
                    {Object.entries(this.props.locations).map(([city, data], index) => (
                        <LocationInfo
                            link={data.urls}
                            info={city}
                            index={index + 1}
                        />
                    ))}
                </div>
            </div>
            <div className={"col-md-8"}>
                <MapComponent locations={this.props.locations} mapKey={process.env.REACT_APP_MAP_KEY}/>
            </div>
        </div>
    }
}

export default Body;