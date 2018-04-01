import axios from "axios"
//export function init(){
//  store.dispatch({type: "SET_USER_NAME", payload: {userName: "Daniel"}})
//}

//
export function userSignup(userInfo){
  return function(dispatch){
      dispatch({
        type: "USER_SIGNUP",
        payload: axios.post("/signup",userInfo)
      })
  }
}

export function userSignout(){
  return function(dispatch){
      dispatch({
        type: "USER_SIGNOUT",
        payload: axios.get("/signout")
      })
  }
}
export function userSignin(userInfo){
  return function(dispatch){
      dispatch({
        type: "USER_LOGIN",
        payload: axios.post("/login",userInfo)
      })
  }
}

// This is an example of async call with redux
export function fetchUser(user){
  return function(dispatch){
      dispatch({
        type: "FETCH_USERS",
        payload: axios.get("/user/"+user)
      })
  }
}

// This is an example of async call with redux
export function sessionCheck(){
  const request = axios.get("/session")

  return function(dispatch){
      dispatch({
        type: "SESSION_CHECK",
        payload: request
      })
  }
}
