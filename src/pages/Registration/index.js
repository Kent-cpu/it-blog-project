import {useContext, useState} from 'react';
import s from "./../../styles/form.module.scss"
import 'firebase/firestore'
import {doc, setDoc} from "firebase/firestore";
import {useForm} from "../../hooks/useForm";
import {validate} from "./validate";
import {usePasswordToggle} from "../../hooks/usePasswordToggle";
import {LOGIN, VALIDATION_TYPE} from "../../utils/constants";
import InfoFormat from "./infoFormat";
import {AuthContext} from "../../context";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {NavLink} from "react-router-dom";
import firebase from "firebase/compat";


const Registration = () => {
    const {textFields, handleChange} =  useForm();
    const [error, setError] = useState({});
    const [typeInput, iconEye] = usePasswordToggle();
    const {auth, db} = useContext(AuthContext);
    const bcrypt = require("bcryptjs");


    const submit = async (e) => {
        e.target.disabled = true;
        let errorFound = await validate(textFields, VALIDATION_TYPE.REGISTRATION);
        setError(() => errorFound);
        if(Object.entries(errorFound).length === 0){
            const hashPassword = bcrypt.hashSync(textFields.password, 10);
            textFields.password = hashPassword;

            createUserWithEmailAndPassword(auth, textFields.email, textFields.password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    if(user){
                        user.displayName = textFields.nickname;
                        textFields.uid = user.uid;
                        const starsRef = firebase.storage().refFromURL('gs://it-blog-c0d57.appspot.com/avatars/defaultAvatarImg.png');
                        await starsRef.getDownloadURL().then((url) => {
                            if(url){
                                textFields.avatar = url;
                                const storageRef = firebase.storage().refFromURL(`gs://it-blog-c0d57.appspot.com/avatars/${textFields.uid}`);
                                fetch(`${url}`)
                                    .then((result) => result.blob())
                                    .then((defaultImgBlob) => storageRef.put(defaultImgBlob));
                            }
                        });
                        await setDoc(doc(db, "Users", textFields.uid), textFields);
                        await sendEmailVerification(auth.currentUser);
                    }
                })
                .catch((err) => {
                    console.error(err.code, err.message);
                });
        }
        e.target.disabled = false;
    }


    return (
        <div className = "centered-container">
            <form className={s["form"]} action="" onSubmit={(e) => e.preventDefault()}>
                <h1 className={s.form__title}>??????????????????????</h1>
                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="email">?????????????????????? ??????????</label>
                    <input
                        placeholder="?????????????????????? ??????????"
                        onChange={(e) => handleChange(e)}
                        name = "email"
                        type="text"
                        className="input-field"
                    />
                    {error.email && <p className="error-message">{error.email}</p>}
                </div>

                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="name">?????????????????? ??????</label>
                    <input
                        placeholder="?????????????????? ??????"
                        onChange={(e) => handleChange(e)}
                        name = "realName"
                        type="text"
                        className="input-field"
                    />
                    {error.realName && <p className="error-message">{error.realName}</p>}
                </div>


                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="displayName">??????????????</label>
                    <div className={s["form__wrapper-field"]}>
                        <input
                            placeholder="??????????????"
                            onChange={(e) => handleChange(e)}
                            name = "nickname"
                            type="text"
                            maxLength="15"
                            className={s["form__field_short"]}
                        />
                        <div className={s["form__field_btn"]}>
                            <InfoFormat>???????????????????????? ?????? ???? 3 ???? 15 ????????????????, ???????????? ???????????? ????????????????</InfoFormat>
                        </div>
                    </div>

                    {error.nickname && <p className="error-message">{error.nickname}</p>}
                </div>

                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="password">????????????</label>
                    <div className={s["form__wrapper-field"]}>
                        <input
                            className={s["form__field_short"]}
                            placeholder="????????????"
                            type={typeInput}
                            name = "password"
                            onChange={(e) => handleChange(e)}
                        />
                        <div className={s["form__field_btn"]}>
                            <span className={s["password-toggle-icon"]}>{iconEye}</span>
                            <InfoFormat>???????????? ???? 6 ????????????????, ???????????????? ???????? ???? 1 ?????????? , 1 ?????????????????? ?? 1 ???????????????? ??????????</InfoFormat>
                        </div>
                    </div>
                    {error.password && <p className="error-message">{error.password}</p>}
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    onClick={(e) => submit(e)}
                >?????????????? ??????????????</button>

                <p style={{textAlign: "center"}}>?????? ????????????????????????????????? <NavLink to={LOGIN}>??????????????</NavLink></p>
            </form>
        </div>
    );
};

export default Registration;