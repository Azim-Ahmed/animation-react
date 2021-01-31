import './App.css';
import { Provider } from 'react-redux'
import store from './store';
import Count from './Components/Count';
import Control from './Components/Control';
import InputData from './Components/Typed_typing';
import SimpleAnimation from './Components/Simple_Animation_React/Simple_Animation';
import SimpleAnimatedKeyFrames from './Components/Simple_Animation_React/SimpleAnimatedKeyFrames';
import ReactSpringDemoOne from './Components/ReactSpringCSS/ReactSpringDemoOne';
import ReactSpringDemoTwo from './Components/ReactSpringDemoTwo/ReactSpringDemoTwo';
import ReactSpringDemoCard from './Components/ReactSpringDemoCard/ReactSpringDemoCard';

function App() {

  return (
    // <Provider store={store}>
      <div className="App">
        {/* <h1>This is redux</h1> */}
        {/* <Count />
        <Control /> */}
      <SimpleAnimation/>
      <SimpleAnimatedKeyFrames/>
        <InputData />
        <ReactSpringDemoOne/>
        <ReactSpringDemoTwo/>
        <ReactSpringDemoCard/>
      </div>
    // </Provider>
  );
}

export default App;




// import { createStore } from 'redux';
// //a reducer function by default takes two parameters 1. state( it can be initial), 2. actions
// const reducer = (state = {}, action) => {
//   if (action.type === 'A') {
//     return {
//       ...state,
//       A: 'I am Azim'
//     }
//   } if (action.type === 'B') {
//     return {
//       ...state,
//       B: 'I am Bazim'
//     }
//   }
//   return state;
// }

// const store = createStore(reducer);

// store.subscribe(() => {
//   console.log(store.getState());
// })

// store.dispatch({ type: "A" })
// store.dispatch({ type: "Aa" })
// store.dispatch({ type: "B" })
// store.dispatch({ type: "Aaa" })
