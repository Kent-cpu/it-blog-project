import React from 'react';
import styles from "./ProfileSetting/index.module.scss";
import InfoSaveItem from "./InfoSaveItem";

export const STATUS = {
    error: "Error",
    success: "Ok",
};

export const InfoSave = ({items, setItems}) => {


    return (
        <div className=
                 {
                     items.length !== 0 ? styles["info-about-save"] + " " + styles["info-about-save-active"] : styles["info-about-save"]
                 }
        >
            {items.length > 0 && items.map((element, index) => {

                return <InfoSaveItem
                    index={element.id}
                    key={index}
                    text={element.text}
                    items={items}
                    setItems={setItems}
                    status={element.status}/>
            })}
        </div>
    );
};