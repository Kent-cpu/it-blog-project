import React from 'react';
import s from "./index.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";

export const CommentsUpdate = ({downloadComments}) => {

    return (
        <div onClick={downloadComments} className={s["comments__update"]}>
                <FontAwesomeIcon
                    icon={faSync}
                    className={s["comments__update__btn"]}
                />

        </div>
    );
};