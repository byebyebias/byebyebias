import "./App.css";
import React, { useState, useEffect } from "react";
import BarChart, { BarChartData } from "./components/BarChart/BarChart";

function App() {
  const [message, setMessage] = useState("");
  // state variable barChartData
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);

  // runs when component first mounts
  // fetches data when component is created
  useEffect(() => {
    fetchData();
  }, []);

  // 
  const fetchMessage = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/hello/");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const fetchData = async () => {
    try {

      // API fetches data from endpoint /api/spd/
      console.log("Fetching data from API...")
      const response = await fetch("http://localhost:8000/api/spd/");
      console.log(response.status)

      // converting data to JSON format
      const processedData = await response.json();
      console.log("Processed Data:", processedData);

      // transforms data to match BarChartData interface
      const transformedData = processedData.map((item: { [x: string]: any; }) => ({
        attribute: item['attribute'], 
        metric_value: item['metric_value'],
      }));

      console.log("Transformed Data:", transformedData);

      // updates state variable
      setBarChartData(transformedData);

      // test by hard-coding
      // setBarChartData([
      //   { attribute: "Gender", metric_value: 0.25 },
      //   { attribute: "Age", metric_value: -0.1 }
      // ]);
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Bar Chart Data: ", barChartData);
  }, [barChartData]);

  
  return (
    <div className="App">
      <h1>Frontend Connected to Backend</h1>
      <button onClick={fetchMessage}>Fetch Message from Backend</button>
      {message && <p>Message from backend: {message}</p>}
      <BarChart data={barChartData} xaxis="attribute" yaxis="metric_value" />
    </div>
  );
}

export default App;
