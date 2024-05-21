import React from 'react';
import { Bar } from 'react-chartjs-2';

const ProfileChart = ({data}) => {
  return (
    <div className="bar-chart">
      <Bar
        data={data}
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

export default ProfileChart;
