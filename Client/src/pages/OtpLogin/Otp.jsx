import { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import styles from './styles.module.scss'
import { loginOtp, loginPost } from "../../utils/Constants";
import { setUser } from "../../Redux/store";
import { setOtp } from "../../Redux/store";
import { setTempemail } from "../../Redux/store";
import { setToken } from "../../Redux/store";
import { useDispatch } from "react-redux";
// import { sentOtpFunction } from "../services/Apis";
import logo from "../../assets/whitelogo.png"
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from 'react-redux';

const Otp = () => {
	const dispatch = useDispatch();
	const otp = useSelector(state=>state.otp)

	

	const [email, setEmail] = useState("");
    // const [spiner,setSpiner] = useState(false);

    const navigate = useNavigate();



    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else {
            // setSpiner(true)
            const data = {
                email: email
            }
			console.log('sdssds ',data);
            // const response = await sentOtpFunction(data);

			const url = loginOtp
			const {data: response} = await axios.post(url, data)
			console.log('object =>d ',email)
			// console.log('object =>d ',response)
			dispatch(setOtp({otp: response.otp }))
			dispatch(setTempemail({tempemail: email }))
            if (response) {
                // setSpiner(false)
				toast.success("Email Sent Succesfully!")
                navigate("/otp",{email:email})
                // navigate("/otp",{})
            } else {
                toast.error(response.response.data.error);
            }
        }
    }

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onClick={sendOtp} >
						<h1>Login with Otp</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							// value={datas.email}
							required
							className={styles.input}
						/>
						
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn} >
							Send
						</button>
					</form>
					
				</div>
				<div className={styles.right}>
					
					<img src={logo} alt="" className={styles.logo}/>
           			 
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Otp;
