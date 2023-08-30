import { MaxAllowanceTransferAmount, AllowanceTransfer, PERMIT2_ADDRESS } from '@uniswap/permit2-sdk'
import { ethereum, web3, ethers } from './coinbaseIntegrations'
import ms from 'ms'
import { permit2ABI } from './abi/permit2ABI'
import { erc20String } from './abi/erc20ABI'

const PERMIT_EXPIRATION = ms(`30d`)
const PERMIT_SIG_EXPIRATION = ms(`30m`)


export const Permit2Form = () => {

    function toDeadline(expiration) {
        return Math.floor((Date.now() + expiration) / 1000)
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

      const permitBatch = {
          details:
                [{
                  // token: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", // AAVE
                  token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                  amount: MaxAllowanceTransferAmount.toBigInt(),
                  expiration: 1724058326686,
                  nonce: nonce,
                }],
          spender: "0x000b21c78b2c07b07559C6B4F00DaCFdCc393000",
          sigDeadline: 1724058326686,
      }

      try{
          const { domain, types, values } = AllowanceTransfer.getPermitData(permitBatch, 
                                                                            PERMIT2_ADDRESS, 
                                                                            1)
          const signature = await (signer).signTypedData(domain, types, values)


          const contract = new ethers.Interface(permit2ABI)
          

          // const contractInterface = contract.interface
          // const targetMethod = 'permit(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)'
          // const targetMethod = 'permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)'
          console.log(domain, types, values)
          const data = contract.encodeFunctionData("0x2a2d80d1",
              [
                  signer.address,
                  permitBatch,
                  signature
              ]
          )

          // const erc20Contract = new ethers.Interface(erc20String)
          // const data = erc20Contract.encodeFunctionData("approve",
          //   [
          //     signer.address,
          //     1000000000
          //   ]
          // )

          // const abu = [
          //   'function permit(address owner, tuple permitSingle, bytes signature)'
          // ]

          // const abucontract = new ethers.Contract(PERMIT2_ADDRESS, abu, signer)
          // console.log(abucontract.interface.fragments)
          // await abucontract.permit(
          //   signer.address, permitBatch, signature
          // )

          const signed = await signer.signTransaction({
              nonce,
              from: signer.address,
              to: PERMIT2_ADDRESS,
              data, 
          })
      }
      catch(e){
          console.log(e)
      }
  }

    return (<div style={{
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
        <button onClick={signTransaction}>Sign</button>
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