import firebase from "firebase/compat";

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

export default uploadAvatarCreatorPosts;