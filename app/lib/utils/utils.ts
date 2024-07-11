import { JSONObject } from "../definations";

export const get7DaysFromCurrentDate = (): JSONObject => {
    const curDate = new Date();

    let seventDaysAgo = new Date();
    seventDaysAgo.setDate(-7);

    return {
        startDate: formatToDbDate(seventDaysAgo),
        endDate: formatToDbDate(curDate)
    }
}

export const formatToDbDate = (date: Date): string => {
    const month =  String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
}