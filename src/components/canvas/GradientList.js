import React from "react";

function GradientList(props){

    const genGradients = (arr) => {
        let i = 0;
        let j = arr.length - 1;
        let gradData = [];

        while(i < j){
            gradData.push(`linear-gradient(to right, rgba(${arr[i]}), rgba(${arr[j]}))`);
            i++;
            j--;
        }

        return gradData;
    };

    let data = genGradients(props.data).map((itm) =>
        <div style={{'height': '200px', 'width': '400px', 'background-image': itm}}>background-image: {itm}</div>
    );

    return <div>{data}</div>
}

export default GradientList;