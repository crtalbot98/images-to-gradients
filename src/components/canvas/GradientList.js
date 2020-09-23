import React from "react";
import DegreePicker from "./DegreePicker";
import {ImageContext} from "../context/ImageContext";

const GradientList = React.memo(function(props){

    const imgState = React.useContext(ImageContext);

    let data = genGradients(props.data, props.gradAmt).map((itm, i) =>
        <div key={i}>
            <div style={{'height': '50px', 'width': '50px', 'backgroundImage': `${props.type}-gradient(${imgState.deg}deg, ${itm})`}}>

            </div>
            <p>background-image: {props.type}-gradient({imgState.deg}deg, {itm})</p>
        </div>
    );

    return (
        <React.Fragment>
            <div className={'gradientList'}>{!props.data ? <p>Please upload or select an image</p> : data}</div>
        </React.Fragment>
    )
});

const genGradients = (arr, n) => {
    let i = 0;
    let j = 1;
    let gradData = [];

    while(i < arr.length - n){
        if(j === i + 1) gradData.push(`rgba(${arr[i]})`);
        if(j !== i + n){
            gradData[i] = gradData[i].concat(`, rgba(${arr[j]})`);
            j++;
        }
        else{
            i++;
            j = i + 1;
        }
    }

    return gradData;
};

export default GradientList;