import React from "react";
import LoadingHandler from "../LoadingHandler";
import ImageList from "./ImageList";
import {fetchData} from "../../hooks/Hooks";
import {ImageContext} from "../context/ImageContext";

const clickTypes = {
    'Previous': 1,
    'Next': 2
};

function ImageHandler(){

    const imgState = React.useContext(ImageContext);
    const [loadImages, setImages] = React.useState(imgState.loading);
    const [loadClicked, setClicked] = React.useState(imgState.isLoaded);
    const [images, getList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const ImagesLoading = LoadingHandler(ImageList);

    React.useEffect(() => {
        if(!imgState.loading) return;
        const data = async() => {
            const imgs = await fetchData(`https://api.unsplash.com/photos/?page=${page}&per_page=${12}&client_id=${process.env.REACT_APP_IMAGE_ACCESS}`);
            getList(imgs);
        };
        data();
        imgState.setLoading(false);
    }, [imgState.loading, page]);

    React.useEffect(() => {
        setClicked(imgState.isLoaded);
    }, [imgState.isLoaded]);

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
            <ImagesLoading isLoading={loadImages} images={images}/>
            <div className={loadClicked ? 'flex' : 'hidden'}>
                <button onClick={(e) => {handleClick(e)}}>Previous</button>
                <p>{page}</p>
                <button onClick={(e) => {handleClick(e)}}>Next</button>
            </div>
        </React.Fragment>
    )
}

export default ImageHandler;