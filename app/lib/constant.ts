import { JSONObject } from "./definations";

export const SYMBOL_DEFAULT_LIST: JSONObject = {
	"US": ["^DJI", // Dow Jones
		"^GSPC", // S&P 500
		"^IXIC", // Nasdqe
		"^RUT", // Russell
		"^VIX", // Vix
	],
	"EU": ["^GDAXI", // DAX PERFORMANCE-INDEX 
		"^FTSE", // FTSE 10
		"CAC", // CAC 40
		"^IBEX", // IBEX 35
		"^STOXX", // STOXX 5p
	],
	"AS": [
		"^N225", // Nikkei 225
		"000001.SS", // SSE Composite Index
		"^HSI", // Hang Seng Index
		"^BSESN", // BSE SENSEX
		"^NSEI", // Hang Seng Index
	]
};

export const UI_PAGE_LOGIN = "UI_PAGE_LOGIN";
export const UI_PAGE_AUTH_REGISTRATION = "UI_PAGE_AUTH_REGISTRATION";
export const UI_PAGE_HOME = "UI_PAGE_HOME";
export const UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS = "UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS";

export const UI_SYMBOL_DETAILS = "UI_SYMBOL_DETAILS";
export const UI_CHART = "UI_CHART";
export const UI_HISTORICAL_DATA = "UI_HISTORICAL_DATA";