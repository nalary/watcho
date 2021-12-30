import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./register.scss";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const emailRef = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value);
    };

    const handleFinish = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post(`/auth/register`, { username, email, password });
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }; 
    
    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <div className="logo">:WATCHO</div>
                    <button className="loginButton">Sign In</button>
                </div>                
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder="Email address" ref={emailRef}/>
                        <button className="registerButton" onClick={handleStart}>Get Started</button>
                    </div>
                ) : (
                    <form className="input">
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <button className="registerButton" onClick={handleFinish}>Start</button>
                    </form>
                )}          
            </div>
        </div>
    );
};

export default Register;
