import {combineReducers} from 'redux';

import {dataReducer} from './data/data';
import {userReducer} from './user/user';

import NameSpace from './name-space';


export default combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.USER]: userReducer
});
