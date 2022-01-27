import React, {useContext, useEffect, useState} from 'react';
import {CommentsForm} from "./CommentsForm";
import s from "./index.module.scss";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {AuthContext} from "../../../context";
import {CommentItem} from "./CommentItem";
import moment from "moment-timezone";
import {CommentsUpdate} from "./CommentsUpdate";

export const Comments = ({postId, category}) => {

    const [comments, setComments] = useState([]);
    const [isUpdateComments, setUpdateComments] = useState(false);
    const {db, auth} = useContext(AuthContext);


    const downloadComments = async () => {
        setUpdateComments(true);
        const dataPost = await getDoc(doc(db, category, postId));
        const comments = await dataPost.data().comments;
        const modifiedPost = [];

        for (let i = 0; i < comments.length; ++i) {
            let query = false;
            let index = 0;
            for (let j = 0; j < modifiedPost.length; ++j) {
                if (modifiedPost[j].uidCreator === comments[i].uidCreator) {
                    query = true;
                    index = j;
                    break;
                }
            }

            if (query) {
                comments[i].nickname = modifiedPost[index]?.nickname;
                comments[i].creatorAvatar = modifiedPost[index]?.creatorAvatar;
                modifiedPost.push(comments[i]);
            } else {
                const user = await getDoc(doc(db, "Users", comments[i].uidCreator));
                const userData = user.data();
                comments[i].nickname = userData.nickname;
                comments[i].creatorAvatar = userData.avatar;
                modifiedPost.push(comments[i]);
            }
        }

        modifiedPost.sort((a, b) =>
            (new Date(b.dateCreation.seconds).getTime() - new Date(a.dateCreation.seconds).getTime())
        );

        setComments(modifiedPost);
        setUpdateComments(false);
    }

    const getRoot = () => {
        return comments.filter((comment) => comment.parentId === null)
    }


    const getReplies = (commentId) => {
        return comments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort((a, b) =>
                (new Date(a.dateCreation.seconds).getTime() - new Date(b.dateCreation.seconds).getTime())
            );
    }

    const addLikeComment = async (commentId) => {
        if(auth?.currentUser){
            let indexComment = 0;
            comments.forEach((comment, index) => {
                if(comment.uid === commentId){
                    indexComment = index;
                }
            })

            const cloneComment = [...comments];
            if(cloneComment[indexComment].likes.includes(auth.currentUser.uid)){
                const indexRemoveLike = cloneComment[indexComment].likes.indexOf(auth.currentUser.uid);
                cloneComment[indexComment].likes.splice(indexRemoveLike, 1);
            }else{
                cloneComment[indexComment].likes.push(auth.currentUser.uid);
            }

            try{
                await updateDoc(doc(db, category, postId), {
                    comments: [
                        ...cloneComment
                    ]
                });
                setComments(cloneComment);
            }catch {
                console.error("Добавление лайка");
            }
        }
    }

    useEffect(async () => {

        await downloadComments();

    }, []);


    return (
        <div className={s["comments"]}>

            <div className={s["comments__title"]}>
                <p className={s["comments__title__text"]}>Комментарии</p>
            </div>

            <div className={s["comments__list"]}>

                {isUpdateComments
                    ?
                    <div>
                        <p className={s["comments__loading-title"]}>Загрузка комментариев ...</p>
                    </div>
                    :

                    comments?.length > 0
                        ?
                        <div>
                            <div style={{marginBottom: "70px"}}>
                                {
                                    getRoot(comments).map((comment, index) => {
                                        return <CommentItem
                                            key={index}
                                            commentId = {comment.uid}
                                            postId={postId}
                                            replies={getReplies(comment.uid)}
                                            rootIdComment={comment.uid}
                                            category={category}
                                            text={comment.text}
                                            creatorUID={comment.uidCreator}
                                            creatorAvatar={comment.creatorAvatar}
                                            nickname={comment.nickname}
                                            addLikeComment = {addLikeComment}
                                            likes = {comment.likes}
                                            dateCreation={moment.unix(comment.dateCreation.seconds).format("MM.DD.YYYY в HH:mm")}
                                        />
                                    })
                                }
                            </div>

                            <CommentsUpdate downloadComments={downloadComments}/>
                        </div>

                        :
                        <div>
                            <div className={s["comments__empty"]}>
                                Здесь пока нет ни одного комментария, вы можете стать первым!
                            </div>
                            <CommentsUpdate downloadComments={downloadComments}/>

                        </div>
                }

            </div>
            <CommentsForm category={category} postId={postId}/>
        </div>
    );
};