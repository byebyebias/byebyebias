import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainPage from "./views/pages/MainPage.js";

// Trying react router stuff here
import DashBoardPage from "./views/pages/DashboardPage.js";
import UploadPage from "./views/pages/UploadPage/UploadPage.js";
import ChatbotPage from "./views/pages/ChatbotPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/dashboard",
    element: <DashBoardPage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/chatbot",
    element: <ChatbotPage />,
  },
]);

// React router stuff ends here

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
