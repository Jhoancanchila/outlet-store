import { legacy_createStore } from "redux";
import productsReducers from "./reducers";

const store = legacy_createStore(productsReducers);

export default store;