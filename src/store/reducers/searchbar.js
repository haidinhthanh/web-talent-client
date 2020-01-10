import {OC_SEARCH_BAR, SEARCH_QUERY, CHANGE_SEARCH_STAT} from "../type";

export const searchBar = (state = {isOpen: false, query: "",
text:"",
startDate: "",
endDate: "",
cate: "",
tag: "",
loc:  "",}, {type, payload})=>{
    switch(type){
        case SEARCH_QUERY:{
            return {
                ...state,
                query: payload.query
            }
        }
        case OC_SEARCH_BAR:{
            return {
                ...state,
                isOpen: payload.isOpen
            }
        }
        case CHANGE_SEARCH_STAT:{
            return {
                ...state,
                ...payload
            }
        }
        default:
            return state
    }
}