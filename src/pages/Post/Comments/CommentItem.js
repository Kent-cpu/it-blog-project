import React, {useContext, useState} from 'react';
import s from "./index.module.scss";
import {CommentsForm} from "./CommentsForm";
import moment from "moment-timezone";
import {AuthContext} from "../../../context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart as heartSolid} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeart as heartRegular} from "@fortawesome/free-regular-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {faCaretUp} from "@fortawesome/free-solid-svg-icons/faCaretUp";

export const CommentItem = ({
                                creatorUID,
                                creatorAvatar,
                                text,
                                rootIdComment,
                                nickname,
                                dateCreation,
                                postId,
                                category,
                                replies,
                                addLikeComment,
                                commentId,
                                likes
                            }) => {

    const {auth} = useContext(AuthContext);
    const [boxReplyComment, setBoxReplyComment] = useState(false);
    const [lookAnswer, setLookAnswer] = useState(true);
    const isReplying = auth?.currentUser !== null && auth?.currentUser?.uid !== creatorUID;
    const isLike = likes?.includes(auth?.currentUser?.uid);

    const getNumberRepliedComments = (repliesCommentsLength) => {
        if (repliesCommentsLength === 1) {
            return "Показать ответ";
        } else if (repliesCommentsLength === 2 || repliesCommentsLength === 3 || repliesCommentsLength === 4 || repliesCommentsLength === 11) {
            return `Показать ${repliesCommentsLength} ответа`;
        }
        return `Показать ${repliesCommentsLength} ответов`;
    }

    return (
        <div className={s["comments__item"]}>
            <div className={s["comments__item__header"]}>
                <img className={s["comments__item__creatorAvatar"]} src={creatorAvatar} alt=""/>
                <span className={s["comments__item__user-nickname"]}>{nickname}</span>
                <span className={s["comments__item__create-date"]}>{dateCreation}</span>
            </div>

            <div style={{marginBottom: "12px"}}>
                <p>{text}</p>
            </div>

            {
                boxReplyComment
                    ?
                    <CommentsForm
                        rootIdComment={rootIdComment}
                        rootOnReeply={true}
                        nickname={nickname}
                        setBoxReplyComment={setBoxReplyComment}
                        postId={postId}
                        category={category}
                    />
                    :
                    <div className={s["comments__footer"]}>
                        {
                            isReplying &&
                            <div className={s["comments__footer__item"]}>
                                <button
                                    type="button"
                                    className={s["comments__reply-btn"]}

                                    onClick={() => setBoxReplyComment((prev) => !prev)}
                                >Ответить
                                </button>
                            </div>
                        }

                        <div onClick={() => addLikeComment(commentId)} className={s["comments__footer__item"]}>
                            <FontAwesomeIcon
                                icon={isLike ? heartSolid : heartRegular}
                                className={isLike ?
                                    s["comments__like-btn"] + " " + s["comments__like-btn-active"]
                                    :
                                    s["comments__like-btn"]
                                }
                            />
                            <span>{likes?.length}</span>
                        </div>
                    </div>
            }

            {replies?.length > 0 && (
                lookAnswer == true ?
                    <div onClick={() => setLookAnswer(false)} className={s["comments__look-more"]}>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className={s["comments__look-more__icon"]}
                        />
                        <p className={s["comments__look-more__text"]}>{getNumberRepliedComments(replies?.length)}</p>

                    </div>

                    :
                    <div>
                        <div onClick={() => setLookAnswer(true)} className={s["comments__look-more"]}>
                            <FontAwesomeIcon
                                icon={faCaretUp}
                                className={s["comments__look-more__icon"]}
                            />
                            <p className={s["comments__look-more__text"]}>Скрыть ответы</p>
                        </div>

                        {
                            replies.map(comment => {
                                return <CommentItem
                                    key={comment.uid}
                                    commentId={comment.uid}
                                    likes={comment.likes}
                                    addLikeComment={addLikeComment}
                                    postId={postId}
                                    rootIdComment={rootIdComment}
                                    category={category}
                                    creatorUID={comment.uidCreator}
                                    text={comment.text}
                                    creatorAvatar={comment.creatorAvatar}
                                    nickname={comment.nickname}
                                    dateCreation={moment.unix(comment.dateCreation.seconds).format("MM.DD.YYYY в HH:mm")}
                                />
                            })
                        }
                    </div>

            )
            }

        </div>
    );
};