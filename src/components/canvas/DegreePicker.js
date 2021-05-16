import React from "react";

function DegreePicker(props){

    const pCont = React.useRef(null);
    const dPos = React.useRef({
        x: Math.cos(setDotXY(props.deg)),
        y: Math.sin(setDotXY(props.deg)),
        mUp: false,
        inputDeg: 1,
    });

    const updateDeg = (e) => {
        dPos.current.deg = e.target.value;
        dPos.current.x = Math.cos(setDotXY(e.target.value));
        dPos.current.y = Math.sin(setDotXY(e.target.value));
        props.updateDeg(e.target.value);
        dPos.current.inputDeg = e.target.value;
        moveDot(pCont.current, dPos.current.inputDeg)
    };

    const handleMouseDown = (e) => {
        dPos.current.mUp = false;
        const cont = pCont.current;
        const contR = cont.offsetWidth / 2;
        const contX = cont.offsetLeft + contR;
        const contY = cont.offsetTop + contR;

        window.addEventListener('mouseup', (m) => {
            dPos.current.mUp = true;
            props.updateDeg(Math.round(getDegFromMouse(dPos.current.x, dPos.current.y)));
        });

        window.addEventListener('touchend', (m) => {
            dPos.current.mUp = true;
            props.updateDeg(Math.round(getDegFromMouse(dPos.current.x, dPos.current.y)));
        });

        window.addEventListener('touchmove', (m) => {
            if(dPos.current.mUp) return;
            dPos.current.x = m.touches[0].clientX - contX;
            dPos.current.y = m.touches[0].clientY - contY;
            const deg = Math.round(getDegFromMouse(dPos.current.x, dPos.current.y));
            dPos.current.inputDeg = deg;
            moveDot(cont, deg);
            dPos.current.mUp = false;
        });

        window.addEventListener('mousemove', (m) => {
            if(dPos.current.mUp) return;
            dPos.current.x = m.clientX - contX;
            dPos.current.y = m.clientY - contY;
            const deg = Math.round(getDegFromMouse(dPos.current.x, dPos.current.y));
            dPos.current.inputDeg = deg;
            moveDot(cont, deg);
            dPos.current.mUp = false;
        });
    };

    return(
        <div className={'deg-picker'}>
            <div className={'circle'} ref={pCont} data-deg={0}>
                <div className={'stick'}>
                    <div className={'dot'} onMouseDown={(e) => {
                        handleMouseDown(e)
                    }}
                    onTouchStart={(e) => {
                        handleMouseDown(e)
                    }}>
                    </div>
                </div>
            </div>
            <input  id="degree" type="number" className={'deg-input'} maxLength={3} min={0} max={360} value={dPos.current.inputDeg} onChange={(e) => {
                updateDeg(e);
            }}/>
        </div>
    )
}

const setDotXY = (val) => {
    val = val > 180 ? val - 360 : val;
    return val * Math.PI / 180;
};

const getDegFromMouse = (x, y) => {
    let deg = Math.atan2(y, x) * 180 / Math.PI;
    deg += 90;
    deg += deg < 0 ? 360 : 0;
    return deg;
};

const moveDot = (cont, deg) => {
    cont.style.transform = `rotate(${deg}deg)`;
};

export default DegreePicker;