import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';

Chart.register(CategoryScale);

const BarChart = ({ data, isWeek }) => {
  data.map((item) => {
    console.log(typeof item.pomoDate, 'itemitem');
  });

  let monthDataObj = {
    labels: data?.map((item) => format(new Date(item.pomoDate), 'dd/MM/yyyy')),
    datasets: [
      {
        label: 'Productive time month',
        data: data?.map((item) => (item.TotalTime / 60).toFixed(2)),
        borderColor: '#dd5353',
        borderWidth: 1,
        backgroundColor: '#ffcccc',
        barThickness: 20,
        hoverBackgroundColor: '#dd5353',
      },
    ],
  };

  let weekDataObj = {
    labels: data?.map((item) => format(new Date(item.pomoDate), 'dd/MM/yyyy')),
    datasets: [
      {
        label: 'Productive time ',
        data: data?.map((item) => (item.TotalTime / 60).toFixed(2)),
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
        data={isWeek ? weekDataObj : monthDataObj}
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