import React, {useState} from "react";

function SpecifyTargetAddress({ onProcess }) {
    const [targetAddress, setTargetAddress] = useState(process.env.REACT_APP_DEFAULT_TARGET_ADDRESS);

    const handleSubmit = () => {
        if (!targetAddress) return;
        onProcess(targetAddress);
    }

    return <>
        <form className="col-8 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <label>Target Address :</label>
            <input
                type="text"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
                className="form-control form-control-dark text-bg-dark"
            />
        </form>

        <div className="text-end me-lg-auto">
            <br/>
            <button type="submit" className="btn btn-info" onClick={handleSubmit}>Calculate distance</button>
        </div>
    </>;
}

export default SpecifyTargetAddress;