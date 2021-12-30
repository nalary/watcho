import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

const Watch = () => {
    const location = useLocation();
    const movie = location.state.movie;

    return (
        <div className="watch">
            <Link to="/" className="link">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video 
                src={movie.video}
                className="video" 
                autoPlay={true} progress="true" controls
            />
        </div>
    );
};

export default Watch;
