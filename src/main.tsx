import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Provider from "./Provider.tsx";
// import MyPage from "./pages/MyPage";
// import Location from "./pages/Location";
// import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/mypage",
  //   element: <MyPage />,
  // },
  // {
  //   path: "/location",
  //   element: <Location />,
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
