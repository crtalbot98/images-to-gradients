import React from "react";

function ScrollHandler(...Components){
    const CompWithProps = Components[0];
    const Component = Components[1];

    const [scrolling, setScrolling] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    const scrollListener = () => {
        setScrolling(document.body.getBoundingClientRect().top <= -20)
    };

    return function(props){
        if(scrolling) return <CompWithProps {...props}/>;
        return <Component/>
    }
}

export default ScrollHandler;