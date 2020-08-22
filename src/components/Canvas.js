import React, {memo} from "react";

React.memo(function Canvas(){

    const [curImage, switchImage] = React.useState();

    React.useEffect(() =>{

    }, []);

    const updateCanvas = () => {
        const ctx = ref.canvas.getContext('2d');
        ctx.drawImage(curImage, 10, 10);
    };

    return(
        <canvas id={'image-canvas'} ref={'canvas'} height={'250px'} width={'300px'}>

        </canvas>
    );
});

export default Canvas;