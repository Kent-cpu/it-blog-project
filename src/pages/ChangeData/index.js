import React, {useContext} from 'react';
import {RecoverPassword} from "../RecoverPassword";
import {AuthContext} from "../../context";
import {applyActionCode} from "firebase/auth";
import {useLocation} from "react-router-dom";


export const ChangeData = () => {
    const {auth} = useContext(AuthContext);
    const linkParameters =  new URLSearchParams(useLocation().search);

    const pageLoadAction = () => {
        const actionCode = linkParameters.get("oobCode");
        const mode = linkParameters.get("mode");
        if(mode === "resetPassword"){
            return <RecoverPassword actionCode={actionCode}/>;
        }else if(mode === "verifyEmail"){
            applyActionCode(auth, actionCode).then(() => {
               window.location.href = "http://localhost:3000/create/article";
            }).catch((error) => {
                // Code is invalid or expired. Ask the user to verify their email address
                // again.
            });
        }
    }


    return (
        <div>
            {pageLoadAction()}
        </div>
    );
};

