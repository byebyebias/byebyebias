// src/views/components/ChatWindow.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MessageList from "../MessageList/MessageList";

interface OptionType {
  label: string;
  value: string;
}

interface MessageType {
  type: "user" | "assistant";
  content: string;
  options?: OptionType[];
  algorithms?: OptionType[];
  technique?: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    fetchProcessingTechniques();
  }, []);

  const fetchProcessingTechniques = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/processing-techniques/"
      );
      const data = await response.json();
      const message: MessageType = {
        type: "assistant",
        content: "Please select a processing technique:",
        options: data.processing_techniques.map((technique: any) => ({
          label: technique.name.replace("-", " ").toUpperCase(),
          value: technique.name,
        })),
      };
      setMessages([message]);
    } catch (error) {
      console.error("Error fetching processing techniques:", error);
    }
  };

  const handleUserSelection = (option: { label: string; value: string }) => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.options) {
      // User selected a processing technique
      fetchProcessingTechniqueDetails(option.value);
    } else if (lastMessage.algorithms) {
      // User selected an algorithm
      fetchAlgorithmDetails(lastMessage.technique!, option.label);
    } else {
      // Restart or handle other cases
      fetchProcessingTechniques();
    }

    // Add user's selection to messages
    const userMessage: MessageType = {
      type: "user",
      content: option.label,
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const fetchProcessingTechniqueDetails = async (techniqueName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/processing-techniques/${techniqueName}/`
      );
      const data = await response.json();
      const message: MessageType = {
        type: "assistant",
        content: data.description,
        algorithms: data.algorithms.map((algo: string) => ({
          label: algo,
          value: algo,
        })),
        technique: techniqueName,
      };
      setMessages((prev) => [...prev, message]);
    } catch (error) {
      console.error("Error fetching technique details:", error);
    }
  };

  const fetchAlgorithmDetails = async (
    techniqueName: string,
    algorithmName: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/processing-techniques/${techniqueName}/${encodeURIComponent(
          algorithmName
        )}/`
      );
      const data = await response.json();
      const message: MessageType = {
        type: "assistant",
        content: data.details,
      };
      setMessages((prev) => [...prev, message]);
    } catch (error) {
      console.error("Error fetching algorithm details:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" align="center">
        Fairness Chatbot
      </Typography>
      <MessageList messages={messages} onOptionSelect={handleUserSelection} />
    </Box>
  );
};

export default ChatWindow;
