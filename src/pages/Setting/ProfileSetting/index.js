import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../../../context";
import {doc, updateDoc} from "firebase/firestore";
import styles from "./index.module.scss"
import "./../index.scss"
import {InfoSave, STATUS} from "../InfoSave";


export const ProfileSetting = () => {
    const {userData, setUserData, db} = useContext(AuthContext);
    const [data, setData] = useState(userData);
    const [infoAboutSave, setInfoAboutSave] = useState([]);

    const handleChange = e => {
        setData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    }

    const saveChange = async () => {
        const allInput = document.querySelectorAll("input");
        const allSelect = document.querySelectorAll("select");
        const allButton = document.querySelectorAll("button");
        const allTextarea = document.querySelectorAll("textarea");
        try {
            [...allInput, ...allSelect, ...allButton, ...allTextarea].forEach(element => {
                element.disabled = true;
            });

            await updateDoc(doc(db, "Users", data.uid), data);
            window.scrollTo({top: 0, behavior: 'smooth'});
            setUserData(data);
            [...allInput, ...allSelect, ...allButton, ...allTextarea].forEach(element => {
                element.disabled = false;
            });

            setInfoAboutSave((prevData) => [ ...prevData, {
                id: prevData[prevData.length - 1]?.id + 1 || 0 ,
                status: STATUS.success,
                text: "Настройки успешно обновлены",
            }]);

        } catch (e) {
            setInfoAboutSave({
                status: STATUS.error,
                text: e,
            });
        }

    }


    const saveImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setData(prev => {
                return {...prev, avatar: reader.result}
            });
        }
    }

    useEffect(() => {
        if (userData !== undefined) {
            setData(userData);
        }
    }, [userData])


    return (
        <div>
            {
                <InfoSave items = {infoAboutSave} setItems={setInfoAboutSave}/>
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
                            onChange={(e) => handleChange(e)}
                        />
                        <p className={styles["field-description"]}>Укажите ваши имя и фамилию, чтобы другие пользователи
                            смогли узнать, как вас зовут</p>
                    </div>


                    <div style={{marginLeft: "200px"}}>
                        <div className={styles["user-avatar-wrapper"]}>
                            <img className={styles["user-avatar"]} src={data?.avatar || ''} alt="avatar"/>
                        </div>

                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={(e) => saveImg(e)}
                        />
                    </div>
                </div>


                <div className={styles["form__item"]}>
                    <label className={styles["form-label"]} htmlFor="specialization">Специализация</label>
                    <input
                        type="text"
                        name="specialization"
                        value={data?.specialization || ''}
                        onChange={(e) => handleChange(e)}
                        className={styles["input-field"]}
                    />
                    <p className={styles["field-description"]}>Укажите свою специализацию. Например: Администратор баз
                        данных</p>
                </div>

                <div className={styles["form__item"]}>
                    <span className={styles["form__label"]}>Пол</span>
                    <select name="gender" onChange={(e) => handleChange(e)} value={data?.gender || ''}
                            className={styles["select-css"]}>
                        <option>Мужской</option>
                        <option>Женский</option>
                    </select>
                </div>


                <div className={styles["form__item"]}>
                    <label className={styles["form__label"]}>Дата рождения</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        onChange={(e) => handleChange(e)}
                        value={data?.dateOfBirth || ''}
                        className={styles["input-field-date"]}/>
                </div>

                <div className={styles["form__item"]}>
                    <label className={styles["form__label"]}>Расскажите о себе</label>
                    <textarea
                        name="aboutMe"
                        maxLength="30000"
                        value={data?.aboutMe || ''}
                        onChange={(e) => handleChange(e)}
                        className={styles["user-information-field"]}></textarea>
                    <p className={styles["field-description"]}>Не более 30000 символов</p>
                </div>
                <button onClick={saveChange} className="save-changes-btn">Сохранить изменения</button>
            </form>
        </div>
    );
};

