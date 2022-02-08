import {useContext, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {collection, getDocs, limit, orderBy, query, startAfter} from "firebase/firestore";
import {AuthContext} from "../../context";
import uploadAvatarCreatorPosts from "../../utils/uploadAvatarCreatorPosts";



export const useGetPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const linkParameters = new URLSearchParams(useLocation().search);
    const category = linkParameters.get("mode");
    const startPost = useRef(null);
    const {db} = useContext(AuthContext);



    const downloadPosts = async () => {
        let postsQuery;

        if (startPost.current === null) { // если подгрузка постов осуществляется в первый раз
            postsQuery = await query(collection(db, category), orderBy("dateCreation", "desc"), limit(1));
            setIsLoader(true);
        } else if (startPost.current !== undefined) { // динамическая подгрузка при скроллинге
            postsQuery = await query(collection(db, category),
                orderBy("dateCreation", "desc"),
                startAfter(startPost.current),
                limit(1));
            setIsLoader(true);
        } else { // если посты закончились
            return;
        }

        const postsAnswer = await getDocs(postsQuery);
        const newPost = postsAnswer.docs.map((post) => post.data());
        await uploadAvatarCreatorPosts(newPost);

        try {
            startPost.current = postsAnswer.docs[postsAnswer.docs.length - 1].data().dateCreation;
        } catch {
            startPost.current = undefined;
        }

        setPosts(oldPost => [...oldPost, ...newPost]);
        setIsLoader(false);
    }

    return [posts, downloadPosts, isLoader];
}