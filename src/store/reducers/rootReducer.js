//$$$$$$$for only showing data
// const initialState = {
//     count: 12
// }

// export default function rootReducer(state = initialState, action) {
//     return initialState;
// }




const initialState = "";
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD__DATA': {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state;
    }
}



// const initialState = {
//     count: 12
// }

// export default function rootReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'ADD': {
//             return {
//                 count: state.count + 1
//             }
//         }
//         case 'SUB': {
//             return {
//                 count: state.count - 1
//             }
//         }
//         default: return state;
//     }
// }