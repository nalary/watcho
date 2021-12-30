import "./adminList.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const AdminList = () => {
    const location = useLocation();
    const list = location.state.list;

    const { dispatch } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
    const [filteredMovies, setFilteredMovies] = useState(movies.filter(movie => movie.isSeries === list.isSeries));
    const [updatedList, setUpdatedList] = useState(list);

    const navigate = useNavigate();

    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedList({...list, [e.target.name]: value });
        
        if (e.target.name === "isSeries") {
            setFilteredMovies(movies.filter(movie => movie.isSeries === JSON.parse(value)));
        }
    };

    const handleSelect = (e) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setUpdatedList({...list, [e.target.name]: values });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateList(updatedList, dispatch);
        navigate("/lists");
    };

    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="adminList">
                    <div className="listTitleContainer">
                        <h1 className="adminListTitle">List</h1>
                    </div>
                    <div className="listTop">                
                        <div className="listTopRight">
                            <div className="listInfoTop">
                                <span className="listInfoName">{list.title}</span>
                            </div>
                            <div className="listInfoBottom">
                                <div className="listInfoItem">
                                    <span className="listInfoKey">ID:</span>
                                    <span className="listInfoValue">{list._id}</span>
                                </div>
                                {/* <div className="listInfoItem">
                                    <span className="listInfoKey">Content:</span>
                                    {movies.map(movie => (
                                        <span key={movie._id} className="listInfoValue">{updatedList.content.includes(movie._id) && movie.title}</span>           
                                    ))}                            
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="listBottom">
                        <form className="addListForm">
                            <div className="addFormLeft">
                                <div className="addListItem">
                                    <label>Title</label>
                                    <input type="text" name="title" defaultValue={list.title} onChange={handleChange}/>
                                </div>                
                                <div className="addListItem">
                                    <label>Genre</label>
                                    <select name="genre" id="genre" defaultValue={list.genre} onChange={handleChange}>
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
                                    <select name="isSeries" defaultValue={list.isSeries} onChange={handleChange}>
                                        <option value="false">Movies</option>
                                        <option value="true">Series</option>                        
                                    </select>
                                </div>
                            </div>                
                            <div className="addFormRight">
                                <div className="addListItem">
                                    <label>Content</label>
                                    <select multiple name="content" defaultValue={list.content} onChange={handleSelect} style={{ height: "300px" }}>
                                        {filteredMovies.map(movie => (
                                            <option key={movie._id} value={movie._id}>{movie.title}</option>    
                                        ))}                                         
                                    </select>
                                </div> 
                            </div>                                 
                        </form>
                        <button className="addListButton" onClick={handleSubmit}>Update</button>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminList;
