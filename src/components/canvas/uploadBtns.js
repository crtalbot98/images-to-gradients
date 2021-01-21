import React from "react";
import {ImageContext} from "../context/ImageContext";
import {changeSize} from "../../hooks/Hooks";

function UploadBtns(){

    const imgState = React.useContext(ImageContext);
    const state = React.useContext(ImageContext);

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

    const handleLoad = () => {
        state.setImagesLoaded(true)
    };

    return (
        <React.Fragment>
            <div className={state.imagesLoaded ? 'hidden': 'btn-cont'}>
                <p>Don't have any images?</p>
                <button className={'upload-btn border-radius'} onClick={() => {
                handleLoad();
            }}>Get one from Usplash</button>
            </div>
            <div className={'btn-cont'}>
            <p>Have your own image in mind?</p>
                <div className={'file-wrap margin-top'}>
                    <label className={'file border-radius'} htmlFor={'file'}>Upload one here</label>
                    <input id={'file'} type={'file'} accept={'image/*'} onChange={getImageFile}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UploadBtns;