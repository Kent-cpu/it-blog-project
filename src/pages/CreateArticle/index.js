import React, {useContext} from 'react';
import {Header} from "../../components/Header";
import {CreatePostWindow} from "./CreatePostWindow";
import {TimerVerifiedEmail} from "./TimerVerifiedEmail";
import {AuthContext} from "../../context";

export const CreateArticle = () => {
    const {auth} = useContext(AuthContext);

    return (
        <div>
            <Header/>
            <div className="main-container">
                {
                    //
                        <CreatePostWindow/>
                        // :
                        // <TimerVerifiedEmail/>
                }
            </div>
        </div>
    );
};

