import React, { useState } from 'react';
import { Animate } from "react-simple-animate";


//npm i react-simple-animate

//for more information  https://react-simple-animate.now.sh/basics

const SimpleAnimation = () => {

    const [play,setPlay] = useState(false)
    return (
        <div>
            <Animate
                play={play} 
                start={{
                 transform: "translateY(-130px)"
                    }}
                end={{ transform: "translateY(200px)" }}
            >
          <div style={divStyle} />
             </Animate>
               <button
                    style={buttonStyle}
                    //*1st type
                     onClick={() => setPlay(!play)}
                     //*second type
                    // onMouseEnter={() => setPlay(!play)}

                     //*third type
                    // onMouseLeave={() => setPlay(!play)}
                >
                   Play
                </button>
        </div>
    );
};
 export default SimpleAnimation;

 const divStyle = {
    display: "block",
    width: 100,
    height: 100,
    background: "#27253f",
    borderRadius: "10px"
  };
  
   const buttonStyle = {
    display: "block",
    height: 30,
    width: 100,
    fontSize: 15,
    marginTop: 20
  };
  

