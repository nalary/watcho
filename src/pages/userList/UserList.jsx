import "./userList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useContext, useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";

const UserList = () => {
    const { users, dispatch } = useContext(UserContext);

    useEffect(() => {
        getUsers(dispatch);;
    }, [dispatch]);

    const handleDelete = (userId) => {
        deleteUser(userId, dispatch);
    };

    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 250 
        },
        { 
            field: 'user', 
            headerName: 'User', 
            width: 250, 
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img src={params.row.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="" className="userListImg"/>
                        {params.row.username}
                    </div>
                );
            }
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            width: 250 
        },   
        { 
            field: 'isAdmin', 
            headerName: 'Administrator', 
            width: 180 
        },      
        { 
            field: 'action', 
            headerName: 'Action', 
            width: 150, 
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}
                            state={{ user: params.row }}
                        >
                            <button className="userListEdit">Edit</button>
                        </Link>                        
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
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
                <div className="userList">
                    <div className="userTitleContainer">
                        <h1 className="userTitle">User List</h1>
                        <Link to="/newUser" className="link">
                            <button className="createButton">Create</button>
                        </Link>
                    </div>
                    <DataGrid
                        rows={users}
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

export default UserList;
