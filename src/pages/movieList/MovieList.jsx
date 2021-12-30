import "./movieList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useContext, useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const MovieList = () => {
    const { movies, dispatch } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const handleDelete = (movieId) => {
        deleteMovie(movieId, dispatch);
    };

    const getType = (params) => {        
        return `${params.row.isSeries === true ? "Series" : "Movies"}`;
    }
    
    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 200 
        },
        { 
            field: 'movie', 
            headerName: 'Movie', 
            width: 300, 
            renderCell: (params) => {
                return (
                    <div className="movieListItem">
                        <img 
                            src={params.row.imgSm || params.row.img || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
                            alt="" 
                            className="movieListImg"
                        />
                        {params.row.title}
                    </div>
                );
            }
        },
        { 
            field: 'genre', 
            headerName: 'Genre', 
            width: 140 
        },
        { 
            field: 'year', 
            headerName: 'Year', 
            width: 120 
        },
        { 
            field: 'rated', 
            headerName: 'Rated', 
            width: 120 
        },
        { 
            field: 'type', 
            headerName: 'Type', 
            width: 120,
            valueGetter: getType,
        },
        { 
            field: 'action', 
            headerName: 'Action', 
            width: 140, 
            renderCell: (params) => {
                return (
                    <>
                        <Link 
                            to={"/movie/" + params.row._id}
                            state={{ movie: params.row }}
                        >
                            <button className="movieListEdit">Edit</button>
                        </Link>                        
                        <DeleteOutline className="movieListDelete" onClick={() => handleDelete(params.row._id)}/>
                    </>
                );                
            }
        },
    ];

    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="movieList">
                    <div className="movieTitleContainer">
                        <h1 className="movieListTitle">Movie List</h1>
                        <Link to="/newMovie" className="link">
                            <button className="createButton">Create</button>
                        </Link>
                    </div>            
                    <DataGrid
                        rows={movies}
                        getRowId={row => row._id}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                    />            
                </div>
            </div>
        </>
    );
};

export default MovieList;
