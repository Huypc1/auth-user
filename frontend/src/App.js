import React from "react";
import {Routes , Route}  from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import axios from "axios";
import {Toaster} from 'react-hot-toast';
import { UseContextProvider } from "../src/context/userContent";
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
function App() {
  return (
    <UseContextProvider>
      <Navbar/>
      <Toaster position="bottom-right" toastOptions={{duration:2000}} />
      <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </UseContextProvider>
  );
}

export default App;
