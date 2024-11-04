import "./App.css";
import React, { useState, useEffect } from "react";
import BarChart, { BarChartData } from "./components/BarChart/BarChart";

function App() {
  const [message, setMessage] = useState("");
  // state variable barChartData
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);

import React, { useState } from "react";
import "./App.css";
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection';
import ProcessStep from './components/ProcessStep/ProcessStep';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

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
    // Simulating a backend call
    setMessage("Button test works.");
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
      {/* Hero Section */}
      <HeroSection 
          heading="Target fraud detection bias at the source." 
          body="Some sort of subtitle text here. Check out our handy guide ↓ if you need any help!"
          buttonLabel="Upload Data >"
          onClick={fetchMessage} 
      />

      {/* Display message */}
      {message && <div className="message">{message}</div>}

      {/* Process Step / Instruction Section */}
      <ProcessStep 
          title="Upload your dataset." 
          stepnum={1} 
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie mi id sapien posuer." 
      />
      <ProcessStep 
          title="View our feedback." 
          stepnum={2} 
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie mi id sapien posuer." 
      />
      <ProcessStep 
          title="Adjust and try again!" 
          stepnum={3} 
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie mi id sapien posuer." 
      />
      
      <Footer label="© 2024 Team TripleB" />
    </div>
  );
}

export default App;
