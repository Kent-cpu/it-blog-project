import React, {useContext, useEffect, useRef, useState} from 'react';
import {collection, doc, getDoc, getDocs, limit, orderBy, query, where, startAt, startAfter} from "firebase/firestore";
import {AuthContext} from "../../context";
import {PreviewPost} from "../../components/PreviewPost";
import moment from "moment-timezone";
import {DownloadScroll} from "../../components/DownloadScroll";

export const SearchPost = ({requestBool, searchText}) => {

    const {db} = useContext(AuthContext);
    const [suitablePosts, setSuitablePosts] = useState([]);
    const lastUploadedPost = useRef("");

    const searchForMatches = async () => {
        if (lastUploadedPost.current === undefined) {
            return;
        }

        const searchRequest =
            await query(collection(db, "search_post"),
                orderBy("dateCreationPost", "desc"),
                startAfter(lastUploadedPost.current),
                where("searchTableIndex", "array-contains", searchText),
                limit(1));
        const searchAnswer = await getDocs(searchRequest);
        const searchData = searchAnswer.docs.map((post) => post.data());

        lastUploadedPost.current = searchAnswer?.docs[searchAnswer?.docs?.length - 1]?.data().dateCreationPost;

        return searchData;
    }


    const getPostsScroll = async () => {
        const newPosts = await downloadPost();
        newPosts?.length > 0 && setSuitablePosts((oldPost) => [...oldPost, ...newPosts]);

    }

    const getPostsClick = async () => {
        const newPosts = await downloadPost();
        newPosts?.length > 0 && setSuitablePosts(newPosts);
    }


    const downloadPost = async () => {
        const x = await searchForMatches();
        const foundPosts = [];
        for (let i = 0; i < x?.length; ++i) {
            const postRef = doc(db, x[i].categoryPost, x[i].idPost);
            const post = await getDoc(postRef);
            foundPosts.push(post.data());
        }
        return foundPosts;
    }

    useEffect(async () => {
        if (requestBool) {
            await getPostsClick();
        }
    }, [requestBool, searchText])


    return (
        <div style={{marginTop: "30px"}}>

            {
                suitablePosts?.length > 0
                &&
                <div>
                    {
                        suitablePosts.map((post, index) => {

                            return <PreviewPost key={index}
                                                id={post.id}
                                                category={post.category}
                                                title={post.title}
                                                previewText={post.previewText}
                                                previewImg={post.previewImg}
                                                creatorNickname={post.creatorNickname}
                                                creatorAvatar={post.creatorAvatar}
                                                text={post.text}
                                // likes={post.likes.stringValue}
                                                comments={post.comments}
                                                dateCreation={moment.unix(post.dateCreation.seconds).locale("ru").format("LLL")}
                                                bookmarks={post.bookmarks}
                            />

                        })
                    }
                    <DownloadScroll downloadData={getPostsScroll}/>
                </div>

            }

        </div>
    );
};

