<<<<<<< HEAD
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

=======
import {Routes,BrowserRouter,Route} from "react-router-dom" 
import './App.css';
import React from 'react';
import Main from "./components/Main/Main"
const App=()=> {
  return(
   <>
   <BrowserRouter>
   <Routes>
     
     
     <Route path='/main' element={<Main/>}/>
    
   </Routes>
   </BrowserRouter>
   </>
  )
 }
>>>>>>> 2ee3e655832ffdc47c3347c650496d70dab811e8
export default App;
