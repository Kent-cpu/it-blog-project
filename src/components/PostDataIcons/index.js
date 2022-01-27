import React, {useContext, useState} from 'react';
import s from "./index.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {doc, updateDoc} from "firebase/firestore";
import {AuthContext} from "../../context";

export const PostDataIcons = ({postId, category, numberComments, bookmarks}) => {

    const {db, auth} = useContext(AuthContext);
    const [bookmarked, setBookmarked] = useState(searchMatchesBookmarks());

    function searchMatchesBookmarks() {
        return bookmarks.includes(auth?.currentUser?.uid, 0);
    }

    const addBookmarks = async () => {
        if(bookmarked && auth?.currentUser){

            const index = bookmarks.indexOf(auth.currentUser.uid, 0);

            bookmarks.splice(index, 1);
            await updateDoc(doc(db, category, postId), {
                bookmarks: [
                    ...bookmarks
                ]
            });

            setBookmarked(false);
        }else{
            if(auth?.currentUser){
                bookmarks.push(auth.currentUser.uid);
                await updateDoc(doc(db, category, postId), {
                    bookmarks: [
                        ...bookmarks
                    ]
                });
                setBookmarked(true);
            }

        }

    }

    return (
        <div className={s["post__data-icons"]}>
            <div className={s["post__data-icons__item"]}>
                <a className={s["post__data-icons__item__link"]} href="#!">
                    <FontAwesomeIcon
                        icon={faComments}
                        className={s["post__data-icons__item__icon"]}
                    />
                    <p className={s["post__data-icons__item__counter"]}>{numberComments?.length}</p>
                </a>
            </div>

            <div className={s["post__data-icons__item"]}>
                    <span onClick={addBookmarks}>
                        <FontAwesomeIcon
                            icon={faBookmark}
                            className={bookmarked == true
                                ?
                                s["post__data-icons__item__icon"] + " " + s["post__data-icons__item__icon-active"]
                                :
                                s["post__data-icons__item__icon"]

                        }
                        />
                    <span className={s["post__data-icons__item__counter"]}>{bookmarks?.length}</span>
                    </span>
            </div>

        </div>
    );
};

