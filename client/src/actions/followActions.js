import axios from "axios"

// This is an example of async call with redux
export function followPerformer(user, newFollowingList){
  return function(dispatch){
      dispatch({
        type: "UPDATE_STORE",
        payload: newFollowingList
      })
      dispatch({
        type: "FOLLOW",
        payload: axios.put("/users/"+user, {'following':newFollowingList})   
      })
  }
}



