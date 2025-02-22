import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Authentications/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Authentications/SignUp";

import PrivateRoute from "./route/PrivateRoute";
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MainLayout from './layout/MainLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/signup" element={<SignUp />} />

        <Route path="/home" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
        </Route>



        <Route index path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
