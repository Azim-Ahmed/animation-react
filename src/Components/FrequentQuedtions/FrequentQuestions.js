import React from 'react';
import Collapsible from 'react-collapsible';


function FrequentQuestions() {
    return (

        <div>
            <Collapsible overflowWhenOpen="hidden" triggerStyle={{ background: "lightcyan", padding: "2rem", display: 'flex', justifyContent: "center" }} trigger="Start here">
                <p style={{ textAlign: "center" }}>
                    This is the collapsible content. It can be any element or React
                    component you like.
            </p>
            </Collapsible>

            <Collapsible overflowWhenOpen="hidden" triggerStyle={{ background: "lightcyan", padding: "2rem", display: 'flex', justifyContent: "center" }} trigger="Know More" >
                <p style={{ textAlign: "center" }}>
                    This is the collapsible content. It can be any element or React
                    component you like.
            </p>
            </Collapsible>

            <Collapsible overflowWhenOpen="hidden" triggerStyle={{ background: "lightcyan", padding: "2rem", display: 'flex', justifyContent: "center" }} trigger="Ending here" >
                <p style={{ textAlign: "center" }}>
                    This is the collapsible content. It can be any element or React
                    component you like.
            </p>
            </Collapsible>

        </div>
    )
}

export default FrequentQuestions
