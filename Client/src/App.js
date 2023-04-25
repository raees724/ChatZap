import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Search from "./pages/Search/Search";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpPage from "./pages/Otp/OtpPage";
import Messenger from "./pages/Messenger/Messenger";
import Notification from "./pages/Notification/Notification";
import { useSelector } from "react-redux";
import PageNotFound from "./PageNotFound";

function App() {

  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector((state) => state.user);


  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <ToastContainer />
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
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
          element: <Notification />,
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
      element: <OtpPage />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
