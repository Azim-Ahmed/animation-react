import React from 'react';
import Typed from 'react-typed';

//npm i react-typed 
//or yarn add react-typed

const InputData = () => {
    return (
        <div>
        <Typed
             strings={[
                'Search for products',
                'Not for you here',
                'Search for brands']}
            typeSpeed={40}
        />
        <br/>
        <Typed
        strings={[
            'Search for products',
            'Search for categories',
            'Search for brands']}
            typeSpeed={40}
            backSpeed={50}
            attr="placeholder"
            loop >
            <input type="text"/>
        </Typed>
    </div>
    );
};

export default InputData;