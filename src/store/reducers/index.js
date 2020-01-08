import {combineReducers} from "redux";
import {loadPost, pagePost, recentPost, viewPost,web} from "./post";
import {sideBar} from "./sidebar";
import { chartStas } from "./chart";
import { searchBar} from "./searchbar";

export default combineReducers({
    viewPost,
    recentPost,
    loadPost,
    web,
    pagePost,
    sideBar,
    searchBar,
    chartStas,
})