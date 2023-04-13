// import Home from "./pages/home/Home";
// import Login from "./pages/Login/Login";

// import Signup from "./pages/Signup/Signup";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   Navigate,
// } from "react-router-dom";

// import List from "./pages/list/List";
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";
// // import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);
//   const admin = localStorage.getItem("token");

//   const ProtectedRoute = ({ children }) => {
//     if (!admin) {
//       return <Navigate to="/login" />;
//     }

//     return children;
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <ProtectedRoute>
//           <Home/>
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/Signup",
//       element: <Signup />,
//     },
//     {
//       path: "/users",
//       element: <List />,
//     },
    
//   ]);

//   // return (
//   //   <div className={darkMode ? "app dark" : "app"}>
//   //     <BrowserRouter>
        
//   //       <Routes>
            
//   //        <ProtectedRoute>

//   //         </ProtectedRoute>
//   //         <Route path="/">
//   //           <Route index element={<Home />} />
//   //           <Route path="login" element={<Login />} />
//   //           <Route path="users">
//   //             <Route index element={<List />} />
//   //             <Route path=":userId" element={<Single />} />
//   //             <Route
//   //               path="new"
//   //               element={<New inputs={userInputs} title="Add New User" />}
//   //               />
//   //           </Route>
//   //           <Route path="products">
//   //             <Route index element={<List />} />
//   //             <Route path=":productId" element={<Single />} />
//   //             <Route
//   //               path="new"
//   //               element={<New inputs={productInputs} title="Add New Product" />}
//   //             />
//   //           </Route>
//   //         </Route>
//   //       </Routes>
        
//   //     </BrowserRouter>
//   //   </div>
//   // );

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <RouterProvider router={router} />
//     </div>
//   );

// }

// export default App;

import Login from "./pages/Login/Login";
import Home from "./pages/home/Home";

import {  Routes, Route ,Navigate} from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import {useSelector} from 'react-redux';
import { DarkModeContext } from "./context/darkModeContext";
import List from "./pages/list/List";
import Reports from "./pages/Reporters/Reports";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector(state=>state.token)
  console.log(token,'ppppppppppppppppp');
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


          </Route> 
       
          
        </Routes>
        
 
    </div>
  );
}

export default App;