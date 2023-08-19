import { ethereum, web3, ethers } from './coinbaseIntegrations'
import { useRef } from 'react';

export const TransactionForm = () => {
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
        console.log("Value", parseInt(document.getElementById("value").value));
        console.log("Value", document.getElementById("data").value);

        try{
            const signed = await signer.signTransaction({
                nonce: nonce,
                from: signer.address,
                to: document.getElementById("to").value,
                data: document.getElementById("data").value,
                value: parseInt(document.getElementById("value").value),
            });
        }
        catch(e){
            console.log("Could not sign", e);
        }
        finally{
            console.log("Left signTransaction");
        }
        signButton.current.disabled = false;
    }

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "80%"
        }}>
        <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"space-evenly", height: "75%", width: "85%", maxWidth: "600px"}}>
                    <label style={{...styles.container , justifyContent: "center"}}>
                        <p  style={{width : "15%", textAlign: "left"}}>To</p > <input id="to" style={styles.input}/>
                    </label>
                    <label style={{...styles.container , justifyContent: "center"}}>
                        <p  style={{width : "15%", textAlign: "left"}}>Val</p > <input id="value" style={styles.input}/>
                    </label>
                    <label style={{...styles.container , justifyContent: "center", flex: ".5"}}>
                        <p style={{width : "15%", textAlign: "left"}}>Data</p > <textarea id="data" style={{...styles.input, height: "100%"}}></textarea>
                    </label>
        </form>
        <button onClick={signTransaction} style={{...styles.button, width: "50%"}} ref={signButton}> Sign</button>
        </div>
    )
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