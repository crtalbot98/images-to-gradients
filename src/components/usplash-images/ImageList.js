import React from "react";
import Images from "./Images";

let ImageList = React.memo(function(props){

    const imageList = props.images;

    if(imageList.length < 1) return null;
    if(imageList.errors && imageList.errors.length > 0) return <p>{imageList.error}</p>;
    console.log(imageList);
    let data = imageList.map((itm) =>
        <Images key={itm.id} src={itm.urls.small} alt={itm.alt_description}/>
    );

    return(
        <div>
            {data}
        </div>
    )
});

export default ImageList;