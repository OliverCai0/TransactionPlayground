import { useState, useRef } from 'react';
import { ethereum, web3, ethers } from './coinbaseIntegrations'

export const TransactionPlayground = () => {

    const [ walletAddress, setWalletAddress] = useState(null);
    const signButton = useRef();

    const signTransaction = async() => {
        signButton.current.disabled = true;
        console.log("In signTransaction");
        console.log("Got From");
        let nonce;
        let signer;
        try{
            signer = await web3.getSigner();
            nonce  = await web3.getTransactionCount(signer.address);
        }
        catch(e){
            console.log("Error retrieving nonce", e);
            alert(e);
            signButton.current.disabled = false;
            return;
        }
        console.log("Nonce", nonce);
        console.log("Value", document.getElementById("value").value);

        try{
            const signed = await signer.signTransaction({
                nonce: nonce,
                from: signer.address,
                to: document.getElementById("to").value,
                data: document.getElementById("data").value,
                value: parseInt(document.getElementById("value").value),
            });
            // signer.sendTransaction(tx);
        }
        catch(e){
            console.log("Could not sign", e);
            alert(e)
            signButton.current.disabled = false;
            return;
        }
        finally{
            console.log("Left signTransaction");
        }
        signButton.current.disabled = false;
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
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "75%", width: "100%", maxWidth: "1000px"}}>
            <h1> Transaction Playground </h1>
            <h3 style={{textAlign: "center"}}> Test contract invocations against the coinbase wallet extension. No sending enabled. </h3>
            {!walletAddress && <button onClick={connectWallet} style={styles.button}>
                Connect Coinbase Wallet
            </button>}
            {walletAddress && <h4 style={{textAlign: "center"}}>Connected to {walletAddress}</h4>}
            <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", height: "50%", width: "75%", maxWidth: "500px"}}>
                <label style={{...styles.container , justifyContent: "center"}}>
                    <div style={{width : "15%", textAlign: "left"}}>To</div> <input id="to" style={styles.input}/>
                </label>
                <label style={{...styles.container , justifyContent: "center"}}>
                    <div style={{width : "15%", textAlign: "left"}}>Val</div> <input id="value" style={styles.input}/>
                </label>
                <label style={{...styles.container , justifyContent: "center", flex: ".5"}}>
                    <div style={{width : "15%", textAlign: "left"}}>Data</div> <textarea id="data" style={{...styles.input, height: "75%"}}></textarea>
                </label>
            </form>
            <button onClick={signTransaction} style={styles.button} ref={signButton}> Sign</button>
        </div>
    );
}

const styles = {
    button : {
        width: "50%",
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