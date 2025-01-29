import React from "react";

class LocationInfo extends React.Component {

    clickLocationInfo = () => {
        this.props.clickLocationInfo(this.props.city, this.props.data);
    }

    render() {
        return <>
            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={this.clickLocationInfo}>
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-0"><strong>{this.props.city}</strong></h6>
                        <p className="mb-0 opacity-75">{this.props.data.urls}</p>
                    </div>
                    <small className="opacity-50 text-nowrap">{this.props.data.route && <strong>{this.props.data.route.duration}</strong>}</small>
                </div>
            </a>
        </>;
    }
}

export default LocationInfo;