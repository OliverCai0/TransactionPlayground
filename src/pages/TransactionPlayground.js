import { useState, useRef } from 'react';
import { ethereum, web3, ethers } from './coinbaseIntegrations'
import { Button, Input, Typography, Layout } from 'antd'

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
        <Layout style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "75%", width: "100%", maxWidth: "1000px"}}>
            <Layout.Header>
                <Typography.Title> Transaction Playground </Typography.Title>
            </Layout.Header>
            <Typography.Text style={{textAlign: "center"}} strong={true}> Test contract invocations against the coinbase wallet extension. No sending enabled. </Typography.Text>
            {!walletAddress && <Button onClick={connectWallet} style={styles.button}>
                Connect Coinbase Wallet
            </Button>}
            {walletAddress && <Typography.Text style={{textAlign: "center"}}>Connected to {walletAddress}</Typography.Text>}
            <Layout.Content>
            <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", height: "50%", width: "75%", maxWidth: "500px"}}>
                <label style={{...styles.container , justifyContent: "center"}}>
                    <Typography.Text  style={{width : "15%", textAlign: "left"}}>To</Typography.Text > <Input id="to" style={styles.input}/>
                </label>
                <label style={{...styles.container , justifyContent: "center"}}>
                    <Typography.Text  style={{width : "15%", textAlign: "left"}}>Val</Typography.Text > <Input id="value" style={styles.input}/>
                </label>
                <label style={{...styles.container , justifyContent: "center", flex: ".5"}}>
                    <Typography.Text  style={{width : "15%", textAlign: "left"}}>Data</Typography.Text > <Input.TextArea id="data" style={{...styles.input, height: "75%"}}></Input.TextArea>
                </label>
            </form>
            <Button onClick={signTransaction} style={styles.button} ref={signButton}> Sign</Button>
            </Layout.Content>
        </Layout>
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