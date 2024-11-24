// src/App.tsx

import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/HeroSection/HeroSection";
import ProcessStep from "../components/ProcessStep/ProcessStep";
import Table from "../components/Table/Table"
import logo from '@/assets/Square_Cash_app_logo.png'; 
const apiUrl = import.meta.env.VITE_API_URL;

const MainPage: React.FC = () => {

  return (
    <div className="MainPage">
      <div className="App">
      <div className="sticky-logo">
        <img src={logo} alt="Logo" />
      </div>
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
    </div>
  );
};

export default MainPage;
