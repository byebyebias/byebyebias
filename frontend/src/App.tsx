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
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hello/`);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
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
        
        {/* <Button label="Fetch Message from Backend" onClick={fetchMessage} />

        {message && <p>Message from backend: {message}</p>} */}

        {/* Footer
        <Footer label="© 2024 Your Company" /> */}
    </div>
  );

}

export default App;
