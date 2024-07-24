import { JSONObject } from "@/lib/definations";

export default function CompareStockDetails({dataList}: {dataList: JSONObject[]}) {

    console.log("==== dataList");
    console.log(dataList);
    return (
        <table>
            <thead>
                <th>Company Name</th>
                <th>Date</th>
                <th>Close</th>
                <th>High</th>
                <th>Low</th>
                <th>Volume</th>
            </thead>
            <tbody>
                {dataList.map((item: JSONObject, idx: number) => {
                    return item.details.map((data: JSONObject, idx: number) => (
                    <tr key={idx}>
                        <td>{data.longname}</td>
                        <td>{data.date}</td>
                        <td>{data.close}</td>
                        <td>{data.high}</td>
                        <td>{data.low}</td>
                        <td>{data.volume}</td>
                    </tr>))
        })}
            </tbody>
        </table>
    );
}