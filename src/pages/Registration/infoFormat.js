import React, {memo, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";


const styles = {
    info: {
        display: "none",
    },

    "info-active": {
        position: "absolute",
        width: "200px",
        padding: "8px 10px 8px 10px",
        backgroundColor: "#0035f5",
        borderRadius: "4px",
        fontSize: "14px",
        color: "#fff",
        marginLeft: "30px",
    }

}

const InfoFormat = (props) => {
    const [visible, setVisible] = useState(false);

    const icon = (
        <FontAwesomeIcon
            icon={faInfoCircle}
            style={{
                fontSize: "18px",
                color: "#6b6363",
            }}
        />
    );

    return (
        <div style={
            {
                display: "inline-flex",
                cursor: "pointer",
                alignItems: "center",
            }
        } onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {icon}
            <div style= {visible ? styles["info-active"]: styles["info"]}>
                {props.children}
            </div>
        </div>
    );
};

export default memo(InfoFormat);