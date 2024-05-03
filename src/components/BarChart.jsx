import React, { useState } from 'react';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Data } from '../data';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Week1', 'Week2', 'Week3', 'Week4'],
    datasets: [
      {
        label: 'Productive time',
        data: [1, 5, 2, 6],
        borderColor: '#dd5353',
        borderWidth: 1,
        backgroundColor: '#ffcccc',
        barThickness: 20,
        hoverBackgroundColor: '#dd5353',
      },
    ],
  });
  return (
    <div className="bar-chart">
      <Bar
        data={chartData}
        options={{
          plugins: {},
          scales: {
            y: {
              ticks: {
                color: '#dd5353',
              },
            },
            x: {
              ticks: {
                color: '#dd5353',
              },
            },
          },
          maintainAspectRatio: false,
          color: '#dd5353',
        }}
      />
    </div>
  );
};

export default BarChart;
