export const fetchData = async(url) => {
    const data = await fetch(url);
    return data.json();
};

export const getRatio = (h, w, ch, cw) => {
    return(Math.min((cw/w),(ch/h)));
};

export const changeSize = (h, w) => {
    let newSizes = {
        h: h,
        w: w
    };

    if(h >= 10000 || w >= 8000){
        newSizes['h'] = h * 0.03;
        newSizes['w'] = w * 0.03;
        return newSizes;
    }
    if(h >= 5000 || w >= 5000){
        newSizes['h'] = h * 0.05;
        newSizes['w'] = w * 0.05;
        return newSizes;
    }
    else if(h >= 2000 || w >= 2000){
        newSizes['h'] = h * 0.15;
        newSizes['w'] = w * 0.15;
        return newSizes;
    }
    else if(h >= 1000 || w >= 1000){
        newSizes['h'] = h * 0.3;
        newSizes['w'] = w * 0.3;
        return newSizes;
    }
    else if(h >= 800|| w >= 800){
        newSizes['h'] = h * 0.60;
        newSizes['w'] = w * 0.60;
        return newSizes;
    }
    else if(h >= 400 || w >= 400){
        newSizes['h'] = h * 0.85;
        newSizes['w'] = w * 0.85;
        return newSizes;
    }

    return newSizes;
};