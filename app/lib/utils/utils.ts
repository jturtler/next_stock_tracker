import { JSONObject } from "../definations";
import { format, parseISO } from 'date-fns';

export const dateRangeList = ["1D", "7D", "1M", "3M", "6M", "9M", "1Y", "2Y", "5Y", "All"];
    
export const getDateRange = (rangeName: string) => {
	let dateRange: JSONObject = {};

	switch (rangeName) {
		case "1D":
			dateRange = getDateRangeFromCurrentDate(5);
			break;
		case "7D":
			dateRange = getDateRangeFromCurrentDate(7);
			break;
		case "1M":
			dateRange = getDateRange_Months(1);
			break;
		case "3M":
			dateRange = getDateRange_Months(3);
			break;
		case "6M":
			dateRange = getDateRange_Months(6);
			break;
		case "9M":
			dateRange = getDateRange_Months(9);
			break;
		case "1Y":
			dateRange = getDateRange_Years(1);
			break;
		case "2Y":
			dateRange = getDateRange_Years(2);
			break;
		case "5Y":
			dateRange = getDateRange_Years(5);
			break;
		case "All":
			dateRange = getDateRange_Years(100);
			break;
	}

	return dateRange;
}


export const getDateRangeFromCurrentDate = (dayNo: number): JSONObject => {
	const curDate = new Date();
	curDate.setDate(curDate.getDate() + 1);

	let daysAgo = new Date();
	daysAgo.setDate(curDate.getDate() - dayNo);

	return {
		startDate: formatToDbDate(daysAgo),
		endDate: formatToDbDate(curDate)
	}
}

export const getDateRange_Months = (monthNo: number): JSONObject => {
	const curDate = new Date();
	curDate.setDate(curDate.getDate() + 1);

	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - monthNo);

	return {
		startDate: formatToDbDate(startDate),
		endDate: formatToDbDate(curDate)
	}
}


export const getDateRange_Years = (yearNo: number): JSONObject => {
	const curDate = new Date();
	curDate.setDate(curDate.getDate() + 1);

	const startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - yearNo);

	return {
		startDate: formatToDbDate(startDate),
		endDate: formatToDbDate(curDate)
	}
}

export const formatToDbDate = (date: Date): string => {
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${date.getFullYear()}-${month}-${day}`;
}


export const formatDistplayDateTime = (dateStr: string): string => {
	const date = parseISO(dateStr);
	return format(date, 'MMM dd, yyyy HH:mm');
}

export const formatDistplayDate = (dateStr: string): string => {
	const date = parseISO(dateStr);
	return format(date, 'MMM dd, yyyy');
}


export const cloneJSONObject = (obj: JSONObject | JSONObject[]) => {
	return JSON.parse(JSON.stringify(obj));
}

export const getErrMessage = (ex: any) => {
	if (ex instanceof Error) {
		return `An error occurred: ${ex.message}`;
	}
	else if (ex.name === 'AbortError') {
		console.error('Fetch request timed out');
	}

	return `An unexpected error occurred: ${ex}`;
}

// Add commas to thousands.
// 12345 ==> 12,345.00
export const formatDisplayNumber = (n: number | string): string => {
	let num = convertToNumber(n);

	const formattedNum = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(num);

	return formattedNum;
}

export const formatNumberToK = (n: number | string) => {
	let num = convertToNumber(n);

	if (num >= 1e9) {
		return (num / 1e9).toFixed(0).replace(/\.0$/, '') + 'B'; // Billions
	}
	if (num >= 1e6) {
		return (num / 1e6).toFixed(0).replace(/\.0$/, '') + 'M'; // Millions
	}
	if (num >= 1e3) {
		return (num / 1e3).toFixed(0).replace(/\.0$/, '') + 'k'; // Thousands
	}
	return formatDisplayNumber(num); // Less than thousands, retain decimal places
}

export const convertToNumber = (n: string | number): number => {
	let num;
	if (typeof n === 'string') {
		num = parseFloat(n);
	}
	else {
		num = n;
	}

	return num;
}
