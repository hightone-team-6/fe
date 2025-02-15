import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Provider from "./Provider.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { MyPage } from "./pages/MyPage.tsx";
import { SearchPage } from "./pages/SearchPage.tsx";
import { LikePage } from "./pages/LikePage.tsx";
import { BottomNavigationBar } from "./components/BottomNavigationBar.tsx";
import { LocationPage } from "./pages/LocationPage.tsx";
import { BookingPage } from "./pages/BookingPage.tsx";
import { Header } from "./components/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/like" element={<LikePage />} />
          <Route path="/location/:locationId" element={<LocationPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
        <BottomNavigationBar />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
