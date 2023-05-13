import React from 'react';
import ChartData from '../data/ChartData';
import { Pie, Line } from 'react-chartjs-2';

export default function StatisticsCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="p-4 px-6 bg-light rounded-md">
        <div className="h-96 bg-white backdrop-filter backdrop-blur-lg bg-opacity-80 px-6 py-6 rounded shadow-xl">
          <Pie data={ChartData.pieData} options={ChartData.pieOptions} />
        </div>
      </div>
      <div className="p-4 px-6 bg-light rounded-md">
        <div className="h-96 bg-white backdrop-filter backdrop-blur-lg bg-opacity-80 px-6 py-6 rounded shadow-xl">
          <Line data={ChartData.lineData} options={ChartData.lineOptions} style={{ width: '100%', height: '300px' }} />
        </div>
      </div>
    </div>
  );
}
