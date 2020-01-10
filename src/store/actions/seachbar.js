import {OC_SEARCH_BAR, SEARCH_QUERY, CHANGE_SEARCH_STAT} from "../type";

export const ocSearchBar = payload => ({
    type: OC_SEARCH_BAR,
    payload: payload,
})

export const saveSearchQuery = payload =>({
    type: SEARCH_QUERY,
    payload: payload,
})

export const changeSearchStat = payload =>({
    type: CHANGE_SEARCH_STAT,
    payload: payload,
})
