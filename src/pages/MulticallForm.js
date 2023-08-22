import { useState, useRef } from "react"
import { ethereum, web3, ethers } from './coinbaseIntegrations'
import { ERC20Form } from "./FunctionForm.js/ERC20Form";
import { erc20String } from "./abi/erc20ABI";

export const MulticallForm = () => {

    const delegateCall = new ethers.Interface(`[{"inputs":[{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct MultiDelegatecall.Call[]","name":"calls","type":"tuple[]"}],"name":"aggregate","outputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"bytes[]","name":"returnData","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"}]`)
    const erc20 = new ethers.Interface(erc20String)

    const [formData, setFormData] = useState({
        ['0'] : {
            addressTarget: "",
            functionName: "approve",
            data : {
                spender: "",
                amount: "",
            },
        },
    });
    // const [numOfForms, setNumOfForms] = useState(0);


    const FORMCSS = {
        width : "100%",
        height: "50%",
        backgroundColor: "white",
        borderBottom: "solid",
    };


    const createNewCallButton = useRef();
    const parentOfForms = useRef();
    const signButton = useRef();

    const signMultiCall = async() => {
        // signButton.current.disabled = true;
        console.log(formData)
        let calls = new Array()

       for(const [key, value] of Object.entries(formData)){
        console.log(value);
        // Encode the function data, only approve for now
       const encodedCallData = erc20.encodeFunctionData("approve",
            [
                value["data"]["spender"],
                value["data"]["amount"],
            ]
        )

        console.log("encoded call data", encodedCallData);

        // Attach the encoded function data to an "aggregate" call
        calls.push({
            target: value["addressTarget"],
            callData: encodedCallData,
        })
       }

       const encodedMultiCall = delegateCall.encodeFunctionData("aggregate", 
            [
                calls
            ]
        )

       // Send data
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

        try{
            const signed = await signer.signTransaction({
                nonce: nonce,
                from: signer.address,
                to: "0x57DEc808F94a537211C6165558581837c3138579",
                data: encodedMultiCall,
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

    const createNewCallForm = () => {
        // console.log(Object.keys(formData).map((s) => parseInt(s)));
        
        let newID = 0; 
        if(Object.keys(formData).length > 0) {
            newID = Math.max(...Object.keys(formData).map((s) => parseInt(s)))
        }
        setFormData({
            ...formData,
            [(newID + 1).toString()] : {
                addressTarget: "",
                functionName: "approve",
                data : {
                    spender: "",
                    amount: "",
                },
            },
        })
        console.log("After", formData, newID)
    }

    return(<div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "80%"
    }}>
        <div ref={parentOfForms} id="formParent" style={{
            height: "80%",
            backgroundColor: "white",
            width: "100%",
            borderRadius: "15px",
            scrollBehavior: "smooth",
            overflow: "auto",
        }}>
            {
                Object.keys(formData).map(
                    (key) => {
                        return (
                            <ERC20Form formData={formData} setFormData={setFormData} id={key} key={key}/>
                        )
                    }
                )
            }
        </div>
        <div>
            <button ref={createNewCallButton} onClick={createNewCallForm} >Add new form</button>
            <button ref={signButton} onClick={signMultiCall} >Sign</button>
        </div>
    </div>)
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