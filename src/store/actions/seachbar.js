import {OC_SEARCH_BAR, SEARCH_QUERY} from "../type";

export const ocSearchBar = payload => ({
    type: OC_SEARCH_BAR,
    payload: payload,
})

export const saveSearchQuery = payload =>({
    type: SEARCH_QUERY,
    payload: payload,
})