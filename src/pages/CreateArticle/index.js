import React, {useContext} from 'react';
import {EditorArticle} from "./EditorArticle";
import {TimerVerifiedEmail} from "./TimerVerifiedEmail";
import {AuthContext} from "../../context";

const CreateArticle = () => {
    const {auth} = useContext(AuthContext);

    return (
        <div>

            <div className="main-container">
                {
                    //
                        <EditorArticle/>
                        // :
                        // <TimerVerifiedEmail/>
                }
            </div>
        </div>
    );
};

export default CreateArticle;