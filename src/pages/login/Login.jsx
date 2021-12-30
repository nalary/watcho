import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCall } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({email, password}, dispatch);
        navigate("/");
    };

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <div className="logo">WATCHO</div>
                </div>                
            </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email of Phone number" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="loginButton" onClick={handleSubmit}>Sign In</button>
                    <span>New to WATCHO?
                        <Link to="/register" className="link">
                            <b> Sign up now.</b>
                        </Link>
                    </span>
                    <small>
                        This page is protected by google reCAPTCHA to ensure you're not a robot. <b>Learn more</b>
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
