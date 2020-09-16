import React from "react";

export const ImageContext = React.createContext({ // Create the context
    image: null,
    isLoaded: false,
    loading: false,
    setImage: () => {},
    setLoaded: () => {},
    setLoading: () => {}
});

export const ImageProvider = (props) => {

    const setImage = (image) => { // Create function to update the image value
        setState({...state, image: image})
    };

    const setLoaded = (isLoaded) => { // Create function to update the images loaded value
        setState({...state, isLoaded: isLoaded})
    };

    const setLoading = (isLoading) => { // Create function to update the current loading status
        setState({...state, loading: isLoading})
    };

    const initState = { // Declare the state with the new values
        image: null,
        isLoaded: false,
        setImage: setImage,
        setLoaded: setLoaded,
        setLoading: setLoading
    };

    const [state, setState] = React.useState(initState); // Updates reacts state

    return (
        <ImageContext.Provider value={state}>
            {props.children}
        </ImageContext.Provider>
    )
};