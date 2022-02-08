import React, {useContext, useRef, useState} from 'react';
import {AuthContext} from "../../../context";
import styles from "../index.module.scss";
import {handleChangeInput} from "../../../utils/handleChangeInput";
import {collection, doc, setDoc} from "firebase/firestore";
import {InfoSave, STATUS} from "../../Setting/InfoSave";
import CATEGORY_POST from "./../../../utils/categoryPost";
import createPhrasesByText from "../../../utils/createPhrasesByText";
import validation from "./validation";

export const EditorArticle = () => {
    const {auth, db, userData, firebase} = useContext(AuthContext);
    const refPreviewImg = useRef();
    const [postData, setPostData] = useState({
        title: "",
        category: "Разработка",
        previewImg: refPreviewImg,
        previewText: "",
        text: "",
    });

    const [error, setError] = useState({});
    const [infoAboutSave, setInfoAboutSave] = useState([]);
    const imageConversion = require("image-conversion");
    const handleChange = e => handleChangeInput(e, setPostData);


    const savePost = async () => {

        const possibleErrors = validation(postData);

        if (Object.keys(possibleErrors).length === 0) {

            try {
                const categoryPost = CATEGORY_POST[postData.category];
                const newPostRef = doc(collection(db, categoryPost));
                const linkImg = await saveImg(newPostRef.id, categoryPost);

                const finalDataPost = {
                    ...postData,
                    id: newPostRef.id,
                    uidUser: auth.currentUser.uid,
                    dateCreation: firebase.firestore.Timestamp.now(),
                    creatorNickname: userData.nickname,
                    creatorAvatar: userData.avatar,
                    category: categoryPost,
                    previewImg: linkImg,
                    likes: [],
                    comments: [],
                    bookmarks: [],
                };


                const searchPostData = {
                    idPost: newPostRef.id,
                    categoryPost: finalDataPost.category,
                    searchTableIndex: createPhrasesByText(finalDataPost.title),
                    dateCreationPost: finalDataPost.dateCreation,
                };


                await setDoc(newPostRef, finalDataPost);
                await setDoc(doc(collection(db, "search_post")), searchPostData);

                window.scrollTo({top: 0, behavior: 'smooth'});
                setInfoAboutSave((prevData) => [...prevData, {
                    id: prevData[prevData.length - 1]?.id + 1 || 0,
                    status: STATUS.success,
                    text: "Пост успешно создан",
                }]);

            } catch (e) {
                window.scrollTo({top: 0, behavior: 'smooth'});
                setInfoAboutSave((prevData) => [...prevData, {
                    id: prevData[prevData.length - 1]?.id + 1 || 0,
                    status: STATUS.error,
                    text: e.toString(),
                }]);
            }
        } else {
            setError(possibleErrors);
        }
    }


    const saveImg = async (idPost, category) => {
        const file = refPreviewImg.current.files[0];

        if (file) {
            const storageRef = firebase.storage().refFromURL(`gs://it-blog-c0d57.appspot.com/${category}/${idPost}`);
            const compressionConfig = {
                size: (file.size - (file.size * 30 / 100)) / 1000,
            };

            return imageConversion.compressAccurately(file, compressionConfig).then((result) => {
                return storageRef.put(result).then(() => {
                    return storageRef.getDownloadURL().then(url => {
                        return url;
                    });
                });
            });
        }
    }

    return (
        <div>
            {
                <InfoSave items={infoAboutSave} setItems={setInfoAboutSave}/>
            }
            <div className="main-container">
                <div className="wrapper-content">
                    <h1>Создание поста</h1>
                    <form
                        className={styles["editor"]}
                        onSubmit={e => e.preventDefault()}
                    >
                        <div className={styles["editor__item"]}>
                            <label
                                className="form__label"
                                htmlFor="title"
                            >
                                Заголовок
                            </label>
                            <input
                                type="text"
                                name="title"
                                className={styles["editor__field"]}
                                value={postData.title}
                                onChange={handleChange}
                            />
                            {error.title && <p className="error-message">{error.title}</p>}
                        </div>

                        <div className={styles["editor__item"]}>
                            <input
                                type="file"
                                name="previewImg"
                                ref={refPreviewImg}
                                accept="image/*"
                                style={{marginBottom: "8px"}}
                            />
                            {error.previewImg && <p className="error-message">{error.previewImg}</p>}
                        </div>


                        <div className={styles["editor__item"]}>
                            <span className="form__label">Категория</span>
                            <select
                                name="category"
                                className="select"
                                onChange={handleChange}
                                value={postData.category}
                            >
                                <option>Разработка</option>
                                <option>Администрирование</option>
                                <option>Дизайн</option>
                                <option>Менеджмент</option>
                                <option>Научпоп</option>
                            </select>
                        </div>

                        <div className={styles["editor__item"]}>
                            <label htmlFor="previewText" className="form__label">Предварительный текст</label>
                            <textarea
                                className={styles["editor__text-sm"]}
                                onChange={handleChange}
                                value={postData.previewText}
                                name="previewText"
                                maxLength="1000"
                            ></textarea>
                            {error.previewText && <p className="error-message">{error.previewText}</p>}
                        </div>


                        <div className={styles["editor__item"]}>
                            <label htmlFor="text" className="form__label">Текст поста</label>
                            <textarea
                                className={styles["editor__text-lg"]}
                                onChange={handleChange}
                                value={postData.text}
                                name="text"
                                maxLength="600000"
                            ></textarea>
                            {error.text && <p className="error-message">{error.text}</p>}
                        </div>
                        <button
                            className="save-changes-btn"
                            onClick={savePost}
                        >
                            Готово к публикации
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};