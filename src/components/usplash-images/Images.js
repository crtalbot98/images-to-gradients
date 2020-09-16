import React from "react";
import {ImageContext, ImageProvider} from "../context/ImageContext";

function Images(props){

    const state = React.useContext(ImageContext);

    return <img onClick={(e) => {
                state.setImage(e.target)
            }} src={props.src} alt={props.alt} crossOrigin={''}/>
}

export default Images;