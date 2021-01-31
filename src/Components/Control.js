import React from 'react';
import { connect } from 'react-redux';

const Control = (props) => {
    return (
        <div>
            <button onClick={() => props.add()}> (+) </button>
            <button onClick={() => props.sub()}> (-)</button>
        </div>
    );
};
function mapDispatchToProps(dispatch) {
    return {
        add: () => {
            dispatch({ type: "ADD" })
        },
        sub: () => {
            dispatch({ type: "SUB" })
        }

    }
}

export default connect(null, mapDispatchToProps)(Control);