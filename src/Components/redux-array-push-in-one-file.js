// A simple added products with redux and showing data to the components
// before starting redux make sure that you have installed 
//{ npm i redux, npm i redux-thunk, npm i react-redux}
//Happy to share this code . Written by Azim Uddin Ahamed 

//store
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
const store = createStore(rootReducer,(applyMiddleware(thunk)) );

export default store;

//reducers

import { ADD_PRODUCT } from "./productTypes";

export const initialState = {
    basket: [],
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)

const productReducer = (state = initialState, action) => {
    
    console.log("action", action.payload);
    if(action.payload !== undefined) {
        state.basket.push(action.payload)
        console.log(state)
    }
    
    switch(action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                basket: [...state.basket],
                
            }
        default: return state
    }
}

export default productReducer;
//action types
export const ADD_PRODUCT = 'ADD_PRODUCT';

//action creator
import { ADD_PRODUCT } from './productTypes';
export const addProduct = (data) => {
    return {
        type: ADD_PRODUCT,
        payload: data
    }
}

//useDispatch components
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../../../redux';
import './Product.css';
function Product({ id, title, image, price, rating}) {
  
const dispatch = useDispatch();
  const [items, setItems] = useState(null);
  useEffect(() => {
    
    setItems({id, title, image, price, rating})
    
  }, [id, image, price, rating, title])
  

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">
          <Link to={"/product/"+id}>{title}</Link>
        </p>
        <div className="d-flex">
          <span className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </span>
          <span className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => {
                return <p>⭐</p>;
              })}
          </span>
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={() => dispatch(addProduct(items))}>Add to Basket</button>
    </div>
  );
}


export default Product;

//use Selector Components
import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import Subtotal from '../Subtotal/Subtotal';
import './Checkout.css';
function Checkout() {
  const data = useSelector((store) => store.basket.basket.slice(1, store.basket.basket.length))

let basket = [...new Set(data)];
  
    return (
      <div className="checkout">
        <div className="checkout__left">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
            className="checkout__ad"
          />
          <div>
            {/* <h3>{user?.email}</h3> */}
            <h2 className="checkout__title">Your shopping Basket</h2>
            {basket.map(item => (
              <CheckoutProduct
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    );
}

export default Checkout
