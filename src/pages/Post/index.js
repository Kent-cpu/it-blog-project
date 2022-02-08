import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import previewPostStyles from "../../components/PreviewPost/index.module.scss";
import postStyles from "./index.module.scss";
import {Comments} from "./Comments/Comments";
import {PostDataIcons} from "../../components/PostDataIcons";
import Loader from "react-loader-spinner";
import {AuthContext} from "../../context";
import {doc, getDoc} from "firebase/firestore";
import moment from "moment-timezone";
import uploadAvatarCreatorPosts from "../../utils/uploadAvatarCreatorPosts";


export const Post = () => {
    const location = useLocation();
    const [dataPost, setDataPost] = useState(location.state[0]);
    const [isLoader, setIsLoader] = useState(true);
    const {db} = useContext(AuthContext);


    const convertTime = (time) => {
        return moment.unix(time.seconds).locale("ru").format("LLL");
    }

    const getPost = async () => {
        const post = await getDoc(doc(db, dataPost.category, dataPost.id));
        const currentDataPost = post.data();
        await uploadAvatarCreatorPosts([currentDataPost]);
        currentDataPost.dateCreation = convertTime(currentDataPost.dateCreation);
        setDataPost(currentDataPost);
        setIsLoader(false);
    }

    useEffect(async () => {
        await getPost();
    }, []);


    return (
        <div>

            <div className="main-container">
                {isLoader === true ?
                    <div className="centered-container"><Loader type="BallTriangle"/></div>
                    :
                    <div style={{marginTop: "30px"}}>
                        <div className={previewPostStyles["post"]}>
                            <div className={previewPostStyles["post__creator-info"]}>
                                <div className={previewPostStyles["post__creator-info__avatar-container"]}>
                                    <img className={previewPostStyles["post__creator-info__avatar"]}
                                         src={dataPost.creatorAvatar} alt=""/>
                                </div>
                                <span>{dataPost.creatorNickname}</span>
                                <p className={previewPostStyles["post__creator-info__data-creation"]}>{dataPost.dateCreation}</p>
                            </div>

                            <h3 href={"!#"} className={previewPostStyles["post__title"]}>{dataPost.title}</h3>
                            <div className={previewPostStyles["post__preview-img-container"]}>
                                <img className={previewPostStyles["post__preview-img"]} src={dataPost.previewImg}
                                     alt=""/>
                            </div>

                            <div>
                                <p className={previewPostStyles["post__text"]}>{dataPost.previewText}</p>
                            </div>

                            <div className={postStyles["post__content"]}>
                                <h3>Основная часть</h3>
                                <p>{dataPost.text}</p>
                            </div>

                            <PostDataIcons
                                postId={dataPost.id}
                                category={dataPost.category}
                                likes={dataPost.likes}
                                bookmarks={dataPost.bookmarks}
                                numberComments={dataPost.comments}/>
                        </div>
                        <Comments
                            postId={dataPost.id}
                            category={dataPost.category}
                        />
                    </div>
                }
            </div>
        </div>
    );
};