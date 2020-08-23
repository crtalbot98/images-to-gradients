import React, {memo} from "react";
import {ImageContext} from "./context/ImageContext";

let Canvas = React.memo(function(prop){

    let canvas = React.useRef(null);
    const imgState = React.useContext(ImageContext);
    const [curImage, switchImage] = React.useState(imgState.image);


    React.useEffect(() => {
        switchImage(imgState.image);
        if(curImage === null) return;
        const ctx = canvas.current.getContext('2d');
        ctx.drawImage(curImage, 10, 10);
    }, [imgState]);

    return(
        <canvas id={'image-canvas'} ref={canvas} height={'250px'} width={'300px'}>

        </canvas>
    );
});

export default Canvas;