'use client';

import React from 'react';
import useStockData from '@/lib/hooks/useStockData';
import * as Constant from "@/lib/constant";
import { JSONObject } from '@/lib/definations';
import { useMainUi } from '@/contexts/MainUiContext';
import StockIndex from './StockIndex';


export default function StockIndexList({ handleOnItemClick }: { handleOnItemClick: (item: JSONObject) => void }) {

  const { setMainPage, setSubPage } = useMainUi();

  const { stockPriceList, isLoading } = useStockData(Constant.SYMBOL_DEFAULT_LIST);

  const itemOnClick = (item: JSONObject) => {
    setMainPage(Constant.UI_SYMBOL_DETAILS);
    setSubPage(Constant.UI_CHART);
    handleOnItemClick(item);
  }

  if (isLoading) return <div>Loading ...</div>

  return (
    <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {stockPriceList.map((stock) => (
        <StockIndex
          key={stock.symbol}
          stockData={stock}
          handleOnClick={() => itemOnClick(stock)}
        />
      ))}
    </div>
  );
};
