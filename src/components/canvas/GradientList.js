import React from "react";

const GradientList = React.memo(function(props){

    const [colorAmt, setAmt] = React.useState(2);
    console.log(props.data);

    let data = genGradients(props.data, colorAmt).map((itm) =>
        <div>
            <div style={{'height': '50px', 'width': '50px', 'backgroundImage': `linear-gradient(${itm})`}}>

            </div>
            <p>background-image: linear-gradient{itm}</p>
        </div>
    );

    return (
        <React.Fragment>
            <select name="colorAmt" id="colorAmt" defaultValue={colorAmt} onChange={(e) => {
                setAmt(Number(e.target.value));
            }}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
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