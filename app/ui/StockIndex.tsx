import { JSONObject } from "@/lib/definations";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";


// {
// 	"symbol": "AAACX",
// 	"name": "Alpha Alternative Assets Fund",
// 	"price": 6.2,
// 	"changesPercentage": 0.1616,
// 	"change": 0.01,
// 	"dayLow": 6.2,
// 	"dayHigh": 6.2,
// 	"yearHigh": 6.35,
// 	"yearLow": 6.14,
// 	"marketCap": 0,
// 	"priceAvg50": 6.2172,
// 	"priceAvg200": 6.2171,
// 	"exchange": "NASDAQ",
// 	"volume": 0,
// 	"avgVolume": 0,
// 	"open": 6.2,
// 	"previousClose": 6.1899996,
// 	"eps": null,
// 	"pe": null,
// 	"earningsAnnouncement": null,
// 	"sharesOutstanding": 0,
// 	"timestamp": 1720526702
//   }

export default function StockIndex({stockData}: {stockData: JSONObject}) {

	const calculateTotalValueChanged = (): string => {
        const preValue = eval(stockData.previousClose);
        const percent = eval(stockData.change)
        
		return ( preValue + (preValue * percent)).toFixed(2);
	}

    const calculateChangedValue = (): string => {
        const preValue = eval(stockData.previousClose);
        const percent = eval(stockData.change)

		return (preValue * percent).toFixed(2);
	}

    return (
        <div className="flex flex-row border space-x-3 border-slate-200 bg-white w-fit px-3 py-3 rounded-lg text-center">
            {stockData.change >= 0 && <>
                <div className="px-3 py-3 rounded-lg bg-green-100 text-green-700"><FaArrowUp /></div>
                <div className={`flex flex-col`}>
                    <div>{stockData.symbol}</div>
                    <div>+{calculateTotalValueChanged()}</div>
                </div>
                <div className={`flex flex-col rounded-lg text-green-700 items-end`}>
                    <div>+{stockData.changesPercentage !== null && stockData.changesPercentage.toFixed(2)}%</div>
                    <div>+{calculateChangedValue()}</div>
                </div>
            </>}

            {stockData.change < 0 && <>
                <div className="px-3 py-3 rounded-lg bg-red-100 text-red-700"><FaArrowDown /></div>
                <div className={`flex flex-col`}>
                    <div>{stockData.symbol}</div>
                    <div>-{calculateTotalValueChanged()}</div>
                </div>
                <div className={`flex flex-col rounded-lg text-red-700 items-end`}>
                    <div>{stockData.changesPercentage !== null && stockData.changesPercentage.toFixed(2)}%</div>
                    <div>{calculateChangedValue()}</div>
                </div>
            </>}
        </div>

    )
}