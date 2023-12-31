import { useState, useRef } from 'react';
import { ethereum, web3, ethers } from './coinbaseIntegrations'
import { TransactionForm } from './TransactionForm';
import { Link } from 'react-router-dom';
// import { MulticallForm } from './MulticallForm';
// import { Permit2Form } from './Permit2Form';

export const TransactionPlayground = () => {

    const [ walletAddress, setWalletAddress] = useState(null);
    const [ mode, setMode ] = useState("Multicall Mode");

    const changeMode = (e) => {
        console.log(e);
        setMode(e.target.innerHTML)
    }

    const connectWallet = async() => {
        const signer = await web3.getSigner()
        console.log(signer);
        if(ethereum.isConnected()  && !signer)
        {
            try {
                const response = await web3.send("eth_requestAccounts", []);
                console.log(response);
            }
            catch(e){
                alert("Unable to connect wallet")
                console.log(e);
                return;
            }
            finally{
                console.log("wallet connect flow done"); 
            }
        }
        if(signer)
        {
            setWalletAddress(signer.address);
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", maxWidth: "1000px", borderRadius: "15px", padding: "20px", backgroundColor: "#f4f0ec" }}>
            <h1 > Transaction Playground </h1>
            <p style={{textAlign: "center", padding: "7px", fontWeight: "bold"}} > Test contract invocations against the Coinbase wallet extension. Sending is enabled (do not press confirm)</p>
            <Link to="not-a-scam" relative='path'> Go to Example Phishing Website</Link>
            {!walletAddress && <button onClick={connectWallet} style={{...styles.button, margin: "5px"}}>
                Connect Coinbase Wallet
            </button>}
            {walletAddress && <p style={{textAlign: "center", padding: "5px", color: "#228B22"}}>Connected: {walletAddress}</p>}
            <div>
                {/* <button onClick={changeMode} disabled={mode=="Form Mode"} style={{...styles.button, margin: "5px"}}>Form Mode</button> 
                <button onClick={changeMode} disabled={mode=="Multicall Mode"} style={{...styles.button, margin: "5px"}}>Multicall Mode</button>
                <button onClick={changeMode} disabled={mode=="Permit2 Mode"} style={{...styles.button, margin: "5px"}}>Permit2 Mode</button> */}
            </div>
            <TransactionForm/>
            {/* {mode == "Form Mode" && <TransactionForm/>}
            {mode == "Multicall Mode" && <MulticallForm/>}
            {mode == "Permit2 Mode" && <Permit2Form/>} */}
        </div>
    );
}

const styles = {
    button : {
        border: "white",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "5px",
    },
    input : {
        width: "95%",
    },
    container : {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent:"center"
    }
}