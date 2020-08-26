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
        ctx.putImageData(img, 0, 0);
    };

    const getImageData = (ctx) => {

        let data = {};
        let j = 0;
        const max = Math.max(size.width, size.height);
        const min = Math.min(size.width, size.height);
        console.log(imgState.image);

        for(let i = 0; i <= max; i += 15){
            if(i <= min){
                j++;
            }
            console.log(i,j);
            data[i] = ctx.getImageData(i, j,1,1).data;
        }
        console.log(data);
        return data;
    };

    React.useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        const updateCanvas = async() => {
            await setPrevImg(imgState.image);
            await setSize({width: imgState.image.width, height: imgState.image.height});
            await clearImage(prevImg, ctx);
            await ctx.drawImage(imgState.image, 0,0);
            await getImageData(ctx);
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