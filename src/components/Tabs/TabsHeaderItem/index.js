import React from 'react';
import styles from "./index.module.scss";


export const TabsHeaderItem = ({text, active, onClick}) => {

    const handleClick = () => {
        onClick();
    }

    return (
        <div className={styles["tabs-header-item"]} onClick={handleClick}>
            <div className={styles["tabs-header-item__content"]}>
                <span
                    className={[
                        (active === true
                            ?
                            styles["tabs-header-item__title"] + " " + styles["tabs-header-item__title--active"]
                            :
                            styles["tabs-header-item__title"])
                    ]}

                    >{text}</span>
            </div>
        </div>
    );
};

