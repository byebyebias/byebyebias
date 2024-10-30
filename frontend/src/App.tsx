import { useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const response = await fetch("${import.meta.env.VITE_API_URL}/api/hello/");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  return (
    <div className="App">
      <h1>Frontend Connected to Backend</h1>
      <button onClick={fetchMessage}>Fetch Message from Backend</button>
      {message && <p>Message from backend: {message}</p>}
    </div>
  );
}

export default App;
