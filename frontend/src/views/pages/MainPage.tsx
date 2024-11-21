// src/App.tsx

import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/HeroSection/HeroSection";
import ProcessStep from "../components/ProcessStep/ProcessStep";
import Table from "../components/Table/Table"

const MainPage: React.FC = () => {
  // const [filename, setFilename] = useState<string>("")
  // const navigate = useNavigate();

  // const fetchDashboardData = async () => {
  //   // Simulating a backend call
  //   const response = await fetch(`http://127.0.0.1:8000/api/metrics`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({filename: 'value'}),
  //   });

  //   const dashboardData = await response.json()
  //   navigate('/dashboard', { dashboardData: { dashboardData } });
  // };

  // useEffect(
  //   fetchDashboardData,
  //   [filename]
  // )

  // console.log(filename)

  return (
    <div className="MainPage">
      {/* Hero Section */}
      <HeroSection
        heading="Target fraud detection bias at the source."
        body="Some sort of subtitle text here. Check out our handy guide ↓ if you need any help!"
      />

      {/* Process Step / Instruction Section */}
      <ProcessStep
        title="Upload your dataset."
        stepnum={1}
        body="The format of the dataset must be a parquet file with the following mandatory columns highlighted in the table below."
      />
      <Table />
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
};

export default MainPage;
