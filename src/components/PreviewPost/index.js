import React from 'react';
import s from "./index.module.scss"
import {useHistory} from "react-router-dom";
import {PostDataIcons} from "../PostDataIcons";


export const PreviewPost = (postInfo) => {
    const router = useHistory();

    const openPost = () => {
        router.push(`/post`, [postInfo]);
    }


    return (
        <div className={s["post"]}>
            <div className={s["post__creator-info"]}>
                <div className={s["post__creator-info__avatar-container"]}>
                    <img className={s["post__creator-info__avatar"]} src={postInfo.creatorAvatar} alt=""/>
                </div>
                <span>{postInfo.creatorNickname}</span>
                <p className={s["post__creator-info__data-creation"]}>{postInfo.dateCreation}</p>
            </div>

            <div style={{marginBottom: "20px"}}>
                <p onClick={openPost} className={s["post__title"]}>{postInfo.title}</p>
                <div className={s["post__preview-img-container"]}>
                    <img className={s["post__preview-img"]} src={postInfo.previewImg} alt=""/>
                </div>

                <div>
                    <p className={s["post__text"]}>{postInfo.previewText}</p>
                </div>

                <button onClick={openPost} className={s["post__open"]}>Читать дальше</button>
            </div>

            <PostDataIcons
                category={postInfo.category}
                postId={postInfo.id}
                bookmarks={postInfo.bookmarks}
                numberComments={postInfo.comments}
                likes={postInfo.likes}/>
        </div>
    );
};