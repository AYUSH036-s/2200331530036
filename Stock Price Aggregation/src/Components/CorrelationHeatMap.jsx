import React, { useEffect, useState } from 'react';
import HeatMapGrid from 'react-heatmap-grid';
import { mean, std } from 'mathjs';

const pearsonCorrelation = (x, y) => {
  const n = x.length;
  const xMean = mean(x);
  const yMean = mean(y);
  const xStd = std(x);
  const yStd = std(y);

  const covariance = x.reduce((sum, xi, i) => {
    return sum + (xi - xMean) * (y[i] - yMean);
  }, 0) / (n - 1);

  return covariance / (xStd * yStd);
};

const CorrelationHeatmap = ({ stockData }) => {
  const [correlationMatrix, setCorrelationMatrix] = useState([]);

  useEffect(() => {
    if (stockData.length === 0) return;

    const nStocks = stockData.length;
    const matrix = [];

    for (let i = 0; i < nStocks; i++) {
      const row = [];
      for (let j = 0; j < nStocks; j++) {
        const corr = pearsonCorrelation(stockData[i].prices, stockData[j].prices);
        row.push(corr.toFixed(2));
      }
      matrix.push(row);
    }

    setCorrelationMatrix(matrix);
  }, [stockData]);

  const stockNames = stockData.map(stock => stock.name);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h3>Correlation Heatmap</h3>
      <HeatMapGrid
        data={correlationMatrix}
        xLabels={stockNames}
        yLabels={stockNames}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `rgb(255, ${255 - value * 100}, ${255 - value * 100})`,
          fontSize: "12px",
          color: "black",
        })}
        cellRender={value => `${value}`}
      />
    </div>
  );
};

export default CorrelationHeatmap;

