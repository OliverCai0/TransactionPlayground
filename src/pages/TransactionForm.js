import { ethereum, web3, ethers } from './coinbaseIntegrations'
import { Button, Input, Typography, Layout, Space } from 'antd'
import { useState, useRef } from 'react';

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
        console.log("Value", document.getElementById("value").value);

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
        <Layout.Content style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
        }}>
        <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"space-evenly", height: "75%", width: "85%", maxWidth: "600px"}}>
                    <label style={{...styles.container , justifyContent: "center"}}>
                        <Typography.Text  style={{width : "15%", textAlign: "left"}}>To</Typography.Text > <Input id="to" style={styles.input}/>
                    </label>
                    <label style={{...styles.container , justifyContent: "center"}}>
                        <Typography.Text  style={{width : "15%", textAlign: "left"}}>Val</Typography.Text > <Input id="value" style={styles.input}/>
                    </label>
                    <label style={{...styles.container , justifyContent: "center", flex: ".5"}}>
                        <Typography.Text  style={{width : "15%", textAlign: "left"}}>Data</Typography.Text > <Input.TextArea id="data" style={{...styles.input, height: "100%"}}></Input.TextArea>
                    </label>
        </form>
        <Button onClick={signTransaction} style={styles.button} ref={signButton}> Sign</Button>
        </Layout.Content>
    )
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