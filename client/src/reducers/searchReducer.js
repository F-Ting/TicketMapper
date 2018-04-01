// This is example for using basic state change with redux

const initialState = {
  attractionList: [],
  attractionEmpty: 0,
  fetching: false,
  fetched: true,
}

const searchReducer = (state=initialState, action) =>{
  switch (action.type){
    case "FETCH_SEARCH_PENDING":
      return {...state, fetching: true}
    case "FETCH_SEARCH_REJECTED":
      return {...state, fetching: false, error: action.payload}
    case "FETCH_SEARCH_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        attractionList: action.payload.data.attractions
      }
    default: return state;
  }
}
export default searchReducer
