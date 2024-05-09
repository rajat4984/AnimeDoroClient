import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale);

const BarChart = ({ data }) => {
  console.log(data,'data')
  let dataObj = {
    labels: data.map((item) => item.pomoDate),
    datasets: [
      {
        label: 'Productive time',
        data: data.map((item) => (item.TotalTime / 60).toFixed(2)),
        borderColor: '#dd5353',
        borderWidth: 1,
        backgroundColor: '#ffcccc',
        barThickness: 20,
        hoverBackgroundColor: '#dd5353',
      },
    ],
  };


  return (
    <div className="bar-chart">
      <Bar
        data={dataObj}
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
