// Dashboard.jsx

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#7a1117', '#FF8042', '#CEB01E'];

function Dashboard() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/all/mydata');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Parse the UsagePercentage values as numbers
      const parsedData = data.map((entry) => ({
        ...entry,
        UsagePercentage: parseFloat(entry.UsagePercentage),
      }));
      setChartData(parsedData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <main className="main-container">
      <div className="charts-container">
        <div className="pie-chart">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="UsagePercentage"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x =
                    cx + (radius + 45) * Math.cos(-midAngle * (Math.PI / 180));
                  const y =
                    cy + (radius + 45) * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {(percent * 100).toFixed(0)}%
                    </text>
                  );
                }}
                // Custom tooltip content
                tooltip={({ platform }) => platform}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label width={30} position="center">
                  Usage Percentage
                </Label>
              </Pie>
            </PieChart>
            <div
              className="legend"
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {chartData.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '5px',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: COLORS[index % COLORS.length],
                      marginRight: '5px',
                    }}
                  ></div>
                  <span>{entry.Platform}</span>
                </div>
              ))}
            </div>
          </ResponsiveContainer>
        </div>
        <div className="spacer" style={{ width: '50px', height:'50px'}}></div>
        <div className="bar-chart">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="HoursUsage" fill="#8884d8" name="Hours Usage" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
