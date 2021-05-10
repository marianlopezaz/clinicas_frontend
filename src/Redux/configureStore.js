import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './Reducers/userReducer';
import clientReducer from './Reducers/clientReducer';

const configureStore = () => {
    
    const store = createStore(combineReducers({
        user: userReducer,
        client: clientReducer
    }), applyMiddleware(thunk));

    return store;
}

export default configureStore;