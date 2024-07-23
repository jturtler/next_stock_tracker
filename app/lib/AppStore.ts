import { JSONObject } from "./definations";

let SELECTED_SYMBOL_DATA: JSONObject;

export const setSelectedSymbolData = (data: JSONObject) => {
    SELECTED_SYMBOL_DATA = data;
}

export const getSelectedSymbolData = () => {
    return SELECTED_SYMBOL_DATA;
}