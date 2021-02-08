import React from 'react';
import Collapsible from 'react-collapsible';


function FrequentQuestions() {
    return (

        <div>
            <Collapsible
                overflowWhenOpen="hidden"
                triggerStyle={{
                    background: "lightcyan",
                    padding: "2rem",
                    display: 'flex',
                    justifyContent: "center"
                }}
                trigger="Start here"
            >
                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    <h5>This is Select to expand Area</h5>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png"
                        alt="logo"
                        style={{
                            width: "25%"
                        }}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, repudiandae quae quis distinctio aut tempore autem quos sapiente nihil nemo nobis? Accusantium reprehenderit ratione temporibus culpa? Numquam quia dolorum nulla.
                    </p>
                </div>
            </Collapsible>

            <Collapsible
                overflowWhenOpen="hidden"
                triggerStyle={{
                    background: "lightcyan",
                    padding: "2rem", display: 'flex',
                    justifyContent: "center"
                }}
                trigger="Know More"
            >
                <p style={{ textAlign: "center" }}>
                    This is the collapsible content. It can be any element or React
                    component you like.
               </p>
            </Collapsible>

            <Collapsible
                overflowWhenOpen="hidden"
                triggerStyle={{
                    background: "lightcyan",
                    padding: "2rem",
                    display: 'flex',
                    justifyContent: "center"
                }}
                trigger="Ending here"
            >
                <p style={{ textAlign: "center" }}>
                    This is the collapsible content. It can be any element or React
                    component you like.
                 </p>
            </Collapsible>

        </div>
    )
}

export default FrequentQuestions
