import { ethereum, web3, ethers } from './coinbaseIntegrations'

export const TransactionPlayground = () => {

    const signTransaction = async() => {
        console.log("In signTransaction");
        const from = document.getElementById("from").value;
        console.log("Got From");
        let nonce;
        try{
            nonce  = await web3.getTransactionCount(from);
        }
        catch(e){
            console.log("Error retrieving nonce", e);
        }
        console.log("Nonce", nonce);

        const tx = new ethers.Transaction({
            nonce,
            from,
            to: document.getElementById("to").value,
            data: document.getElementById("data").value,
        })

        try{
            const signer = await web3.getSigner();
            const signed = await signer.signTransaction(tx);
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
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", height: "50vh"}}>
            <h1> Transaction Playground </h1>
            <button onClick={connectWallet} style={{ width: "50vh"}}>
                Connect Coinbase Wallet
            </button>
            <form style={{display: "flex", flexDirection: "column"}}>
                <label>
                    <div>From</div> <input id="from" style={{ width: "50vh"}}/>
                </label>
                <label>
                    <div>To</div> <input id="to" style={{ width: "50vh"}}/>
                </label>
                <label>
                    <div>Data</div> <textarea id="data" style={{ width: "50vh"}}></textarea>
                </label>
            </form>
            <button onClick={signTransaction} style={{ width: "50vh"}}> Sign</button>
        </div>
    );
}