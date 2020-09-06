import React from "react";
import {ImageContext} from "../context/ImageContext";
import GradientList from "./GradientList";

let Canvas = React.memo(function(prop){

    let canvas = React.useRef(null);
    const imgState = React.useContext(ImageContext);
    const [prevImg, setPrevImg] = React.useState(imgState.image);
    const [size, setSize] = React.useState({
        width: 0,
        height: 0
    });
    const[gData, setGData] = React.useState([]);

    const clearImage = (c, ctx) => {
        if(c === null || ctx === null) return;
        let img = ctx.createImageData(c.width, c.height);
        for (let i = img.data.length; i >= 0; i--){
            img.data[i] = 0;
        }
        ctx.putImageData(img, 0, 0);
    };

    const getImageData = (ctx, size) => {
        let data = [];
        let j = 0;
        const max = Math.max(size.width, size.height);
        const min = Math.min(size.width, size.height);

        for(let i = 0; i <= max; i += 15){
            if(j >= min) break;
            if(i <= min) j += 15;
            data.push(ctx.getImageData(i, j,1,1).data.toString());
        }

        setGData(data);
    };

    const updateCanvas = async (ctx) => {
        console.log(imgState.image.width);
        await setSize({width: imgState.image.width, height: imgState.image.height});
        await clearImage(prevImg, ctx);
        await ctx.drawImage(imgState.image, 0,0);
        await getImageData(ctx, {width: imgState.image.width, height: imgState.image.height});
    };

    React.useEffect(() => {
        if(imgState.image === null) return;
        const ctx = canvas.current.getContext('2d');
        setPrevImg(imgState.image);
        updateCanvas(ctx);
    }, [imgState.image]);

    return(
        <React.Fragment>
            <canvas id={'image-canvas'} ref={canvas} height={`${size.height}px`} width={`${size.width}px`}
                    data-img={imgState.image !== null ? imgState.image.src : 'empty'}
                    data-testid={'canvas-image'}
            />
            <GradientList data={gData}/>
        </React.Fragment>
    );
});

export default Canvas;