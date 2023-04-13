import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import Search from "./pages/Search/Search"
import Chat from "./pages/Chat/Chat"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Otp from "./pages/OtpLogin/Otp";


// import AddPost from "./components/Addpost/AddPost";
// import Share from "./components/share/Share";
// import AddPost from "./components/Addpost/AddPost";
// import { AuthContext } from "./context/authContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpPage from "./pages/Otp/OtpPage";
import Messenger from "./pages/Messenger/Messenger";
import Notification from "./pages/Notification/Notification";

function App() {
  // const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);
  const user = localStorage.getItem("token");
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
         <ToastContainer />
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }} >
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/notifications",
          element: <Notification/>,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/chat",
          element: <Messenger />,
        },
      ],
    },
    
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/OtpLogin",
      element: <Otp />,
    },
    {
      path: "/Otp",
      element: <OtpPage/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;