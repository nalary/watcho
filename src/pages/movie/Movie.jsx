import "./movie.css";
import { useLocation } from 'react-router-dom';
import { Publish } from '@material-ui/icons';
import { useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router-dom";
import upload from "../../upload";
import { updateMovie } from "../../context/movieContext/apiCalls";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Movie = () => {
    const location = useLocation();
    const movie = location.state.movie;

    const [mainImg, setMainImg] = useState(null);
    const [thumbImg, setThumbImg] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [updatedMovie, setUpdatedMovie] = useState(movie);
    const [isProgressing, setIsProgressing] = useState(false);

    const { dispatch } = useContext(MovieContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedMovie({...updatedMovie, [e.target.name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProgressing(true);

        let files = [];
        mainImg && files.push({ file: mainImg, label: "img" });
        thumbImg && files.push({ file: thumbImg, label: "imgSm" });
        trailer && files.push({ file: trailer, label: "trailer" });
        video && files.push({ file: video, label: "video" });

        if (files) {
            const promises = [];

            files.forEach((file) => {
                promises.push(upload(file, updatedMovie));
            });            
        
            Promise.all(promises).then(() => {
                updateMovie(updatedMovie, dispatch);
                navigate("/adminMovies");
            });
        } else {
            updateMovie(updatedMovie, dispatch);
            navigate("/adminMovies");          
        }
    };
    
    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="movie">
                    <div className="movieTitleContainer">
                        <h1 className="movieTitle">Movie</h1>
                    </div>
                    <div className="movieTop">                
                        <div className="movieTopRight">
                            <div className="movieInfoTop">
                                <img 
                                    src={movie.imgSm || movie.img}
                                    alt="" 
                                    className="movieInfoImg" 
                                />
                                <span className="movieInfoName">{movie.title}</span>
                            </div>
                            <div className="movieInfoBottom">
                                <div className="movieInfoItem">
                                    <span className="movieInfoKey">ID:</span>
                                    <span className="movieInfoValue">{movie._id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="movieBottom">
                        <form className="addMovieForm">
                        <div className="addMovieItem">
                            <label>Main Image</label>
                            <div className="addMovieImages">                    
                                <img 
                                    src={mainImg ? URL.createObjectURL(mainImg) : movie.img || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                                    alt="" 
                                    className="addMovieMainImg" 
                                />
                                <label htmlFor="mainImgFile">
                                    <Publish className="addMovieIcon"/>
                                </label>
                                <input 
                                    type="file" 
                                    id="mainImgFile"
                                    style={{ display: "none" }}
                                    onChange={e => setMainImg(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <div className="addMovieItem">
                            <label>Thumbnail Image</label>
                            <div className="addMovieImages">                    
                                <img 
                                    src={thumbImg ? URL.createObjectURL(thumbImg) : movie.imgSm || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                                    alt="" 
                                    className="addMovieThumbImg" 
                                />
                                <label htmlFor="thumbImgFile">
                                    <Publish className="addMovieIcon"/>
                                </label>
                                <input 
                                    type="file" 
                                    id="thumbImgFile" 
                                    style={{ display: "none" }}
                                    onChange={e => setThumbImg(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <div className="addMovieItem">
                            <label>Trailer</label>
                            <video 
                                src={trailer ? URL.createObjectURL(trailer) : movie.trailer} 
                                autoPlay ={true} 
                                controls
                                loop 
                                muted 
                            />
                            <input 
                                type="file"
                                className="addMovieFile"
                                onChange={e => setTrailer(e.target.files[0])}
                            />
                        </div>
                        <div className="addMovieItem">
                            <label>Video</label>
                            <video 
                                src={video ? URL.createObjectURL(video) : movie.video} 
                                autoPlay ={true} 
                                controls
                                loop 
                                muted
                            />
                            <input 
                                type="file" 
                                className="addMovieFile"
                                onChange={e => setVideo(e.target.files[0])}
                            />
                        </div>  
                        <div className="addMovieItem">
                            <label>Title</label>
                            <input type="text" name="title" defaultValue={movie.title} onChange={handleChange}/>
                        </div>
                        <div className="addMovieItem desc">
                            <label>Description</label>
                            <textarea type="text" name="desc" defaultValue={movie.desc} onChange={handleChange}/>
                        </div>                
                        <div className="addMovieItem">
                            <label>Rated</label>
                            <select name="rated" id="rated" defaultValue={movie.rated} onChange={handleChange}>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG-13">PG-13</option>
                                <option value="R">R</option>
                                <option value="NC-17">NC-17</option>
                            </select>
                        </div>
                        <div className="addMovieItem">
                            <label>Genre</label>
                            <select name="genre" id="genre" defaultValue={movie.genre} onChange={handleChange}>
                                <option value="Action">Action</option>
                                <option value="Animation">Animation</option>    
                                <option value="Adventure">Adventure</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Crime">Crime</option>
                                <option value="Drama">Drama</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Thriller">Thriller</option>
                            </select>
                        </div>
                        <div className="addMovieItem">
                            <label>Duration (min)</label>
                            <input type="number" min={1} name="duration" defaultValue={movie.duration} onChange={handleChange}/>
                        </div>
                        <div className="addMovieItem">
                            <label>Year</label>
                            <input type="number" min={1900} name="year" defaultValue={movie.year} onChange={handleChange}/>
                        </div>
                        <div className="addMovieItem">
                            <label>Movies or Series</label>
                            <select name="isSeries" id="isSeries" defaultValue={movie.isSeries} onChange={handleChange}>
                                <option value="true">Series</option>
                                <option value="false">Movies</option>
                            </select>
                        </div>                              
                    </form>
                    <button 
                        className={isProgressing ? "addMovieButton progressing" : "addMovieButton"}
                        onClick={handleSubmit} 
                    >
                        {isProgressing ? "Now In Progress ..." : "Update"}
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movie;
