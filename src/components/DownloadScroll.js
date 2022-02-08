import React, {useEffect, useRef, useState} from 'react';
import Loader from "react-loader-spinner";

export const DownloadScroll = ({downloadData}) => {
    const lastElementVisible = useRef();
    const observer = useRef();
    const [isLoader, setIsLoader] = useState(false);

    useEffect( () => {

        if (observer.current) {
            observer.current.disconnect();

        }

        const scrollPosts = async (entries) => {
            if (entries[0].isIntersecting) {
                try{
                    setIsLoader(true);
                    await downloadData();
                    setIsLoader(false)
                }catch {
                    setIsLoader(false);
                }

            }
        };

        observer.current = new IntersectionObserver(scrollPosts);
        if (lastElementVisible.current !== undefined) {
            observer.current.observe(lastElementVisible.current);
        }

    }, []);


    return (
        <div>
            {
                isLoader ?
                    <div><Loader type="TailSpin"/></div>
                    :
                    <div ref={lastElementVisible} style={{height: "40px"}}></div>
            }
        </div>
    );
};