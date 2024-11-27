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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Google Sheet URL:</label>
                <input
                    type="text"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="Enter the Google Sheet URL"
                />
            </div>
            <button type="submit">Process Sheet</button>
        </form>
    );
};

export default UploadGoogleSheet;