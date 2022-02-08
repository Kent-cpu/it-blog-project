import React, {useEffect} from 'react';
import Loader from "react-loader-spinner";
import {useLocation} from "react-router-dom";
import {PreviewPost} from "../../components/PreviewPost";
import localization from 'moment/locale/ru'
import {DownloadScroll} from "../../components/DownloadScroll";
import {useGetPosts} from "./getPosts";


export const Posts = () => {
    const [posts, downloadPosts, isLoader] = useGetPosts();
    const linkParameters = new URLSearchParams(useLocation().search);
    const category = linkParameters.get("mode");
    const moment = require('moment-timezone');

    useEffect(async () => {
        await downloadPosts();
    }, [useLocation().search]);


    return (
        <div>
            <div>
                {
                    posts?.length > 0 ?
                        <div className="main-container">
                            <div style={{marginTop: "30px", width: "880px"}}>
                                {
                                    posts && posts.map(post => {
                                        return <PreviewPost key={post.id}
                                                            id={post.id}
                                                            category={category}
                                                            title={post.title}
                                                            previewText={post.previewText}
                                                            previewImg={post.previewImg}
                                                            creatorNickname={post.creatorNickname}
                                                            creatorAvatar={post.creatorAvatar}
                                                            text={post.text}
                                                            likes={post.likes}
                                                            comments={post.comments}
                                                            bookmarks={post.bookmarks}
                                                            dateCreation={moment.unix(post.dateCreation.seconds).locale("ru").format("LLL")}
                                        />
                                    })
                                }
                                <DownloadScroll downloadData={downloadPosts}/>
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