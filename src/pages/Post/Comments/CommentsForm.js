import React, {useContext, useState} from 'react';
import s from "./index.module.scss";
import {doc, updateDoc} from "firebase/firestore";
import {AuthContext} from "../../../context";
import firebase from "firebase/compat";
import {v4 as uuidv4} from 'uuid';
import {LOGIN} from "../../../utils/constants";
import {NavLink} from "react-router-dom";

export const CommentsForm = ({postId, category, nickname, rootOnReeply, setBoxReplyComment, rootIdComment}) => {

    const [textComment, setTextComment] = useState("");
    const {db, auth} = useContext(AuthContext);


    const addComment = async () => {
        const idComment = uuidv4();

        await updateDoc(doc(db, category, postId), {
            comments: firebase.firestore.FieldValue.arrayUnion({
                uid: idComment,
                uidCreator: auth.currentUser.uid,
                text: rootOnReeply ? `${nickname}, ` + textComment : textComment,
                dateCreation: firebase.firestore.Timestamp.now(),
                parentId: rootOnReeply ? rootIdComment : null,
                likes: [],
            })
        });
        rootOnReeply && setBoxReplyComment(false); // закрытие формы отправки комментарий
    }


    return (
        <div className={s["comments__form"]}>

            {
                auth?.currentUser ? <div>
                    {
                        rootOnReeply && <div className={s["comments__form__header"]}>
                            <p>Ответить @{nickname}</p>
                            <button
                                className={s["comments__form__header__close-btn"]}
                                onClick={() => setBoxReplyComment(false)}
                            >&#10006;</button>
                        </div>

                        ||

                        <div className={s["comments__form__header"]}>
                            <p>Написать комментарий</p>
                        </div>
                    }

                    <textarea
                        className={s["comments__form__editor"]}
                        placeholder="Введите текст"
                        value={textComment}
                        onChange={(e) => setTextComment(e.target.value)}></textarea>

                    <button
                        onClick={addComment}
                        disabled={!(textComment.length > 0)}
                        className={s["comments__form__add-post"]}>Отправить
                    </button>
                </div>

                :

                <div style={{textAlign: "center",}}>
                    Только полноправные пользователи могут оставлять комментарии.
                    <NavLink to={LOGIN} style={{textDecoration: "none", margin: "0px 4px"}}>
                        Войдите,
                    </NavLink>
                    пожалуйста.
                </div>
            }
        </div>
    );
};