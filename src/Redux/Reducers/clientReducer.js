var initialState;

if (localStorage["client"] && JSON.parse(localStorage["client"]).localStorage === true) {
    var client = JSON.parse(localStorage["client"]);
    initialState = {
        client: client
    }
} else {
    initialState = {
        client: {
            localStorage: false
        }
    }
}

const clientReducer = (state = initialState, action) => {
    switch(action.type){
        case 'setClient':
            return { ...state, client: action.payload}
        default: return state;
    }
}

export default clientReducer;
