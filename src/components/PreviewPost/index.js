import React from 'react';
import s from "./index.module.scss"
import {useHistory} from "react-router-dom";
import {PostDataIcons} from "../PostDataIcons";


export const PreviewPost = (props) => {

    const router = useHistory();

    const openPost = () => {
        router.push(`/post`, [props]);
    }


    return (
        <div className={s["post"]}>
            <div className={s["post__creator-info"]}>
                <div className={s["post__creator-info__avatar-container"]}>
                    <img className={s["post__creator-info__avatar"]} src={props.creatorAvatar} alt=""/>
                </div>
                <span>{props.creatorNickname}</span>
                <p className={s["post__creator-info__data-creation"]}>{props.dateCreation}</p>
            </div>

            <div style={{marginBottom: "20px"}}>
                <a href={"!#"} className={s["post__title"]}>{props.title}</a>
                <div className={s["post__preview-img-container"]}>
                    <img className={s["post__preview-img"]} src={props.previewImg} alt=""/>
                </div>

                <div>
                    <p className={s["post__text"]}>{props.previewText}</p>
                </div>

                <button onClick={openPost} className={s["post__open"]}>Читать дальше</button>
            </div>
            <PostDataIcons category={props.category} postId={props.id} bookmarks={props.bookmarks}
                           numberComments={props.comments}/>
        </div>
    );
};

