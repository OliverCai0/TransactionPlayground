import { useState, useRef } from 'react';
import { ethereum, web3, ethers } from './coinbaseIntegrations'
import { Button, Input, Typography, Layout, Space } from 'antd'
import { TransactionForm } from './TransactionForm';

export const TransactionPlayground = () => {

    const [ walletAddress, setWalletAddress] = useState(null);
    const [ mode, setMode ] = useState("Form Mode");

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
        <Layout style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", maxWidth: "1000px", borderRadius: "15px", padding: "20px" }}>
            <Typography.Title style={{}}> Transaction Playground </Typography.Title>
            <Typography.Text style={{textAlign: "center", padding: "7px"}} strong={true}> Test contract invocations against the coinbase wallet extension. No sending enabled. </Typography.Text>
            {!walletAddress && <Button onClick={connectWallet} style={{...styles.button, margin: "5px"}}>
                Connect Coinbase Wallet
            </Button>}
            {walletAddress && <Typography.Text style={{textAlign: "center", padding: "5px"}}>Connected: {walletAddress}</Typography.Text>}
            <Space.Compact>
                <Button onClick={changeMode} disabled={mode=="Form Mode"}>Form Mode</Button> <Button onClick={changeMode} disabled={mode=="Demo Mode"}>Demo Mode</Button>
            </Space.Compact>
            <TransactionForm></TransactionForm>
        </Layout>
    );
}

const styles = {
    button : {
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