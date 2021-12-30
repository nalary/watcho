import "./user.css";
import { PermIdentity, CalendarToday, PhoneAndroid, MailOutline, LocationSearching, Publish } from '@material-ui/icons';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import upload from "../../upload";
import { updateUser } from "../../context/userContext/apiCalls";

const User = () => {
    const location = useLocation();
    const user = location.state.user;

    const [profilePicture, setProfilePicture] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(user);    
    const [isProgressing, setIsProgressing] = useState(false);

    const { dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUpdatedUser({...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProgressing(true);

        let image = null;
        profilePicture && (image = { file: profilePicture, label: "profilePicture" });

        if (image) {
            upload(image, updatedUser).then(() => {
                updateUser(updatedUser, dispatch);
                navigate("/users");
            });
        } else {
            updateUser(updatedUser, dispatch);
            navigate("/users");          
        }
    };

    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="user">
                    <div className="userTitleContainer">
                        <h1 className="userTitle">Edit User</h1>                
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img 
                                    src={profilePicture ? URL.createObjectURL(profilePicture) : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                                    alt="" 
                                    className="userShowImg" 
                                />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">Full Name</span>
                                    <span className="userShowUserTitle">Occupation</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Account Details</span>
                                <div className="userShowInfo">
                                    <PermIdentity className="userShowIcon"/>
                                    <span className="userShowInfoTitle">{user.username}</span>
                                </div>
                                <div className="userShowInfo">
                                    <CalendarToday className="userShowIcon"/>
                                    <span className="userShowInfoTitle">Birthday</span>
                                </div>
                                <span className="userShowTitle">Contact Details</span>
                                <div className="userShowInfo">
                                    <PhoneAndroid className="userShowIcon"/>
                                    <span className="userShowInfoTitle">Phone Number</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline className="userShowIcon"/>
                                    <span className="userShowInfoTitle">{user.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocationSearching className="userShowIcon"/>
                                    <span className="userShowInfoTitle">Address</span>
                                </div>
                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Edit</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Username</label>
                                        <input 
                                            type="text" 
                                            defaultValue={user.username}
                                            name="username"
                                            className="userUpdateInput"
                                            onChange={handleChange} 
                                        />
                                    </div>                                    
                                    <div className="userUpdateItem">
                                        <label>Email</label>
                                        <input 
                                            type="text" 
                                            defaultValue={user.email} 
                                            name="email"
                                            className="userUpdateInput"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Password</label>
                                        <input 
                                            type="password" 
                                            name="password"
                                            defaultValue={user.password} 
                                            className="userUpdateInput"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Alice Brown" 
                                            className="userUpdateInput" 
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Occupation</label>
                                        <input 
                                            type="text" 
                                            placeholder="Software Engineer" 
                                            className="userUpdateInput"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Birthday</label>
                                        <input 
                                            type="date" 
                                            placeholder="2002.12.25" 
                                            className="userUpdateInput"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Phone</label>
                                        <input 
                                            type="text" 
                                            placeholder="+1 234 567 89" 
                                            className="userUpdateInput" 
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Address</label>
                                        <input 
                                            type="text" 
                                            placeholder="New York | USA" 
                                            className="userUpdateInput" 
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Administrator</label>
                                        <select name="isAdmin" id="isAdmin" className="userUpdateInput" onChange={handleChange}>
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>                                    
                                </div>
                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img 
                                            src={profilePicture ? URL.createObjectURL(profilePicture) : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
                                            alt="" 
                                            className="userUpdateImg"
                                        />
                                        <label htmlFor="imgFile">
                                            <Publish className="userUpdateIcon"/>
                                        </label>
                                        <input 
                                            type="file" id="imgFile" 
                                            style={{ display: "none" }}
                                            onChange={e => setProfilePicture(e.target.files[0])}
                                        />
                                    </div>
                                    <button className="userUpdateButton" onClick={handleSubmit}>
                                        {isProgressing ? "Now In Progress ..." : "Update"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
