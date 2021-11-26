import { applyMiddleware, combineReducers, createStore } from "redux";
import dialogReducer from "./reducers/dialogReducer";
import friendsReducer from "./reducers/friendsReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";
import authReducer from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./reducers/appReducer";

let reducers = combineReducers({
  dialogPage: dialogReducer,
  friendsPage: friendsReducer,
  usersPage: usersReducer,
  profilePage: profileReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
  //Добавляем другие редьюсеры которые появятся
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
