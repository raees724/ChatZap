import { useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import styles from './styles.module.scss'
import { loginPost } from "../../utils/Constants";
import { setUser } from "../../Redux/store";
import { setToken } from "../../Redux/store";
import { useDispatch } from "react-redux";
import logo from "../../assets/whitelogo.png"

const Login = () => {
	const [datas, setDatas] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const handleChange = ({ currentTarget: input }) => {
		setDatas({ ...datas, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = loginPost;
			const { data } = await axios.post(url, datas);
			dispatch(setUser({user: data.user }))
			dispatch(setToken({token: data.token }))
			localStorage.setItem("token", data.token);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Chatzap!</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={datas.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={datas.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Login
						</button>
						<h4>OR</h4>
						<Link to="/OtpLogin">
						<button type="button" className={styles.green_btn}>
							Otp Login
						</button>
						</Link>
					</form>
					<span className={styles.signupSpan}>Don't have an account? <Link to='/signup'>Signup</Link></span>
				</div>
				<div className={styles.right}>
					{/* <h1>New Here ?</h1> */}
					<img src={logo} alt="" className={styles.logo}/>
           			 {/* <p>Chatzap is a social media platform designed for easy and interactive communication between individuals.</p> */}
            		<h1>Dont Have an Account?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Register
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
