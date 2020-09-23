import React from "react";
import {ImageContext} from "../context/ImageContext";
import GradientList from "./GradientList";
import {changeSize, getRatio} from "../../hooks/Hooks";
import UploadBtns from "./uploadBtns";
import DegreePicker from "./DegreePicker";

let Canvas = React.memo(function(prop){

    let canvas = React.useRef(null);
    const imgState = React.useContext(ImageContext);
    const [canvasData, setCanvasData] = React.useState({
        width: 400,
        height: 350,
        // img: imgState.image,
        gradients: false,
        gradType: 'linear',
        gradAmt: 2
    });

    const updateCanvas = async (ctx) => {
        const newSizes = await changeSize(imgState.image.height, imgState.image.width);
        await setCanvasData({...canvasData, width: newSizes.w, height: newSizes.h});
        // await clearImage(canvasData.prevImg, ctx);
        await ctx.drawImage(imgState.image, 0, 0, newSizes.w, newSizes.h);
        await getImageData(ctx, {width: imgState.image.width, height: imgState.image.height});
    };

    const handleType = (e) => {
       setCanvasData({...canvasData, gradType: e.target.innerText.toLowerCase()})
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

        const uniqData = [...new Set(data)]; // Remove any duplicate colors
        setCanvasData({...canvasData, gradients: uniqData});
    };

    React.useEffect(() => {
        if(imgState.image === null) return;
        const ctx = canvas.current.getContext('2d');
        setCanvasData({...canvasData, img: imgState.image});
        console.log(canvasData);
        updateCanvas(ctx);
    }, [imgState.image]);

    return(
        <React.Fragment>
            <canvas id={'image-canvas'} className={'box-shadow'} ref={canvas} height={`${canvasData.height}px`} width={`${canvasData.width}px`}
                    data-img={imgState.image !== null ? imgState.image.src : 'empty'}
                    data-testid={'canvas-image'}
            />
            <div>
                <div className={'flex-row'}>
                <button onClick={(e) => {handleType(e)}}>Linear</button>
                <button onClick={(e) => {handleType(e)}}>Radial</button>
                <DegreePicker/>
                <select name="colorAmt" id="colorAmt" defaultValue={canvasData.gradAmt} onChange={(e) => {
                    setCanvasData({...canvasData, gradAmt: Number(e.target.value)});
                }}>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
                </div>
                <GradientList data={canvasData.gradients} type={canvasData.gradType} gradAmt={canvasData.gradAmt}/>
            </div>
            <div>
                <UploadBtns/>
            </div>
        </React.Fragment>
    );
});

const clearImage = (c, ctx) => {
    if(c === null || ctx === null) return;
    let img = ctx.createImageData(c.width, c.height);
    for (let i = img.data.length; i >= 0; i--){
        img.data[i] = 0;
    }
    ctx.putImageData(img, 0, 0);
};

export default Canvas;