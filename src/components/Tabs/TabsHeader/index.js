import React from 'react';
import styles from "./index.module.scss";
import {TabsHeaderItem} from "../TabsHeaderItem";

export const TabsHeader = ({tabs, activeIndex, onTabClick}) => {

    const handleClick = index => {
        onTabClick(index);
    }

    return (
        <div className={styles["tabs-header__container"]}>
            {
                tabs.map((tab, index) => {
                    return (
                        <div key = {index} className={styles["tabs-header__header-item-container"]}>
                            <TabsHeaderItem
                                text = {tab.text}
                                onClick={() => handleClick(index)}
                                active={index === activeIndex}/>
                        </div>
                    )
                })
            }
        </div>
    );
};
