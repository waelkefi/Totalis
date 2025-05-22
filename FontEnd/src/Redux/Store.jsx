import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { thunk } from 'redux-thunk'; 
import { quizReducer } from './Reducers/quizReducer';
import authReducer from './Reducers/Auth.reducer';
import userReducer from './Reducers/UserReducer';
import personalityReducer from './Reducers/Personality.reducer';
import userPersonalityReducer from './Reducers/userPerso.reducer';
import outcomeReducer from './Reducers/outcome.reducer';
import visionReducer from './Reducers/vision.reducer';
const middleware = [thunk];
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({ trace: true }) || compose;
const rootReducer = combineReducers({
  quiz: quizReducer,
  auth : authReducer,
  user: userReducer,
  personality: personalityReducer,
  userPerso: userPersonalityReducer,
  outcomes : outcomeReducer,
  visions: visionReducer,
});
export const  store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);;
export default store;