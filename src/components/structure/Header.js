import React, {Component} from "react";
import UploadGoogleSheet from "../upload/UploadGoogleSheet";

class Header extends Component {

    processGoogleSheet = (sheetId) => {
        this.props.processGoogleSheet(sheetId);
    }

    render () {
        return <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <p className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none text-white">
                        <span className="fs-4">Carte des villes</span>
                    </p>

                    <UploadGoogleSheet onProcess={this.processGoogleSheet} />
                </div>
            </div>
        </header>;
    }
}

export default Header;