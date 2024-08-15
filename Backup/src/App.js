import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../src/Dashboard";

function App() {
  return (
  
   <>
           <Router>

   <Routes>
                <Route exact path="/" element={<Dashboard />} />
                {/* <Route path="/about" element={<About />} /> */}
                 
               
            </Routes>
        </Router>
   </>
  );
}

export default App;
