import { JSONObject } from '../definations';


export const processStockData = (data: JSONObject): JSONObject[] => {
    const timeSeries = data['Time Series (5min)'];
    const dates = Object.keys(timeSeries);
    const prices = dates.map(date => ({
        date,
        open: parseFloat(timeSeries[date]['1. open']),
        high: parseFloat(timeSeries[date]['2. high']),
        low: parseFloat(timeSeries[date]['3. low']),
        close: parseFloat(timeSeries[date]['4. close']),
    }));

    return prices.reverse(); // Reverse to get the data in chronological order
};


// export const processStockData = (data: any) => {
//     const timeSeries = data['Time Series (5min)'];
//     const processedData = Object.keys(timeSeries).map(date => ({
//         date,
//         close: parseFloat(timeSeries[date]['4. close']),
//     }));

//     return processedData.reverse(); // Reverse to get the data in chronological order
// };