import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import MyPhotos from "./pages/MyPhotos";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import ImageDetails from "./pages/ImageDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Header />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-photos"
            element={
              <ProtectedRoute>
                <Header />
                <MyPhotos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Header />
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Header />
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photos/:id"
            element={
              <ProtectedRoute>
                <Header />
                <ImageDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
