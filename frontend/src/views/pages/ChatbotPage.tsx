// src/views/pages/ChatbotPage.tsx
import React from "react";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { Box } from "@mui/material";

const ChatbotPage: React.FC = () => {
	return (
		<Box
			sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: 4 }}
		>
			<ChatWindow />
		</Box>
	);
};

export default ChatbotPage;
