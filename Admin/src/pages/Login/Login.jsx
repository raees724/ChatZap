import { useState } from "react";
import axios from "../../utils/axios";
import styles from './styles.module.scss'
import { loginPost } from "../../utils/Constants";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/whitelogo.png"
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../Redux/store";
// import { setUser } from "../../Redux/store";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate=useNavigate()

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${loginPost}`;
			// const url = loginPost;
			const { data: res } = await axios.post(url, data);
			console.log(res.token,'ooooooooo');
			console.log(res.admin,'444444444444');
			dispatch(setLogin({admin: res.admin, token: res.token}))
			navigate('/')
			
			
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

	// const blockpost = (id) => {
	// 	axios.patch(`${blockposts}/${id}`).then(({ data }) => {
	// 	  console.log(data,'wwwwwwwwwwwwwrrrrrrrrrrrrrrrrr');
	// 	  setBlock(!block);
	// 	  dispatch(setState({post:data.posts}))
	// 	  window.location.reload();
	// 	})
	// 	.then(() => {
	// 	  navigate(window.location.pathname, { replace: true });
	// 	})
	// 	.catch((error) => {
	// 	  console.log(error);
	// 	});
	//   };
	

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Admin Login</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Login
						</button>
					</form>
				</div>
				<div className={styles.right}>
				<img src={logo} alt="" className={styles.logo}/>
					<h1>ChatZap Admin</h1>
				</div>
				{/* <Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Register
						</button>
					</Link> */}
			</div>
		</div>
	);
};

export default Login;
