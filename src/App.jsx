import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import AdminHome from "./pages/adminHome/AdminHome";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import ListList from "./pages/listList/ListList";
import AdminList from "./pages/adminList/AdminList";
import NewList from "./pages/newList/NewList";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>}/>
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>}/>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}/>
                <Route path="/movies" element={user ? <Home type="movies"/> : <Navigate to="/login"/>}/>
                <Route path="/series" element={user ? <Home type="series"/> : <Navigate to="/login"/>}/>
                <Route path="/watch" element={user ? <Watch /> : <Navigate to="/login"/>}/>
                <Route path="/adminHome" element={user?.isAdmin ? <AdminHome /> : <Navigate to="/"/>}/>
                <Route path="/users" element={user?.isAdmin ? <UserList /> : <Navigate to="/"/>}/>
                <Route path="/user/:userId" element={user?.isAdmin ? <User /> : <Navigate to="/"/>}/>
                <Route path="/newUser" element={user?.isAdmin ? <NewUser /> : <Navigate to="/"/>}/>
                <Route path="/adminMovies" element={user?.isAdmin ? <MovieList /> : <Navigate to="/"/>}/>
                <Route path="/movie/:movieId" element={user?.isAdmin ? <Movie /> : <Navigate to="/"/>}/>
                <Route path="/newMovie" element={user?.isAdmin ? <NewMovie /> : <Navigate to="/"/>}/>
                <Route path="/lists" element={user?.isAdmin ? <ListList /> : <Navigate to="/"/>}/>
                <Route path="/list/:listId" element={user?.isAdmin ? <AdminList /> : <Navigate to="/"/>}/>
                <Route path="/newList" element={user?.isAdmin ? <NewList /> : <Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
