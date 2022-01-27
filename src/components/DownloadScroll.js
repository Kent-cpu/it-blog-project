import React, {useEffect, useRef} from 'react';

export const DownloadScroll = ({downloadData}) => {
    const lastElementVisible = useRef();
    const observer = useRef();

    useEffect(() => {

        if (observer.current) {
            observer.current.disconnect();
        }

        const scrollPosts = (entries) => {
            if (entries[0].isIntersecting) {
                downloadData();
            }
        };

        observer.current = new IntersectionObserver(scrollPosts);
        if (lastElementVisible.current !== undefined) {
            observer.current.observe(lastElementVisible.current);
        }

    }, [lastElementVisible.current]);


    return (
        <div ref={lastElementVisible} style={{height: "40px"}}>

        </div>
    );
};

