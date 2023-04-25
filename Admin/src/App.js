import Login from "./pages/Login/Login";
import Home from "./pages/home/Home";

import {  Routes, Route ,Navigate} from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import {useSelector} from 'react-redux';
import { DarkModeContext } from "./context/darkModeContext";
import List from "./pages/list/List";
import Reports from "./pages/Reporters/Reports";
import PageNotFound from "./PageNotFound";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector(state=>state.token)
  console.log(token,'ppppppppppppppppp');
  console.log(`${process.env}`)
  console.log(`${process.env.REACT_APP_BASE_URL}`)
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  return (
    <div className={darkMode ? "app dark" : "app"}>

        
        <Routes>
            
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/">
            <Route index element={token ? <Home />: <Navigate to="/login" />} />
            <Route path="/users" element={<List/>} />
            <Route path="/reports" element={<Reports/>} />
            <Route path='*' element={<PageNotFound/>}/>

          </Route> 
       
          
        </Routes>
        
 
    </div>
  );
}

export default App;