import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/HeroSection/HeroSection";
import ProcessStep from "../components/ProcessStep/ProcessStep";
import Table from "../components/Table/Table"
import Title from "../components/Title/Title";

const apiUrl = import.meta.env.VITE_API_URL;

const MainPage: React.FC = () => {

  return (
    <div className="MainPage">
      {/* Hero Section */}

      <Title label="BYE BYE BIAS"/>

      <HeroSection
        heading="Target fraud detection bias at the source."
        body="Visualize and alleviate bias in transaction datasets fed into fraud detection AI models. Check out our handy guide ↓ if you need any help!"
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
