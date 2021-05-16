import React from "react";
import {ImageContext} from "../context/ImageContext";
import GradientList from "./GradientList";
import {changeSize} from "../../hooks/Hooks";
import UploadBtns from "./uploadBtns";
import DegreePicker from "./DegreePicker";

let Canvas = React.memo(function(prop){

    let canvas = React.useRef(null);
    const state = React.useContext(ImageContext);
    const [prevImg, setPrevImg] = React.useState(state.image);
    const[gData, setGData] = React.useState(false);
    const [gradType, setType] = React.useState('linear');
    const [gradAmt, setAmt] = React.useState(2);
    const [gradDeg, setDeg] = React.useState(1);

    const updateDeg = (deg) => {
        setDeg(deg);
    };

    const updateCanvas = async (ctx) => {
        const newSizes = await changeSize(state.image.height, state.image.width);
        canvas.current.width = newSizes.w;
        canvas.current.height = newSizes.h;
        await clearImage(prevImg, ctx);
        await ctx.drawImage(state.image, 0, 0, newSizes.w, newSizes.h);
        await getImageData(ctx, {width: state.image.width, height: state.image.height});
    };

    const handleType = (e) => {
        setType(e.target.innerText.toLowerCase())
    };

    const getImageData = (ctx, size) => {
        let data = new Set();
        let j = 0;
        const max = Math.max(size.width, size.height);
        const min = Math.min(size.width, size.height);

        for(let i = 0; i <= max; i += 15){
            if(j >= min) break;
            if(i <= min) j += 15;
            data.add(ctx.getImageData(i, j,1,1).data.toString());
        }

        setGData(data);
    };

    React.useEffect(() => {
        if(state.image === null) return;
        setPrevImg(state.image);
        updateCanvas(canvas.current.getContext('2d'));
    }, [state.image]);

    return(
        <React.Fragment>
            <canvas id={'image-canvas'} className={'box-shadow'} ref={canvas} height={'400px'} width={'350px'}
                    data-img={state.image !== null ? state.image.src : 'empty'}
                    data-testid={'canvas-image'}
            />
            <div>
                <div className={'flex-row raised-row'}>
                    <div className={'btn-row'}>
                        <button className={gradType === 'linear' ? 'gradient-btn selected' : 'gradient-btn'} onClick={(e) => {handleType(e)}}>Linear</button>
                        <button className={gradType === 'radial' ? 'gradient-btn selected' : 'gradient-btn'} onClick={(e) => {handleType(e)}}>Radial</button>
                    </div>
                    <DegreePicker updateDeg={updateDeg}/>
                    <div className={'select-cont'}>
                        <div className={'select-label'}>
                            Color Amount
                        </div>
                        <select name="colorAmt" id="colorAmt" defaultValue={gradAmt} onChange={(e) => {
                            setAmt(Number(e.target.value));
                        }}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
                <GradientList data={gData} type={gradType} gradAmt={gradAmt} deg={gradDeg}/>
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