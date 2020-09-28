import React from "react";
import LoadingHandler from "../LoadingHandler";
import ImageList from "./ImageList";
import {fetchData} from "../../hooks/Hooks";
import ImagePageBtns from "./ImagePageBtns";
import ArrowIcon from "./ArrowIcon";

const clickTypes = {
    'Previous': 1,
    'Next': 2
};

const ImageHandler = React.memo(function(props){

    const ImagesLoading = LoadingHandler(ImageList);
    const [images, getList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [scrolling, setScrolling] = React.useState(false);

    React.useEffect(() => {
        if(props.loading && props.load){
            const data = async () => {
                const imgs = await fetchData(`https://images-to-gradients-server.herokuapp.com/images?page=${page}`);
                getList(JSON.parse(imgs));
            };
            data();
        }
        props.handleLoad(false);
    }, [props.loading, page]);

    React.useEffect(() => {
        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, [scrolling]);

    const scrollListener = () => {
        setScrolling(document.body.getBoundingClientRect().top <= -20)
    };

    const handleClick = (e) => {
        let pageNum = page;
        if(page !== 1 && clickTypes[e.target.innerText] === 1){
            pageNum -= 1;
            setPage(pageNum);
            props.handleLoad(true);
        }
        else if(clickTypes[e.target.innerText] === 2){
            pageNum += 1;
            setPage(pageNum);
            props.handleLoad(true);
        }
    };

    return(
        <React.Fragment>
            <ImagesLoading isLoading={props.loading} images={images}/>
            <div className={props.load ? 'flex-cont fixed-btn' : 'hidden'}>
                {scrolling ? <ImagePageBtns page={page} handleClick={handleClick}/> : <ArrowIcon/>}
            </div>
        </React.Fragment>
    )
});

export default ImageHandler;