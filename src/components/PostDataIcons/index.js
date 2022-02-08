import React, {useContext, useState} from 'react';
import s from "./index.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faBookmark, faHeart} from "@fortawesome/free-solid-svg-icons";
import {doc, updateDoc} from "firebase/firestore";
import {AuthContext} from "../../context";

export const PostDataIcons = ({postId, category, numberComments, bookmarks, likes}) => {
    const {db, auth} = useContext(AuthContext);
    const [bookmarked, setBookmarked] = useState(searchMatches(bookmarks));
    const [liked, setLiked] = useState(searchMatches(likes));

    function searchMatches(data) {
        return data.includes(auth?.currentUser?.uid, 0);
    }

    const addOrDeleteLikeOrBookmark = async (setFunc, active, data, nameFieldUpdate) => {
        if (auth?.currentUser) {

            if (active) {
                data.splice(data.indexOf(auth.currentUser.uid, 0), 1);
                setFunc(false);
            } else {
                data.push(auth.currentUser.uid);
                setFunc(true);
            }

            await updateDoc(doc(db, category, postId), {
                [nameFieldUpdate]: [...data],
            });
        }
    }


    return (
        <div className={s["post__data-icons"]}>

            <div onClick={() => addOrDeleteLikeOrBookmark(setLiked, liked, likes, "likes")}
                 className={s["post__data-icons__item"]}>
                    <span className={s["post__data-icons__item__link"]}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={liked === true
                                ?
                                s["post__data-icons__item__icon"] + " " + s["post__data-icons__item__icon-active"]
                                :
                                s["post__data-icons__item__icon"]

                            }
                        />
                    <span className={s["post__data-icons__item__counter"]}>{likes?.length}</span>
                    </span>
            </div>


            <div className={s["post__data-icons__item"]}>
                <a className={s["post__data-icons__item__link"]} href="#!">
                    <FontAwesomeIcon
                        icon={faComments}
                        className={s["post__data-icons__item__icon"]}
                    />
                    <p className={s["post__data-icons__item__counter"]}>{numberComments?.length}</p>
                </a>
            </div>

            <div onClick={() => addOrDeleteLikeOrBookmark(setBookmarked, bookmarked, bookmarks, "bookmarks")}
                 className={s["post__data-icons__item"]}>
                    <span className={s["post__data-icons__item__link"]}>
                        <FontAwesomeIcon
                            icon={faBookmark}
                            className={bookmarked === true
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