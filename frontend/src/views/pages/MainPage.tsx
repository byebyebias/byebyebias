import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/HeroSection/HeroSection";
import ProcessStep from "../components/ProcessStep/ProcessStep";
import Table from "../components/Table/Table"
import Title from "../components/Title/Title";
import GraphImage from "../assets/GraphImage.png"
import DownArrow from "../assets/DownArrow.png"
import Header from "../components/Header/Header";

const MainPage: React.FC = () => {

  return (

    <div className="main-page">
      <Header />

      <Title label="BYE BYE BIAS"/>

      <div className="arrow-container">
       <a href="#about" tabIndex={-1}>
          <img src={DownArrow} alt="down-arrow" id="down-arrow" />
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
            body={
              <>
              Visualize and alleviate bias in transaction datasets fed 
              into fraud detection AI models. Check out our <a href="#handy-guide"><span className="highlight"> handy guide ↓</span>
              </a> if you need any help!
              </>
            }
          />
          <img src={GraphImage} alt="Graph Image" id="graph-image" />
        </div>
      </section>
      <section id="handy-guide">
        <div className="process-container">
          <ProcessStep
            title={
              <>
              <span className="highlight">Upload</span> your dataset.
              </>
            }
            stepnum={1}
            body="Begin by uploading your dataset, either locally or via an Amazon S3 bucket link.
            Ensure the dataset is in the Parquet file format and includes the mandatory columns specified in the table below.
            For tailored analysis, select the protected attributes you wish to analyze."
          />
          <Table />
          <ProcessStep
            title={
              <>
              <span className="highlight">View</span> our feedback.
              </>
            }
            stepnum={2}
            body="Review the overall fairness score and bias metric results using the provided graphs.
            Enlarge the graphs for a more detailed view. Access detailed descriptions to understand the rationale
            behind the scores and gain insights into the metrics."
          />
          <ProcessStep
            title={
              <>
              <span className="highlight">Adjust</span> and try again!
              </>
            }
            stepnum={3}
            body="Modify the dataset based on results. Submit the updated file for analysis to determine
            if fairness has improved."
          />
        </div>
      </section>
      <Footer label="© 2024 Team TripleB" />
    </div>
  );
};

export default MainPage;
