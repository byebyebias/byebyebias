// src/views/components/Message.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

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

interface MessageProps {
  message: MessageType;
  onOptionSelect: (option: OptionType) => void;
}

const Message: React.FC<MessageProps> = ({ message, onOptionSelect }) => {
  const isUser = message.type === "user";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        marginBottom: 1,
      }}
    >
      <Box
        sx={{
          padding: 1,
          backgroundColor: isUser ? "#1976d2" : "#e0e0e0",
          color: isUser ? "#fff" : "#000",
          borderRadius: 2,
          maxWidth: "80%",
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
      </Box>
      {(message.options || message.algorithms) && (
        <Box sx={{ marginTop: 1, display: "flex", flexWrap: "wrap" }}>
          {(message.options || message.algorithms)?.map((option, idx) => (
            <Button
              key={idx}
              variant="contained"
              color="primary"
              sx={{ marginRight: 1, marginTop: 1 }}
              onClick={() => onOptionSelect(option)}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Message;
