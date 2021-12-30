import "./navbar.scss";
import { Search, Notifications, ArrowDropDown } from '@material-ui/icons';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, dispatch } = useContext(AuthContext);

    window.onscroll = ()=> {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        
        return () => (window.onscroll = null);
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left"> 
                    <Link to="/" className="link">
                        <div className="title">WATCHO</div>
                    </Link>
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span className="navbarMainLink">Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarMainLink">Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>                    
                <div className="right">
                    <Search className="icon"/>
                    <span>{user.username}</span>
                    <Notifications className="icon"/>
                    <img src={user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="" />
                    <div className="profile">
                        <ArrowDropDown className="icon"/>
                        <div className="options">
                            {user.isAdmin ? (
                                <Link to="/adminHome" className="link" style={{ marginTop: "10px"}}>
                                    <span>Admin</span>
                                </Link>
                            ) : (
                                <span>Settings</span>
                            )}                            
                            <span onClick={() => dispatch(logout())}>Logout</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
