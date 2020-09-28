import React from "react";

function ImagePageBtns(props){

    return (
        <React.Fragment>
            <button onClick={(e) => {props.handleClick(e)}}>Previous</button>
            <p>{props.page}</p>
            <button onClick={(e) => {props.handleClick(e)}}>Next</button>
        </React.Fragment>
    )
}

export default ImagePageBtns;