import React from 'react'
import useEth from "../../contexts/EthContext/useEth";

const Background = () => {
    const { state: { accounts } } = useEth();
    return (
        <div>
            <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>

            <p style={{ color: "white" }}>
                Account : {accounts ? accounts : "Not connected"}
            </p>
        </div>
    )
}
export default Background;