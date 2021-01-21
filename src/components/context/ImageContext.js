import React from "react";

export const ImageContext = React.createContext({ // Create the context
    image: null,
    imagesLoaded: false,
    setImage: () => {},
    setImagesLoaded: () => {}
});

export const ImageProvider = (props) => {

    const setImage = (image) => { // Create function to update the image value
        setState({...state, image: image});
        initState.image = image
    };

    const setImagesLoaded = (loaded) => {
        setState({...state, imagesLoaded: loaded});
        initState.imagesLoaded = loaded
    };

    const initState = { // Declare the state with the new values
        image: null,
        imagesLoaded: false,
        setImage: setImage,
        setImagesLoaded: setImagesLoaded
    };

    const [state, setState] = React.useState(initState); // Updates reacts state

    return (
        <ImageContext.Provider value={state}>
            {props.children}
        </ImageContext.Provider>
    )
};