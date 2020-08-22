import React from "react";

function LoadingHandler(Component){
    return function(props){
        if(!props.isLoading) return <Component {...props}/>;
        return <p>Give us a second...</p>
    }
}

export default LoadingHandler;