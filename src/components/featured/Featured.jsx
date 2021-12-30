import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./featured.scss";

const Featured = ({ type, setGenre }) => {
    const [content, setContent] = useState({});
    const [allGenres, setAllGenres] = useState([]);

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axiosInstance.get(`/movies/random?type=` + type, {
                    headers: { 
                        token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
                    },
                });
                setContent(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomContent();
    }, [type]);

    useEffect(() => {
        const getAllGenres = async () => {
            try {
                const res = await axiosInstance.get(`/movies/genres?type=list`, {
                    headers: { 
                        token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
                    },
                });
                setAllGenres(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getAllGenres();
    }, []);
    
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movies" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>                    
                        <option>Genre</option>
                        {allGenres.map(genre => (
                            <option key={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
            )}
            <img src={content.img} alt=""/>
            <div className="info">
                <span className="title">{content.title}</span>
                <span className="desc">{content.desc}</span>
                <div className="buttons">     
                <Link to="/watch" state={{ movie: content }} className="link">              
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                </Link> 
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
