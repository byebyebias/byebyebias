import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import ProcessStep from "./components/ProcessStep/ProcessStep";
import Table from "./components/Table/Table";
import FileUpload from "./components/FileUpload/FileUpload";

const apiUrl = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
  useEffect(() => {
    // Function to add title to Pericles iframe for Lighthouse score
    const addTitleToPericlesIframe = () => {
      const iframe = document.getElementById('_pericles_content_iframe');
      if (iframe && iframe instanceof HTMLIFrameElement && !iframe.title) {
        iframe.title = 'Homepage Content Frame';
      }
    };

    addTitleToPericlesIframe();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          addTitleToPericlesIframe();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {/* Use header for top-level heading */}
      <header>
        <HeroSection
          heading="Target fraud detection bias at the source."
          body="Some sort of subtitle text here. Check out our handy guide ↓ if you need any help!"
        />
      </header>

      <main>
        {/* Main content, including the process steps */}
        <ProcessStep
          title="Upload your dataset."
          stepnum={1}
          body="The format of the dataset must be a parquet file with the following mandatory columns highlighted in the table below."
        />
        <Table />
      </main>

      <aside aria-labelledby="user-guide-heading">
        {/* Additional information or side content */}
        <h2 id="user-guide-heading">User Guide</h2>
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
      </aside>

      <Footer label="© 2024 Team TripleB" />
    </div>
  );
};

export default App;
