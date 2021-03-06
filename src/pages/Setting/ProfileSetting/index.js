import React, {useContext, useRef, useState} from 'react';
import {AuthContext} from "../../../context";
import {doc, updateDoc} from "firebase/firestore";
import styles from "./index.module.scss"
import "./../index.scss"
import {InfoSave, STATUS} from "../InfoSave";
import {handleChangeInput} from "../../../utils/handleChangeInput";
import firebase from "firebase/compat";
import changeImg from "../../../utils/changeImg";


export const ProfileSetting = () => {
    const {userData, setUserData, db} = useContext(AuthContext);
    const [data, setData] = useState(userData);
    const [infoAboutSave, setInfoAboutSave] = useState([]);
    const avatarRef = useRef();
    const imageConversion = require("image-conversion");

    const handleChange = (e) => handleChangeInput(e, setData);
    const changeImgClick = (e) =>  changeImg(e, document.getElementById("avatar"));

    const onOrOfInterface = onOrOf => {
        const allElementInterface = document.querySelectorAll("input, textarea, button, select");

        allElementInterface.forEach(element => {
            element.disabled = onOrOf;
        });
    }

    const saveChange = async () => {
        try {
            onOrOfInterface(true);

            const linkSaveImg = await saveImg()
            const resultData = {...data, avatar: linkSaveImg != undefined && linkSaveImg};
            await updateDoc(doc(db, "Users", resultData.uid), resultData);
            setUserData(resultData);

            window.scrollTo({top: 0, behavior: 'smooth'});
            onOrOfInterface(false);

            setInfoAboutSave((prevData) => [...prevData, {
                id: prevData[prevData.length - 1]?.id + 1 || 0,
                status: STATUS.success,
                text: "Настройки успешно обновлены",
            }]);

        } catch (e) {
            setInfoAboutSave((prevData) => [...prevData, {
                id: prevData[prevData.length - 1]?.id + 1 || 0,
                status: STATUS.error,
                text: e.toString(),
            }]);
        }
    }


    const saveImg = async () => {
        const file = avatarRef.current.files[0];

        if (file) {
            return imageConversion.compressAccurately(file, {
                size: (file.size - ((file.size * 40) / 100)) / 1000,

            }).then((result) => {
                const storageRef = firebase.storage().refFromURL(`gs://it-blog-c0d57.appspot.com/avatars/${userData.uid}`);
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

            <form onSubmit={(e) => e.preventDefault()} className={styles["form"]}>
                <div style={{display: "flex"}}>
                    <div className={styles["form__item"]}>
                        <label className="form__label" htmlFor="realName">Настоящие имя</label>
                        <input
                            type="text"
                            name="realName"
                            className={styles["input-field"]}
                            value={data?.realName || ''}
                            onChange={handleChange}
                        />
                        <p className={styles["field-description"]}>Укажите ваши имя и фамилию, чтобы другие пользователи
                            смогли узнать, как вас зовут</p>
                    </div>


                    <div style={{marginLeft: "200px"}}>
                        <div className={styles["user-avatar-wrapper"]}>
                            <img id="avatar" className={styles["user-avatar"]} src={data?.avatar || ''} alt="avatar"/>
                        </div>

                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            id="avatar"
                            ref={avatarRef}
                            onChange={changeImgClick}
                        />
                    </div>
                </div>

                <div className={styles["form__item"]}>
                    <label className="form__label" htmlFor="specialization">Специализация</label>
                    <input
                        type="text"
                        name="specialization"
                        value={data?.specialization || ''}
                        onChange={handleChange}
                        className={styles["input-field"]}
                    />
                    <p className={styles["field-description"]}>Укажите свою специализацию. Например: Администратор баз
                        данных</p>
                </div>

                <div className={styles["form__item"]}>
                    <span className="form__label">Пол</span>
                    <select name="gender" onChange={handleChange} value={data?.gender || ''}
                            className={styles["select-css"]}>
                        <option>Мужской</option>
                        <option>Женский</option>
                    </select>
                </div>

                <div className={styles["form__item"]}>
                    <label className="form__label">Дата рождения</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        onChange={handleChange}
                        value={data?.dateOfBirth || ''}
                        className={styles["input-field-date"]}/>
                </div>

                <div className={styles["form__item"]}>
                    <label className="form__label">Расскажите о себе</label>
                    <textarea
                        name="aboutMe"
                        maxLength="30000"
                        value={data?.aboutMe || ''}
                        onChange={handleChange}
                        className={styles["user-information-field"]}></textarea>
                    <p className={styles["field-description"]}>Не более 30000 символов</p>
                </div>
                <button onClick={saveChange} className="save-changes-btn">Сохранить изменения</button>
            </form>
        </div>
    );
};