import React, { useState } from "react";

//Modified from https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
export default function TextFade(props) {
    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
    }, []);
    return (
        <div
            className={`text-fade ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}