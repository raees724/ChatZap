import { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import styles from './styles.module.scss'
import { loginOtp, loginPost } from "../../utils/Constants";
import { setUser } from "../../Redux/store";
import { setToken } from "../../Redux/store";
import { setOtp } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
// import { sentOtpFunction } from "../services/Apis";
import OTPInput, { ResendOTP } from "otp-input-react";
import logo from "../../assets/whitelogo.png"
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';


const OtpPage = () => {
	const location = useLocation();
	const [typeOtp, setTypeOtp] = useState("");
	const dispatch = useDispatch();
	const otp = useSelector(state=>state.otp)
	const tempemail = useSelector(state=>state.tempemail);
	// const email = location.email;

	console.log('eee ',tempemail)

// 	const [otp, setOtp] = useState("");

//   const location = useLocation();

//   const navigate = useNavigate();

//   const LoginUser = async (e) => {
//     e.preventDefault();
// 	console.log('jdjdjdjdj   ddd')
//     if (otp === "") {
//       toast.error("Enter Your Otp")
//     } else if (!/[^a-zA-Z]/.test(otp)) {
//       toast.error("Enter Valid Otp")
//     } else if (otp.length < 6) {
//       toast.error("Otp Length minimum 6 digit")
//     } else {
//       const data = {
//         otp, email: location.state
//       }

//       const response = await userVerify(data);


//       if (response.status === 200) {
//         localStorage.setItem("userdbtoken", response.data.userToken);
//         toast.success(response.data.message);
//         setTimeout(() => {
//           navigate("/dashboard")
//         }, 5000)
//       } else {
//         toast.error(response.response.data.error)
//       }
//     }
//   }

	const handleLogin = async (e) =>{
		e.preventDefault();
		if(otp == typeOtp){
			const { data } = await axios.post(`api/users/otplogin/${tempemail}`);
			dispatch(setUser({user: data.user }))
			dispatch(setToken({token: data.token }))
			localStorage.setItem("token", data.token);
			window.location = "/";
		}
	}

  return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleLogin} >
						<h1>Login with Otp</h1>
						{/* <input
							type="email"
							placeholder="Email"
							name="email"
							required
							className={styles.input}
						/> */}
						<OTPInput
      value={typeOtp}
      onChange={setTypeOtp}
      autoFocus
      OTPLength={6}
      otpType="number"
      disabled={false}
    //   secure
    
	/>
						
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn} >
							Login
						</button>
	{/* <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
					</form>
					
				</div>
				<div className={styles.right}>
					
					<img src={logo} alt="" className={styles.logo}/>
           			 
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default OtpPage
