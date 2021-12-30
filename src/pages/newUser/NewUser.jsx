import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { axiosInstance } from "../../config";
import "./newUser.css";

const NewUser = () => {
    const [user, setUser] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({...user, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post(`/auth/register`, user);
            navigate("/users");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="newUser">
                    <h1 className="newUserTile">New User</h1>
                    <form className="newUserForm">
                        <div className="newUserItem">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="newUserItem">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="newUserItem">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="newUserItem">
                            <label>Full Name</label>
                            <input type="text" placeholder="Annie Brown"/>
                        </div>
                        <div className="newUserItem">
                            <label>Phone</label>
                            <input type="password" placeholder="+1 234 567 89"/>
                        </div>
                        <div className="newUserItem">
                            <label>Address</label>
                            <input type="password" placeholder="New York | USA"/>
                        </div>
                        <div className="newUserItem">
                            <label>Gender</label>
                            <div className="newUserGender">
                                <input type="radio" name="gender" id="male" value="male"/>
                                <label htmlFor="male">Male</label>
                                <input type="radio" name="gender" id="female" value="female"/>
                                <label htmlFor="female">Female</label>
                                <input type="radio" name="gender" id="other" value="other"/>
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>
                        <div className="newUserItem">
                            <label>Administrator</label>
                            <select name="isAdmin" id="isAdmin" className="newUserSelect" onChange={handleChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                    </form>
                    <button className="newUserButton" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </>
    );
};

export default NewUser;
