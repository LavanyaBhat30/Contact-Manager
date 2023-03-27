import Login from "./components/login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signup from "./components/signUp";
import React from 'react'
import Logout from "./components/contacts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/contacts" element={<Logout/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
