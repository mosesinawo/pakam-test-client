import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedJsonString = localStorage.getItem("user");
    if (storedJsonString !== null) {
      const userDetails = JSON.parse(storedJsonString);
      setUser(userDetails);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    console.log("ProtectedRoute called");
    if (!user || Object.keys(user).length === 0) {
      // Redirect to login only if there is no user
      return <Navigate to="/login" />;
    }
    // Render the Dashboard if there is a user
    return children;
  };

  console.log("user", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
