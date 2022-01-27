import React, {useContext, useEffect, useRef, useState} from 'react';
import {Header} from "../../components/Header";
import {collection, getDocs, limit, orderBy, query, startAfter} from "firebase/firestore";
import {AuthContext} from "../../context";
import Loader from "react-loader-spinner";
import {useLocation} from "react-router-dom";
import {PreviewPost} from "../../components/PreviewPost";
import firebase from "firebase/compat";
import localization from 'moment/locale/ru'
import {DownloadScroll} from "../../components/DownloadScroll";


export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const {db} = useContext(AuthContext);
    const [isLoader, setIsLoader] = useState(false);
    const startPost = useRef(null);
    const linkParameters = new URLSearchParams(useLocation().search);
    const category = linkParameters.get("mode");
    const moment = require('moment-timezone');


    const uploadAvatarCreatorPosts = async (newPost) => {

        for (let i = 0; i < newPost.length; ++i) {
            const post = newPost[i];
            const starsRef = firebase.storage().refFromURL(`gs://it-blog-c0d57.appspot.com/avatars/${post.uidUser}`);
            await starsRef.getDownloadURL().then((url) => {
                if (url) {
                    post.creatorAvatar = url;
                }
            });
        }
    }


    const getPosts = async () => {

        let postsQuery;

        if (startPost.current === null) { // если подгрузка постов осуществляется в первый раз
            postsQuery = await query(collection(db, category), orderBy("dateCreation", "desc"), limit(1));
            setIsLoader(true);
        } else if (startPost.current !== undefined) { // динамическая подгрузка при скроллинге
            postsQuery = await query(collection(db, category), orderBy("dateCreation", "desc"), startAfter(startPost.current), limit(1));
            setIsLoader(true);
        } else { // если посты закончились
            return;
        }

        const postsAnswer = await getDocs(postsQuery);
        const newPost = postsAnswer.docs.map((post) => post.data());
        await uploadAvatarCreatorPosts(newPost);

        console.log(startPost.current)

        try {
            startPost.current = postsAnswer.docs[postsAnswer.docs.length - 1].data().dateCreation;
        } catch {
            startPost.current = undefined;
        }

        setPosts(oldPost => [...oldPost, ...newPost]);
        setIsLoader(false);
    }



    useEffect(async () => {

        await getPosts(category);

    }, [useLocation().search]);


    return (
        <div>
            <Header/>
            <div>
                {
                    posts?.length > 0 ?
                        <div className="main-container">

                            <div style={{marginTop: "30px", width: "880px"}}>
                                {

                                    posts && posts.map((post, index) => {

                                        return <PreviewPost key={index}
                                                            id={post.id}
                                                            category={linkParameters.get("mode")}
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
                                <DownloadScroll downloadData={getPosts}/>

                                {isLoader && <div style={{textAlign: "center"}}><Loader type="TailSpin"/></div>}

                            </div>
                        </div>
                        :
                        <div>
                            {isLoader && <div className="centered-container"><Loader type="TailSpin"/></div>}
                        </div>

                }

            </div>
        </div>
    );
};
