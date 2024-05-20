import React, { useState, useEffect } from 'react';

function AppUsage() {
  const [appData, setAppData] = useState([]);

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
      setAppData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="app-usage-container">
      <h2>App Usage</h2>
      <table className="app-table">
        <thead>
          <tr>
            <th>App Name</th>
            <th>Hours Used</th>
            <th>Usage Percentage</th>
          </tr>
        </thead>
        <tbody>
          {appData.map((app, index) => (
            <tr key={index}>
              <td>{app.Platform}</td>
              <td>{app.HoursUsage}</td>
              <td>{app.UsagePercentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppUsage;
