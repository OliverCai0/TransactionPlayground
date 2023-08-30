import { useRef, useState } from 'react'
import { ethereum, web3, ethers } from './coinbaseIntegrations'

let ElonMarkBackground = require( '../elonvsmusk.png' )

export const ElonMuskVsMark = () => {

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

    const muskButton = useRef();
    const markButton = useRef();

    return(
        <div
        //  src={ElonMarkBackground}
         style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${ElonMarkBackground})`,
            flexDirection: "row",
            backgroundSize: "cover",
            backgroundPositionX: "center",
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
                    Welcome to Rome
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
                    Click to transfer 0.01 ETH to the pool and receive a free Elon or Zuck NFT.
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
                    ref={muskButton}
                    id='musk'
                    // onMouseOver={fadeInAnimation}
                    // onMouseLeave={fadeOutAnimation}
                >
                    <h2
                    style={{
                        fontSize: "xx-large"
                    }}
                    >Musk</h2>
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
                    ref={markButton}
                    id='mark'
                    // onMouseOver={fadeInAnimation}
                    // onMouseLeave={fadeOutAnimation}
                >
                    <h2
                    style={{
                        fontSize: "xx-large"
                    }}
                    >Zuck</h2>
                </button>
                </div>
            </div>
         </div>
    )
}

