import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    "t1": "Pending",
    "t2": "450",
    "t3": "June",
  },
  {
    "t1": "Declined",
    "t2": "240",
    "t3": "June",
  },
  {
    "t1": "Received",
    "t2": "100",
    "t3": "May",
  },
  {
    "t1": "Received",
    "t2": "150",
    "t3": "May",
  },
  {
    "t1": "Pending",
    "t2": "140",
    "t3": "August",
  },
  {
    "t1": "Received",
    "t2": "600",
    "t3": "August",
  }
];

const Chart = () => {
  return (
    <BarChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="t3" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="t2" fill="#8884d8" />
    </BarChart>
  );
}

export default Chart;