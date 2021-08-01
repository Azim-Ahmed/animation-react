import { diagramConstant } from "../actions/constant";

const initState = {
  initialElements: {},
  valueStream: [],
  decisionNodeInitialData: [],
  openToEdit: false,
  editableData: {}
};

const diagramReducer = (state = initState, action) => {

  switch (action.type) {
    case diagramConstant.ADDEDGE:
      return {
        ...state,
      };
    case diagramConstant.LOADDATA:
      return {
        ...state,
        initialElements: action.payload
      };
    case diagramConstant.ADD_VALUE_STREAM:
      return {
        ...state,
        valueStream: [...state.valueStream, action.payload]
      };
    case diagramConstant.ADD_NEW_FORM_NODE_DATA:
      return {
        ...state,
        decisionNodeInitialData: [...state.decisionNodeInitialData, action.payload]
      };
    case diagramConstant.LOAD_TABLE_DATA_FROM_BACKEND:
      return {
        ...state,
        decisionNodeInitialData: [...action.payload, ...state.decisionNodeInitialData,]
      };
    case diagramConstant.EDITABLE_NEW_FORM_NODE_DATA:
      return {
        ...state,
        openToEdit: action.payload
      };

    case diagramConstant.EDIT_NEW_FORM_NODE_DATA:
      let allTodos = [...state.decisionNodeInitialData];
      const mapedItems = allTodos.find(item => (item.id === action.payload) ? item : null)
      return {
        ...state,
        editableData: mapedItems
      };
    // case diagramConstant.UPDATE_NEW_FORM_NODE_DATA:
    //   let allTableDataa = [...state.decisionNodeInitialData];
    //   const index = allTableDataa.findIndex((info) => (info.id === action.payload.id));
    //   allTableDataa[index] = action.payload;
    //   return {
    //     ...state,
    //     decisionNodeInitialData: allTableDataa
    //   };
    case diagramConstant.UPDATE_NEW_FORM_NODE_DATA:
      let allTableDataa = [...state.decisionNodeInitialData];
      const index = allTableDataa.findIndex((info) => (info.id === action.payload.id));
      allTableDataa[index][action.payload.value] = action.payload.name;
      console.log("updated Data from reducer", allTableDataa);
      return {
        ...state,
        decisionNodeInitialData: allTableDataa
      };
    case diagramConstant.CLOSE_FORM_NODE_DATA:
      return {
        ...state,
        decisionNodeInitialData: []
      };
    case diagramConstant.DELETE_NEW_FORM_NODE_DATA:
      let allTableData = [...state.decisionNodeInitialData];
      return {
        ...state,
        decisionNodeInitialData: allTableData.filter((info) => info.id !== action.payload)
      };
    default:
      return state;
  }
};
export default diagramReducer;
