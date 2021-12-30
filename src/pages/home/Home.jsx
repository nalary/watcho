import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from 'axios';
import Footer from "../../components/footer/Footer";

const Home = ({type}) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomList = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                        headers: { 
                            token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
                        },
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomList();
    }, [type, genre]);
    
    return (
        <div className="home">
            <Navbar />            
            <Featured type={type} setGenre={setGenre}/>
            {lists.map(list => (
                <List key={list._id} list={list}/>
            ))}
            <Footer />
        </div>
    );
};

export default Home;
