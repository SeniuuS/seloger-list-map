import React from "react";

class LocationInfo extends React.Component {
    render() {
        return <>
            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-0">{this.props.info}</h6>
                        <p className="mb-0 opacity-75">{this.props.link}</p>
                    </div>
                    <small className="opacity-50 text-nowrap">{this.props.index}</small>
                </div>
            </a>
        </>;
    }
}

export default LocationInfo;