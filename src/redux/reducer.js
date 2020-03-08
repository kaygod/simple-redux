import { combineReducers } from "redux";
import homepage from "./modules/homepage";
import detailpage from "./modules/detailpage";

export default combineReducers({
    homepage: homepage.reducers,
    detailpage: detailpage.reducers
}) 