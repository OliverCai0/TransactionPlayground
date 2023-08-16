import { ethereum, web3, ethers } from './coinbaseIntegrations'

export const TransactionPlayground = () => {

    const signTransaction = async() => {
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
        }
        finally{
            console.log("Left signTransaction");
        }
    }

    const connectWallet = async() => {
        const signer = await web3.hasSigner();
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
            }
            finally{
                console.log("wallet connect flow done");
            }
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "75%", width: "100%"}}>
            <h1> Transaction Playground </h1>
            <h3 style={{textAlign: "center"}}> Test contract invocations against the coinbase wallet extension. No sending enabled. </h3>
            <button onClick={connectWallet} style={styles.button}>
                Connect Coinbase Wallet
            </button>
            <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", height: "50%", width: "75%"}}>
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
            <button onClick={signTransaction} style={styles.button}> Sign</button>
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