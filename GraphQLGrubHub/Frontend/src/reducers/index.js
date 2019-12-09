import { combineReducers} from "redux";
import UserReducer from './reducer_user';
import OwnerReducer from './reducer_owner';
import {reducer as formReducer} from 'redux-form';


const rootReducer = combineReducers({
    user: UserReducer,
    owner: OwnerReducer,
    form: formReducer
})


export default rootReducer;