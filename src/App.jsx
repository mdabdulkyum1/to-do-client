import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Authentications/Login";
import Home from "./pages/Home/Home";
import SignUp from './pages/Authentications/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
