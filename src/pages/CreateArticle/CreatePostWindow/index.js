import React, {useContext, useRef, useState} from 'react';
import {AuthContext} from "../../../context";
import styles from "../../Setting/ProfileSetting/index.module.scss";
import {handleChangeInput} from "../../../handleChangeInput";
import {collection, doc, setDoc} from "firebase/firestore";
import {InfoSave, STATUS} from "../../Setting/InfoSave";



export const CreatePostWindow = () => {
    const {auth, db, userData, firebase} = useContext(AuthContext);
    const [postData, setPostData] = useState({
        title: "",
        category: "Разработка",
        previewImg: "",
        previewText: "",
        text: "",
    });

    const [error, setError] = useState({});
    const [infoAboutSave, setInfoAboutSave] = useState([]);
    const refPreviewImg = useRef();
    const imageConversion = require("image-conversion");

    const handleChange = (e) => handleChangeInput(e, setPostData);

    const validation = () => {
        const err = {};
        if (postData.title.length === 0) {
            err.title = "Обязательное поле";
        }

        if (postData.text.length === 0) {
            err.text = "Обязательное поле";
        } else if (postData.text.length <= 50) {
            err.text = "Слишком маленькая статья";
        }

        if (!refPreviewImg.current.files[0]) {
            err.previewImg = "Выберите картинку";
        }

        if (Object.entries(err).length !== 0) {
            setError(err);
            return false;
        }
        setError({});
        return true;
    }


    const getCategoryPost = (category) => {
        let convertedCategory;
        switch (category) {
            case "Разработка":
                convertedCategory = "development";
                break;
            case "Администрирование":
                convertedCategory = "administration";
                break;
            case "Дизайн":
                convertedCategory = "design";
                break;
            case "Менеджмент":
                convertedCategory = "management";
                break;
            case "Научпоп":
                convertedCategory = "popsci";
                break;
        }
        return convertedCategory;
    }

    const createIndexTitle = (title) => {
        const result = [];
        let prevKey = "";
        for(let i = 0; i < title.length; ++i) {
                prevKey+= title[i];
                result.push(prevKey);
        }
        return result;
    }

    const savePost = async () => {
        if (validation()) {
            try {

                const categoryPost = getCategoryPost(postData.category);
                const newPostRef = doc(collection(db, categoryPost));
                const searchPostRef = doc(collection(db, "search_post"));
                const linkImg = await saveImg(newPostRef.id, categoryPost);


                const finalDataPost = {
                    id: newPostRef.id,
                    uidUser: auth.currentUser.uid,
                    dateCreation: firebase.firestore.Timestamp.now(),
                    creatorNickname: userData.nickname,
                    creatorAvatar: userData.avatar,
                    category: categoryPost,
                    title: postData.title,
                    previewImg: linkImg,
                    previewText: postData.previewText,
                    text: postData.text,
                    likes: null,
                    comments: [],
                    bookmarks: [],
                };


                const searchPostData = {
                    idPost:  newPostRef.id,
                    categoryPost: finalDataPost.category,
                    searchTableIndex: createIndexTitle(finalDataPost.title),
                    dateCreationPost: finalDataPost.dateCreation,

                };



                await setDoc(newPostRef, finalDataPost);
                setDoc(searchPostRef, searchPostData);

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

        }
    }


    const saveImg = async (idPost, category) => {
        const file = refPreviewImg.current.files[0];

        if (file) {
            const storageRef = firebase.storage().refFromURL(`gs://it-blog-c0d57.appspot.com/${category}/${idPost}`);

            return imageConversion.compressAccurately(file, {
                size: (file.size - ((file.size * 30) / 100)) / 1000,

            }).then((result) => {
                return storageRef.put(result).then(() => {
                    return storageRef.getDownloadURL().then(url => {

                        setPostData(prev => {
                            return {...prev, previewImg: url}
                        });

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
                    <form onSubmit={(e) => e.preventDefault()} className={styles["form"]}>
                        <div className={styles["form__item"]}>
                            <label className="form__label" htmlFor="title">Заголовок</label>
                            <input
                                type="text"
                                name="title"
                                className={styles["input-field"]}
                                value={postData.title}
                                onChange={(e) => handleChange(e)}
                            />
                            {error.title && <p className="error-message">{error.title}</p>}
                        </div>

                        <div className={styles["form__item"]}>
                            <input
                                type="file"
                                name="previewImg"
                                ref={refPreviewImg}
                                accept="image/*"
                                style={{marginBottom: "8px"}}
                            />
                            {error.previewImg && <p className="error-message">{error.previewImg}</p>}
                        </div>


                        <div className={styles["form__item"]}>
                            <span className="form__label">Категория</span>
                            <select
                                name="category"
                                className={styles["select-css"]}
                                onChange={(e) => handleChange(e)}
                                value={postData.category}
                            >
                                <option>Разработка</option>
                                <option>Администрирование</option>
                                <option>Дизайн</option>
                                <option>Менеджмент</option>
                                <option>Научпоп</option>
                            </select>
                        </div>

                        <div className={styles["form__item"]}>
                            <label htmlFor="previewText" className="form__label">Предварительный текст</label>
                            <textarea
                                style={{
                                    resize: "none",
                                    width: "98%",
                                    height: "200px",
                                    padding: "15px 10px 0 10px",
                                    fontSize: "16px",
                                    border: "1px solid #d5dddf",
                                    marginBottom: "8px",
                                }}
                                onChange={(e) => handleChange(e)}
                                value={postData.previewText}
                                name="previewText"
                                maxLength="1000"
                            ></textarea>
                            {error.previewText && <p className="error-message">{error.previewText}</p>}
                        </div>


                        <div className={styles["form__item"]}>
                            <label htmlFor="text" className="form__label">Текст поста</label>
                            <textarea
                                style={{
                                    resize: "none",
                                    width: "98%",
                                    height: "800px",
                                    padding: "15px 10px 0 10px",
                                    fontSize: "16px",
                                    border: "1px solid #d5dddf",
                                    marginBottom: "8px",
                                }}
                                onChange={(e) => handleChange(e)}
                                value={postData.text}
                                name="text"
                                maxLength="600000"
                            ></textarea>
                            {error.text && <p className="error-message">{error.text}</p>}
                        </div>
                        <button
                            className="save-changes-btn"
                            onClick={savePost}
                        >Готово к публикации
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
