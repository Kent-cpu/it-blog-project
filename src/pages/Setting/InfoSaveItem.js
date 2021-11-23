import React, {useEffect, useRef} from 'react';
import styles from "./ProfileSetting/index.module.scss";
import {STATUS} from "./InfoSave";


const InfoSaveItem = ({text, index, status, setItems}) => {
    const ref = useRef();

        useEffect(() => {
            setTimeout(() => {
                setItems(prevData => prevData.filter(element => element.id !== index ));
            }, 6000);


            setTimeout(() => {
                if(ref.current){
                    ref.current.style.transform = "translateY(-100vh)";
                }

            }, 5000);

        }, [index]);


        return (
            <div
                ref={ref}
                className={ status === STATUS.success ? styles["info-about-save__item"]: styles["info-about-save__item"] + " " + styles["info-about-save__item-error"] }>
                    {text}
            </div>
        );
    }
;

export default InfoSaveItem;