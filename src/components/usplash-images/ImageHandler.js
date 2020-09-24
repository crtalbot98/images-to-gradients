import React from "react";
import LoadingHandler from "../LoadingHandler";
import ImageList from "./ImageList";
import {fetchData} from "../../hooks/Hooks";

const clickTypes = {
    'Previous': 1,
    'Next': 2
};

const ImageHandler = React.memo(function(props){

    const ImagesLoading = LoadingHandler(ImageList);
    const [images, getList] = React.useState([]);
    const [loading, setLoading] = React.useState(props.load.loading);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        if(!props.load.loading) return;
        const data = async() => {
            const imgs = await fetchData(`https://api.unsplash.com/photos/?page=${page}&per_page=${12}&client_id=${process.env.REACT_APP_IMAGE_ACCESS}`);
            imgs.sort((a, b) => a.height - b.height);
            getList(imgs);
        };
        data();
        setLoading(false);
    }, [props.load.loading, page]);

    const handleClick = (e) => {
        let pageNum = page;
        if(page !== 1 && clickTypes[e.target.innerText] === 1){
            pageNum -= 1;
            setPage(pageNum);
        }
        else if(clickTypes[e.target.innerText] === 2){
            pageNum += 1;
            setPage(pageNum);
        }
    };

    return(
        <React.Fragment>
            <ImagesLoading isLoading={loading} images={images}/>
            <div className={props.load.loaded ? 'flex fixed-btn' : 'hidden'}>
                <button onClick={(e) => {handleClick(e)}}>Previous</button>
                <p>{page}</p>
                <button onClick={(e) => {handleClick(e)}}>Next</button>
            </div>
        </React.Fragment>
    )
});

export default ImageHandler;