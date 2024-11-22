import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/HeroSection/HeroSection";
import ProcessStep from "../components/ProcessStep/ProcessStep";
import Table from "../components/Table/Table"
import Title from "../components/Title/Title";
import GraphImage from "../assets/GraphImage.png"
import DownArrow from "../assets/DownArrow.png"
import Logo from "../assets/CashAppLogo.png"; 

const MainPage: React.FC = () => {

  return (
    <div className="main-page">

      <div className="sticky-logo">
        <img src={Logo} alt="Logo" />
      </div>

      <Title label="BYE BYE BIAS"/>

      <div className="arrow-container">
       <a href="#about">
          <img src={DownArrow} alt="Down Arrow" id="down-arrow" />
        </a>
      </div>

      <section id="about">
        <div className="flex-container">
          <HeroSection
            heading={
              <>
              Target <span className="highlight">fraud detection</span> bias at the source.
              </>
            }
            body="Visualize and alleviate bias in transaction datasets fed into fraud detection AI models. Check out our handy guide ↓ if you need any help!"
          />
          <img src={GraphImage} alt="Graph Image" id="graph-image" />
        </div>
      </section>
      
      <div className="process-container">
        <ProcessStep
          title="Upload your dataset."
          stepnum={1}
          body="The format of the dataset must be a parquet file with the mandatory columns highlighted in the table below."
        />
        <Table />
        <ProcessStep
          title="View our feedback."
          stepnum={2}
          body="Look at overall fairness score and bias metric results"
        />
        <ProcessStep
          title="Adjust and try again!"
          stepnum={3}
          body="Modify the dataset according to the bias results and submit the file again."
        />
      </div>

      <Footer label="© 2024 Team TripleB" />
    </div>
  );
};

export default MainPage;
