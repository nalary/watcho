import "./listList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useContext, useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const ListList = () => {
    const { lists, dispatch } = useContext(ListContext);

    useEffect(() => {
        getLists(dispatch);
    }, [dispatch]);

    const handleDelete = (listId) => {
        deleteList(listId, dispatch);
    };

    const getType = (params) => {        
        return `${params.row.isSeries === true ? "Series" : "Movies"}`;
    }

    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 250 
        },        
        { 
            field: 'title', 
            headerName: 'Title', 
            width: 500 
        },        
        { 
            field: 'genre', 
            headerName: 'Genre', 
            width: 160 
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
                            to={"/list/" + params.row._id}
                            state={{ list: params.row }}
                        >
                            <button className="listListEdit">Edit</button>
                        </Link>                        
                        <DeleteOutline className="listListDelete" onClick={() => handleDelete(params.row._id)}/>
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
                <div className="listList">
                    <div className="listTitleContainer">
                        <h1 className="listListTitle">List of Movie's Playlist</h1>
                        <Link to="/newList" className="link">
                            <button className="createButton">Create</button>
                        </Link>
                    </div>
                    <DataGrid
                        rows={lists}
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

export default ListList;
