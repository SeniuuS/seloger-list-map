import React, {Component} from "react";
import UploadGoogleSheet from "../upload/UploadGoogleSheet";
import SpecifyTargetAddress from "../upload/SpecifyTargetAdress";

class Header extends Component {
    processGoogleSheet = (sheetId) => {
        this.props.processGoogleSheet(sheetId);
    }

    calculateDistance = (targetAddress) => {
        if (!targetAddress) return;
        this.props.calculateDistance(targetAddress);
    }

    render () {
        return <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <p className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-decoration-none text-white">
                        <span className="fs-3">Carte des villes</span>
                    </p>

                    <SpecifyTargetAddress onProcess={this.calculateDistance} />
                    <UploadGoogleSheet onProcess={this.processGoogleSheet} />
                </div>
            </div>
        </header>;
    }
}

export default Header;