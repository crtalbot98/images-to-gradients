import React from "react";

let ImageList = React.memo(function(props){

    const [page, setPage] = React.useState(1);
    const imageList = props.images;

    if(imageList.length < 1) return null;
    if(imageList.errors && imageList.errors.length > 0) return <p>{imageList.error}</p>;

    let data = imageList.map((itm, key) =>
        <div key={key}>
            <img src={itm.urls.small} alt={itm.alt_description}/>
        </div>
    );

    return(
        <div>
            {data}
        </div>
    )
});

export default ImageList;