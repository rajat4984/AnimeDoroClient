import React, { useState } from 'react';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Data } from '../data';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained ',
        data: Data.map((data) => data.userGain),
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Users Gained between 2016-2020',
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
