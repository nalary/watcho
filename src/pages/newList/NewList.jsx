import "./newList.css";
import { useContext, useState, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const NewList = () => {        
    const { dispatch } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
    const [filteredMovies, setFilteredMovies] = useState(movies.filter(movie => movie.isSeries === false));
    const [list, setList] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);

    const handleChange = (e) => {
        const value = e.target.value;
        setList({...list, [e.target.name]: value });
        
        if (e.target.name === "isSeries") {
            setFilteredMovies(movies.filter(movie => movie.isSeries === JSON.parse(value)));
        }
    };

    const handleSelect = (e) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setList({...list, [e.target.name]: values });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createList(list, dispatch);
        navigate("/lists");
    };

    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="newList">
                    <h1 className="addListTitle">New List</h1>
                    <form className="addListForm">
                        <div className="addFormLeft">
                            <div className="addListItem">
                                <label>Title</label>
                                <input type="text" name="title" onChange={handleChange}/>
                            </div>                
                            <div className="addListItem">
                                <label>Genre</label>
                                <select name="genre" id="genre" onChange={handleChange}>
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
                            <div className="addListItem">
                                <label>Movies or Series</label>
                                <select name="isSeries" onChange={handleChange}>
                                    <option value="false">Movies</option>
                                    <option value="true">Series</option>                        
                                </select>
                            </div>
                        </div>                
                        <div className="addFormRight">
                            <div className="addListItem">
                                <label>Content</label>
                                <select multiple name="content" onChange={handleSelect} style={{ height: "300px" }}>
                                    {filteredMovies.map(movie => (
                                        <option key={movie._id} value={movie._id}>{movie.title}</option>    
                                    ))}                                         
                                </select>
                            </div> 
                        </div>                                 
                    </form>
                    <button className="addListButton" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </>
    );
};

export default NewList;
