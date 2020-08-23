import React from "react";

export const ImageContext = React.createContext({ // Create the context
    image: null,
    setImage: () => {}
});

export const ImageProvider = (props) => {

    const setImage = (image) => { // Create function to update the image value
        setState({...state, image: image})
    };

    const initState = { // Declare the state with the new values
        image: null,
        setImage: setImage
    };

    const [state, setState] = React.useState(initState);

    return (
        <ImageContext.Provider value={state}>
            {props.children}
        </ImageContext.Provider>
    )
};