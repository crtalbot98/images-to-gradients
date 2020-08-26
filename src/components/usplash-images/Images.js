import React from "react";
import {ImageContext, ImageProvider} from "../context/ImageContext";

function Images(props){

    const state = React.useContext(ImageContext);

    return (
        <ImageProvider>
            <img onClick={(e) => {
                state.setImage(e.target)
            }} src={props.src} alt={props.alt} crossOrigin={''}/>
        </ImageProvider>
    );
}

export default Images;