import React, {memo} from "react";
import {ImageContext} from "./context/ImageContext";

let Canvas = React.memo(function(prop){

    let canvas = React.useRef(null);
    const imgState = React.useContext(ImageContext);
    const [prevImg, setPrevImg] = React.useState(imgState.image);
    const [size, setSize] = React.useState({
        width: '0px',
        height: '0px'
    });

    const clearImage = (c, ctx) => {
        if(c === null) return;
        let img = ctx.createImageData(c.width, c.height);
        for (let i = img.data.length; i >= 0; i--){
            img.data[i] = 0;
        }
        ctx.putImageData(img, 100, 100);
    };

    React.useEffect(() => {

        const updateCanvas = async() => {
            await setPrevImg(imgState.image);
            await setSize({width: imgState.image.width, height: imgState.image.height});
            const ctx = canvas.current.getContext('2d');
            clearImage(prevImg, ctx);
            ctx.drawImage(imgState.image, 0,0);
        };

        if(imgState.image === null) return;
        updateCanvas();
    }, [imgState]);

    return(
        <canvas id={'image-canvas'} ref={canvas} height={size.height} width={size.width}>

        </canvas>
    );
});

export default Canvas;