import React from "react";
import LoadingHandler from "../LoadingHandler";
import ImageList from "./ImageList";
import {fetchData} from "../../hooks/Hooks";
import ImagePageBtns from "./ImagePageBtns";
import ArrowIcon from "./ArrowIcon";
import {ImageContext} from "../context/ImageContext";
import ScrollHandler from "../ScrollHandler";

const clickTypes = {
    'Previous': 1,
    'Next': 2
};

const ImageHandler = React.memo(function(props){

    const ImagesLoading = LoadingHandler(ImageList);
    const ImagesInView = ScrollHandler(ImagePageBtns, ArrowIcon);
    const [isLoading, setLoading] = React.useState(false);
    const [images, getList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const state = React.useContext(ImageContext);

    React.useEffect(() => {
        if(state.imagesLoaded){
            setLoading(true);
            const data = async () => {
                const imgs = await fetchData(`https://images-to-gradients-server.herokuapp.com/images?page=${page}`);
                getList(JSON.parse(imgs));
                if(imgs) setLoading(false);
            };
            data();
        }
    }, [state.imagesLoaded, page]);

    const handleClick = (e) => {
        let pageNum = page;
        if(page !== 1 && clickTypes[e.target.innerText] === 1){
            pageNum -= 1;
            setPage(pageNum);
            setLoading(true);
        }
        else if(clickTypes[e.target.innerText] === 2){
            pageNum += 1;
            setPage(pageNum);
            setLoading(true);
        }
    };

    return(
        <React.Fragment>
            <ImagesLoading isLoading={isLoading} images={images}/>
            <div className={state.imagesLoaded ? 'flex-cont fixed-btn' : 'hidden'}>
                <ImagesInView page={page} handleClick={handleClick}/>
            </div>
        </React.Fragment>
    )
});

export default ImageHandler;