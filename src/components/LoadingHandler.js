import React from "react";
import Loader from "./Loader";

function LoadingHandler(Component){
    return function(props){
        if(!props.isLoading){
            return <Component {...props}/>
        }
        return <Loader/>
    }
}

export default LoadingHandler;