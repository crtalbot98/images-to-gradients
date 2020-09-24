import React from "react";
import {ImageContext} from "../context/ImageContext";

function Images(props){

    const state = React.useContext(ImageContext);

    return <img className={'align-center'} onClick={(e) => {
                state.setImage(e.target)
            }} src={props.src} alt={props.alt} crossOrigin={''}/>
}

export default Images;