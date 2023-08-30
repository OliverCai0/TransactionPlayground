import { useRef, useState } from 'react'

let ElonMarkBackground = require( '../elonvsmusk.png' )

export const ElonMuskVsMark = () => {

    const MIN = 1000000000
    const MAX = 10000000000

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }

    const muskPool = useState(getRandomArbitrary(MIN, MAX))
    const markPool = useState(getRandomArbitrary(MIN, MAX))

    const muskButton = useRef();
    const markButton = useRef();

    const fadeInAnimation = (e) => {
        if(e.target.id === 'musk'){
            muskButton.current.style.backgroundColor = "black";
            muskButton.current.style.color = "white";
        }
        else{
            markButton.current.style.backgroundColor = "black";
            markButton.current.style.color = "white";
        }
    }

    const fadeOutAnimation = (e) => {
        if(e.target.id === 'musk'){
            muskButton.current.style.backgroundColor = "white";
            muskButton.current.style.color = "black";
        }
        else{
            markButton.current.style.backgroundColor = "white";
            markButton.current.style.color = "black";
        }
    }

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
            backgroundSize: '100%',
            flexDirection: "row"
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
                        fontSize: "80px"
                    }}  
                >
                    Welcome to Rome
                </h1>
                <div>
                <h2
                    style={{
                        color: "white",
                        padding: "5px",
                    }}  
                >
                    How it works: 
                </h2>
                <h3 
                    style={{
                        color: "white",
                        padding: "5px",
                        borderRadius: "15px"
                    }}  
                >
                    Click to transfer 0.1 ETH to the pool, join a team, and receive a free Elon V Zuck NFT. Each
                    member of the winning team will receive a percentage of the opposing team's pool proportional to 
                    their contribution.
                </h3>
                </div>
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
                    }}
                    ref={muskButton}
                    id='musk'
                    onMouseOver={fadeInAnimation}
                    onMouseLeave={fadeOutAnimation}
                >
                    <h2
                    style={{
                        fontSize: "80px"
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
                    }}
                    ref={markButton}
                    id='mark'
                    onMouseOver={fadeInAnimation}
                    onMouseLeave={fadeOutAnimation}
                >
                    <h2
                    style={{
                        fontSize: "80px"
                    }}
                    >Zuck</h2>
                </button>
                </div>
            </div>
         </div>
    )
}

