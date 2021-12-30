import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./widgetSm.css";

const WidgetSm = () => {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users?new=true`, {
                    headers: { 
                        token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
                    },
                });
                setNewUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map(newUser => (
                    <li key={newUser._id} className="widgetSmListItem">
                        <img 
                            src={newUser.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
                            alt="" 
                            className="widgetSmImg" 
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{newUser.username}</span>
                        </div>
                        <Link to={"/user/" + newUser._id} state={{ user: newUser }} className="link">
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon"/>
                                Display
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WidgetSm;
