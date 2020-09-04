import React from "react";
import LoadingHandler from "../LoadingHandler";
import ImageList from "./ImageList";
import {fetchData} from "../../hooks/Hooks";

const clickTypes = {
    'load': 1,
    'page': 2
};

function ImageHandler(){

    const selectedImg = React.createContext(null);
    const [loadImages, setImages] = React.useState(false);
    const [images, getList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const ImagesLoading = LoadingHandler(ImageList);

    React.useEffect(() => {
        console.log(page);
        if(!loadImages) return;
        const data = async() => {
            const imgs = await fetchData(`https://api.unsplash.com/photos/?page=${page}&per_page=${12}&client_id=${process.env.REACT_APP_IMAGE_ACCESS}`);
            getList(imgs);
        };
        data();
        setImages(false);
    }, [loadImages, page]);

    const handleClick = (e, type) => {
        if(clickTypes[type] === 1){
            setImages(true);
        }
        else if(clickTypes[type] === 2){
            let pageNum = page;
            if(page !== 1 && e.target.innerText === 'Previous'){
                pageNum -= 1;
                setImages(true);
                setPage(pageNum);
            }
            else if(e.target.innerText === 'Next'){
                pageNum += 1;
                setImages(true);
                setPage(pageNum);
            }
        }
    };

    return(
        <div>
            <button onClick={(e) => {handleClick(e, 'load')}}>Load Images</button>
            <ImagesLoading isLoading={loadImages} images={images}/>
            <button onClick={(e) => {handleClick(e, 'page')}}>Previous</button>
            <p>{page}</p>
            <button onClick={(e) => {handleClick(e, 'page')}}>Next</button>
        </div>
    )
}

export default ImageHandler;