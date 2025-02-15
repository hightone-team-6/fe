import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Provider from "./Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/mypage" element={<MyPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
