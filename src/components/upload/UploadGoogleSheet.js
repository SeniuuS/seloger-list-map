import React, { useState } from 'react';

const UploadGoogleSheet = ({ onProcess }) => {
    const [sheetUrl, setSheetUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const sheetId = extractSheetId(sheetUrl);
        if (sheetId) {
            onProcess(sheetId);
        } else {
            alert('Invalid Google Sheet URL');
        }
    };

    const extractSheetId = (url) => {
        const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        return match ? match[1] : null;
    };

    return (
        <>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <label>Google Sheet URL:</label>
                    <input
                        type="text"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        placeholder="Enter the Google Sheet URL"
                        className="form-control form-control-dark text-bg-dark"
                    />
            </form>

            <div className="text-end">
                <br/>
                <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Process Sheet</button>
            </div>
        </>
    );
};

export default UploadGoogleSheet;