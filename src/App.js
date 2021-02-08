import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, Link
} from "react-router-dom";
import InputData from './Components/Typed_typing';
import SimpleAnimation from './Components/Simple_Animation_React/Simple_Animation';
import SimpleAnimatedKeyFrames from './Components/Simple_Animation_React/SimpleAnimatedKeyFrames';
import ReactSpringDemoOne from './Components/ReactSpringCSS/ReactSpringDemoOne';
import ReactSpringDemoTwo from './Components/ReactSpringDemoTwo/ReactSpringDemoTwo';
import ReactSpringDemoCard from './Components/ReactSpringDemoCard/ReactSpringDemoCard';
import BeautifulDragAndDrop from './Components/DragAndDrop/BeautifulDragAndDrop';
import FrequentQuestions from './Components/FrequentQuedtions/FrequentQuestions';
import HeaderRouting from './Components/HeaderRouting/HeaderRouting';

const App = () => {

  return (
    <div className="App">
      <Router>
        <HeaderRouting />
        <Switch>
          <Route path="/BeautifulDragAndDrop">
            <BeautifulDragAndDrop />
          </Route>
          <Route path="/SimpleAnimation">
            <SimpleAnimation />
          </Route>
          <Route path="/SimpleAnimatedKeyFrames">
            <SimpleAnimatedKeyFrames />
          </Route>
          <Route path="/InputData">
            <InputData />
          </Route>
          <Route path="/ReactSpringDemoOne">
            <ReactSpringDemoOne />
          </Route>
          <Route path="/ReactSpringDemoTwo">
            <ReactSpringDemoTwo />
          </Route>

          <Route path="/FrequentQuestions">
            <FrequentQuestions />
          </Route>
          <Route path="/">

          </Route>
          <Route path="/">

          </Route>
          <Route path="/">

          </Route>
          <Route path="/">

          </Route>
          <Route path="/">

          </Route>





          {/* <Route path="/ReactSpringDemoCard">

            <ReactSpringDemoCard />
          </Route> */}

        </Switch>
      </Router>
    </div>




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
