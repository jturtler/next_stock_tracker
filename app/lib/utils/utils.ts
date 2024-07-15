import { JSONObject } from "../definations";


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
    startDate.setMonth( startDate.getMonth() - monthNo);

    return {
        startDate: formatToDbDate(startDate),
        endDate: formatToDbDate(curDate)
    }
}


export const getDateRange_Years = (yearNo: number): JSONObject => {
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 1);

    const startDate = new Date();
    startDate.setFullYear( startDate.getFullYear() - yearNo);

    return {
        startDate: formatToDbDate(startDate),
        endDate: formatToDbDate(curDate)
    }
    
    // return {
    //     startDate: formatToDbDate(startDate),
    //     endDate: formatToDbDate(curDate)
    // }
}

export const formatToDbDate = (date: Date): string => {
    const month =  String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
}


export const cloneJSONObject = ( obj: JSONObject | JSONObject[]) => {
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
