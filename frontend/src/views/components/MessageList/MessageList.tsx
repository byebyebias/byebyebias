// src/views/components/MessageList.tsx
import React from "react";
import { Box } from "@mui/material";
import Message from "./Message";

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

interface MessageListProps {
  messages: MessageType[];
  onOptionSelect: (option: { label: string; value: string }) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onOptionSelect,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        marginBottom: 2,
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          onOptionSelect={onOptionSelect}
        />
      ))}
    </Box>
  );
};

export default MessageList;
