import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import "./topbar.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
    const { dispatch, user: currentUser } = useContext(AuthContext);

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">HO : Admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <div className="adminProfile">
                            <Settings/>     
                            <div className="adminOptions">
                                <Link to="/" className="link" style={{ padding: "10px"}}>
                                    <span>WATCHO</span>
                                </Link>
                                <span onClick={() => dispatch(logout())}>Logout</span>
                            </div> 
                        </div>                  
                    </div>                    
                    <img 
                        src={currentUser.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
                        alt="" 
                        className="topAvatar"
                    />
                </div>
            </div>
        </div>
    )
}

export default Topbar;
