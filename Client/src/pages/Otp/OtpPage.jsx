import { useState } from "react";
import axios from "../../utils/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { loginOtp, loginPost } from "../../utils/Constants";
import { setUser } from "../../Redux/store";
import { setToken } from "../../Redux/store";
import { setOtp } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import OTPInput, { ResendOTP } from "otp-input-react";
import logo from "../../assets/whitelogo.png";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const OtpPage = () => {
  const location = useLocation();
  const [typeOtp, setTypeOtp] = useState("");
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.otp);
  const tempemail = useSelector((state) => state.tempemail);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (otp == typeOtp) {
      const { data } = await axios.post(`api/users/otplogin/${tempemail}`);
      dispatch(setUser({ user: data.user }));
      dispatch(setToken({ token: data.token }));
      localStorage.setItem("token", data.token);
      window.location = "/";
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleLogin}>
            <h1>Login with Otp</h1>

            <OTPInput
              value={typeOtp}
              onChange={setTypeOtp}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure
            />

            <button type="submit" className={styles.green_btn}>
              Login
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <img src={logo} alt="" className={styles.logo} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpPage;
