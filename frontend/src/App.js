import logo from './logo.svg';
import './App.css';

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
