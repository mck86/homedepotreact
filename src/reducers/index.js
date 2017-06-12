import { combineReducers } from 'redux';
import FixerReducer from './reducer-fixer';

const rootReducer = combineReducers({
    currencies: FixerReducer
});

export default rootReducer;
