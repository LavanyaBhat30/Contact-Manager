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
export default App;
