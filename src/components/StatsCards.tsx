import React from "react";
import "./StatsCards.css";

export interface IStatsCardsProps {
  totalItems: number;
  totalQty: number;
  stockValue: number;
  lowStock: number;
}
const numberFmt = (n: number) => new Intl.NumberFormat().format(n);
const moneyFmt = (n: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(n);

const StatsCards: React.FC<IStatsCardsProps> = ({
  totalItems,
  totalQty,
  stockValue,
  lowStock,
}) => {
  return (
    <div className="cards">
      <div className="card">
        <div className="label">Total Items</div>
        <div className="value">{numberFmt(totalItems)}</div>
      </div>
      <div className="card">
        <div className="label">Total Quantity</div>
        <div className="value">{numberFmt(totalQty)}</div>
      </div>
      <div className="card">
        <div className="label">Stock Value</div>
        <div className="value">{moneyFmt(stockValue)}</div>
      </div>
      <div className="card">
        <div className="label">Low Stock</div>
        <div className="value">{numberFmt(lowStock)}</div>
      </div>
    </div>
  );
};
export default StatsCards;
