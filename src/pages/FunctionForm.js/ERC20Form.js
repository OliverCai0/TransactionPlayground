import { useState } from 'react'

export const ERC20Form = ({formData, setFormData, id }) => {

    const [currentSelectedFunction, setCurrentSelectedFunction] = useState("approve")

    const deleteForm = () => {
        const formDataCopy = formData
        delete formData[id];
        setFormData({
            ...formDataCopy
        })
    }

    const changeSelectedFunction = (e) => {
        const functionSelector = document.getElementById(`functionSelection${id}`)
        const functionName = functionSelector.options[functionSelector.selectedIndex].text
        setCurrentSelectedFunction(functionName);
    }

    const setFunctionData = (e) => {
        let data;

        if(currentSelectedFunction == "approve"){
            data = {
                spender : document.getElementById(`approveSpender${id}`).value,
                amount : document.getElementById(`approveAmount${id}`).value,
            }
        }

        setFormData({
            ...formData,
            [id] : 
            {
                addressTarget: document.getElementById(`addressTarget${id}`).value,
                functionName: currentSelectedFunction,
                data,
            },
        })

        console.log(`Form ${id} modification`,formData);
    }


    return (
        <div style={{ width: "100%", display: "flex"}}>
            <select name="functions" id={`functionSelection${id}`} onChange={changeSelectedFunction}>
                <option>approve</option>
            </select>
                <label>
                    Contract Address
                    <input onChange={setFunctionData} id={`addressTarget${id}`}/>
                </label>
                {
                    (currentSelectedFunction == "approve") &&
                    <div style={{ width: "100%", display: "flex"}}> 
                        <label>
                            spender
                            <input onChange={setFunctionData} id={`approveSpender${id}`}/>
                        </label>
                        <label>
                            amount
                            <input onChange={setFunctionData} id={`approveAmount${id}`}/>
                        </label>
                    </div>
                }
            <button onClick={deleteForm}>Delete</button>
        </div>
    )
}