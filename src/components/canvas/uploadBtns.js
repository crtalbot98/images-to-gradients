import React from "react";
import {ImageContext} from "../context/ImageContext";
import {changeSize} from "../../hooks/Hooks";
import ImageHandler from "../usplash-images/ImageHandler";

function UploadBtns(){

    const imgState = React.useContext(ImageContext);
    const [load, setLoadings] = React.useState({
        loading: false,
        loaded: false
    });

    const getImageFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            let img = new Image();
            let fired = false;

            img.src  = reader.result;

            img.onload = () => {
                if(fired) return;
                fired = true;

                let outputImg = document.createElement('img');
                const newSizes = changeSize(img.height, img.width);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                ctx.drawImage(img, 0, 0, newSizes.w, newSizes.h);

                outputImg.alt = file.name;
                outputImg.src = canvas.toDataURL('image/jpeg');
                outputImg.height = newSizes.h;
                outputImg.width = newSizes.w;
                imgState.setImage(img);
            };
        }, false);

        reader.readAsDataURL(file);
    };

    const handleClick = () => {
        setLoadings({loading: true, loaded: true});
    };

    return (
        <React.Fragment>
            <button className={load.loaded ? 'hidden' : 'flex'} onClick={handleClick}>Load Images</button>
            <input type={'file'} accept={'image/*'} onChange={getImageFile}/>
            <ImageHandler load={load}/>
        </React.Fragment>
    )
}

export default UploadBtns;