var initialState;

if (localStorage["user"]) {
  //delete localStorage['user']
  initialState = JSON.parse(localStorage["user"]);
}else{
  initialState = {
    user: {},
    isLoggedIn: false, 
    isLoading: false
  };
  localStorage["user"] = JSON.stringify(initialState);
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'login':
          return { ...state, user: action.payload, isLoggedIn: true, isLoading: false}
        case 'logout':
          return { ...state, user: {}, isLoggedIn: false, isLoading: false}
        case 'loadingUser':
          return { ...state, user: {}, isLoggedIn: false, isLoading: true}
        default: return state;
    }
}

export default userReducer;
