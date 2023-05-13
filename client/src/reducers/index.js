import { combineReducers } from "redux";
import bonsais from "./bonsais";
import auth from "./auth";

export default combineReducers({ bonsais, auth });
