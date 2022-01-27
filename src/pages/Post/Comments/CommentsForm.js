import React, {useContext, useState} from 'react';
import s from "./index.module.scss";
import {doc, updateDoc} from "firebase/firestore";
import {AuthContext} from "../../../context";
import firebase from "firebase/compat";
import { v4 as uuidv4 } from 'uuid';

export const CommentsForm = ({postId, category, nickname, rootOnReeply, setBoxReplyComment, rootIdComment}) => {

    const [textComment, setTextComment] = useState("");
    const {db, auth} = useContext(AuthContext);


    const addComment = async () => {
        const idСomment =  uuidv4();

        await updateDoc(doc(db, category, postId), {
            comments: firebase.firestore.FieldValue.arrayUnion({
                uid: idСomment,
                uidCreator: auth.currentUser.uid,
                text: rootOnReeply ? `${nickname}, ` + textComment: textComment ,
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
                rootOnReeply &&
                    <div className={s["comments__form__header"]}>
                        <p>Ответить @{nickname}</p>
                        <button
                            className={s["comments__form__header__close-btn"]}
                            onClick={(e) => setBoxReplyComment(false)}
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
                onChange={(e) => setTextComment(e.target.value)}
            >
                </textarea>


            <button disabled={
                textComment.length > 0
                    ?
                    false
                    :
                    true
            } onClick={addComment} className={s["comments__form__add-post"]}>Отправить
            </button>
        </div>
    );
};
