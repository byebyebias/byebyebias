// src/App.tsx

import React, { useState } from "react";
import "./App.css";
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection';
import ProcessStep from './components/ProcessStep/ProcessStep';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const fetchMessage = async () => {
    // Simulating a backend call
    setMessage("Button test works.");
  };

  return (
    <div className="App">
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
