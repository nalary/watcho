import ListItem from "../listItem/ListItem";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import "./list.scss";
import { useRef, useState } from "react";

const List = ({list}) => {
    const listRef = useRef();

    const [slideNumber, setSlideNumber] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const [clickLimit, setClickLimit] = useState(0);

    const handleClick = (direction) => {
        setIsMoved(true);
        // setClickLimit(window.innerWidth / 310);
        setClickLimit(window.innerWidth / 230);

        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            // listRef.current.style.transform = `translateX(${310 + distance}px)`;
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
     
        if (direction === "right" && slideNumber < list.content.length - clickLimit) {
            setSlideNumber(slideNumber + 1);
            // listRef.current.style.transform = `translateX(${-310 + distance}px)`;
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    };

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left" 
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none "}}
                />
                <div className="container" ref={listRef}>
                    {list.content.map((item, index) => (
                        <ListItem key={index} index={index} item={item}/>
                    ))}                    
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={() => handleClick("right")}/>
            </div>
        </div>
    );
};

export default List;
