import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import dayjs from 'dayjs';

const generateMockData = (minutes) => {
  const data = [];
  const now = Date.now();
  for (let i = 0; i < minutes; i++) {
    data.unshift({
      time: dayjs(now - i * 60000).format('HH:mm'),
      price: +(100 + Math.random() * 20 - 10).toFixed(2),
    });
  }
  return data;
};

const StockChart = () => {
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = generateMockData(minutes);
    setData(newData);
  }, [minutes]);

  const averagePrice =
    data.reduce((sum, d) => sum + d.price, 0) / (data.length || 1);

  const handleIntervalChange = (e) => {
        setMinutes(Number(e.target.value));
  };

  return (
    <div style={{ width: '100%', padding: '2.2rem' }}>
      <h2>Stock Price Chart (Last {minutes} Minutes)</h2>
      <label>
        Time Interval:
            <select onChange={handleIntervalChange} value={minutes}>
                <option value={10}>10 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={120}>120 Minutes</option>
            </select>
      </label>

      <ResponsiveContainer width="100%" height={390}>
        <LineChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend />

          <Line type="monotone" dataKey="price" stroke="#007bff" name="Stock Price" dot />
          <Line
            type="monotone"
            dataKey={() => averagePrice}
            stroke="#ff0000"
            strokeDasharray="5 5"
            name="Average"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
