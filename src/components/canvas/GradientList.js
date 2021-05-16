import React from "react";

const GradientList = React.memo(function(props){

    let data = genGradients(props.data, props.gradAmt).map((itm, i) =>
        <div className={'gradient-code'} key={i}>
            <div style={{'height': '75px', 'width': '75px', 'backgroundImage': `${props.type}-gradient(${compareType(props.type, props.deg)} ${itm})`}}>

            </div>
            <code>
                <span className={'code-property'}>background-image: </span>
                <span className={'code-property-val'}>{props.type}-gradient({compareType(props.type, props.deg)} {itm})</span>
            </code>
        </div>
    );

    return (
        <React.Fragment>
            <div className={'gradient-list'}>{!props.data ? <p>Please upload or select an image</p> : data}</div>
        </React.Fragment>
    )
});

const compareType = (type, deg) => {
    return type === 'linear' ? `${deg}deg,` : ''
};

const genGradients = (set, n) => {
    let i = 0;
    let j = 1;
    let gradData = [];
    const arr = Array.from(set);

    while(i < arr.length - 1){
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