import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./index.module.scss"
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";

export const DropDownList = ({getCurrentElement, listItems, width}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(listItems[0]);

    useEffect(() => {
        getCurrentElement(prev => {

            return {...prev, gender: currentItem};
        })
    }, [currentItem])


    return (
        <div style={{width:width}} className={s["drop-down-list"]}>
            <div
                className={s["drop-down-list__item-current"]}
                onClick={() => setIsVisible(visible => !visible)}>

                <p className={s["drop-down-list__item__title"]}>{currentItem}</p>
                <FontAwesomeIcon
                    icon={faCaretDown}
                />
            </div>

            <div className={isVisible === false ? s["drop-down-list__all-items"]: s["drop-down-list__all-items_active"]}>
                {listItems.map((item, index) => {
                    return <div
                                key={index}
                                onClick={() => {
                                    setCurrentItem(item);
                                    setIsVisible(false);
                                }}
                                className={s["drop-down-list__item"]}>{item}</div>
                })}
            </div>
        </div>
    );
};

