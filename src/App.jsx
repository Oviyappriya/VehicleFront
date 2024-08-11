import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./Pages/IndexPage.jsx";
import Layout from "../Layout.jsx";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage.jsx";
import { CookiesProvider } from "react-cookie";
import RegisterPage from "./Pages/RegisterPage";
import ServicesPage from "./Pages/ServicePage.jsx";
import BookingsPage from "./Pages/BookingsPage.jsx";
import axios from "axios";
import UserContextProvider from "./UserContext.jsx";
import BookingPage from "./Pages/BookingPage.jsx";
import ServicePage from "./Pages/ServicesPage.jsx";
import ServicesFormPage from "./Pages/ServicesFormPage.jsx";
axios.defaults.withCredentials = true;
function App() {
  return (
    <CookiesProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/service details" element={<ServicePage />} />
            <Route
              path="/account/service details/new"
              element={<ServicesFormPage />}
            />
            <Route
              path="/account/service details/:_id"
              element={<ServicesFormPage />}
            />
            <Route path="/service/:_id" element={<ServicesPage />} />
            
            <Route path="/account/bookings/:_id" element={<BookingPage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default App;