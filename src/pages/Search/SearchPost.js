import React, {useContext, useEffect, useRef, useState} from 'react';
import {collection, doc, getDoc, getDocs, limit, orderBy, query, where, startAfter} from "firebase/firestore";
import {AuthContext} from "../../context";
import {PreviewPost} from "../../components/PreviewPost";
import {DownloadScroll} from "../../components/DownloadScroll";
import s from "./index.module.scss";
import moment from "moment-timezone";
import Loader from "react-loader-spinner";


const searchForMatchesType = {
    newTitle: "new-title",
    oldTitle: "old-title",
}

const SearchPost = ({searchStatesByNewTitle, setSearchStatesByNewTitle, searchText}) => {

    const {db} = useContext(AuthContext);
    const lastUploadedPost = useRef("");
    const [suitablePosts, setSuitablePosts] = useState([]);

    const searchForMatchesTitle = async (type) => {
        const searchRequest =
            await query(collection(db, "search_post"),
                orderBy("dateCreationPost", "desc"),
                type === searchForMatchesType.oldTitle ? startAfter(lastUploadedPost.current) : startAfter(""),
                where("searchTableIndex", "array-contains", searchText.toLowerCase()),
                limit(2));
        const searchAnswer = await getDocs(searchRequest);
        const searchData = searchAnswer.docs.map((post) => post.data());

        lastUploadedPost.current = searchAnswer?.docs[searchAnswer?.docs?.length - 1]?.data().dateCreationPost;

        return searchData;
    }


    const getPostsOldTitle = async () => {
        if (lastUploadedPost.current !== undefined) {
            try {
                const newPosts = await downloadPost(searchForMatchesType.oldTitle);
                newPosts?.length > 0 && setSuitablePosts((oldPost) => [...oldPost, ...newPosts]);
            } catch {
                setSuitablePosts( []);
            }
        }
    }

    const getPostsByNewTitle = async () => {
        try {
            const newPosts = await downloadPost(searchForMatchesType.newTitle);
            setSearchStatesByNewTitle(false);
            setSuitablePosts(newPosts);
        } catch {
            setSearchStatesByNewTitle(false);
            setSuitablePosts([]);
        }
    }


    const downloadPost = async (type) => {
        const foundPosts = [];
        const foundMatches = await searchForMatchesTitle(type);

        for (let i = 0; i < foundMatches?.length; ++i) {
            const postRef = doc(db, foundMatches[i].categoryPost, foundMatches[i].idPost);
            const post = await getDoc(postRef);
            foundPosts.push(post.data());
        }

        return foundPosts;
    }

    useEffect(async () => {
        if (searchStatesByNewTitle) {
            await getPostsByNewTitle();
        }
    }, [searchStatesByNewTitle])


    return (
        <div className={s["post-found-list"]}>

            {searchStatesByNewTitle ?
                <div className="centered-container">
                    <Loader type="TailSpin"/>
                </div>
                :
                suitablePosts?.length > 0
                    ?
                    <div>
                        {
                            suitablePosts.map((post, index) => {
                                return <PreviewPost key={post.id}
                                                    id={post.id}
                                                    category={post.category}
                                                    title={post.title}
                                                    previewText={post.previewText}
                                                    previewImg={post.previewImg}
                                                    creatorNickname={post.creatorNickname}
                                                    creatorAvatar={post.creatorAvatar}
                                                    text={post.text}
                                                    likes={post.likes}
                                                    comments={post.comments}
                                                    dateCreation={moment.unix(post.dateCreation.seconds).locale("ru").format("LLL")}
                                                    bookmarks={post.bookmarks}
                                />
                            })
                        }
                        <DownloadScroll downloadData={getPostsOldTitle}/>
                    </div>
                    :
                    <div>Ничего не найдено</div>
            }
        </div>
    );
};

export default SearchPost;