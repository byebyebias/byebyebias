import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './MainPage.js'

// Trying react router stuff here
import DashBoardPage from "./pages/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/dashboard",
    element: <DashBoardPage/>,
  },
])


// React router stuff ends here

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    {/* <App /> */}
      <RouterProvider router={router}/>
  </StrictMode>,
)
