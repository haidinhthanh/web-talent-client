import {OC_SEARCH_BAR, SEARCH_QUERY} from "../type";

export const searchBar = (state = {isOpen: false, query: ""}, {type, payload})=>{
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
        default:
            return state
    }
}