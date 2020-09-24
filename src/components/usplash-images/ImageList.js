import React from "react";
import Images from "./Images";

function ImageList(props){

    const imageList = props.images;

    if(imageList.length < 1) return null;
    if(imageList.errors && imageList.errors.length > 0) return <p>{imageList.error}</p>;

    let data = imageList.map((itm) =>
        <Images key={itm.id} src={itm.urls.small} alt={itm.alt_description} size={{width: itm.width / 10, height: itm.height / 10}}/>
    );

    return(
        <div className={'image-list flex-column-wrap'}>
            {data}
        </div>
    )
}

export default ImageList;