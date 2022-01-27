import React, {useContext, useState} from 'react';
import s from "../../styles/form.module.scss";
import {AuthContext} from "../../context";
import {signInWithEmailAndPassword, updatePassword} from "firebase/auth";
import {doc, updateDoc} from "firebase/firestore";
import {getData} from "../../getData";

export const RecoverPassword = ({actionCode}) => {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const {auth, db, setUserData} = useContext(AuthContext);
    const bcrypt = require("bcryptjs");


    const validate = () => {
        const regularPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // пароль от 6, содержит хотя бы 1 цифру , 1 заглавную и 1 строчную букву
        if (newPassword.length === 0) {
            setError("Введите пароль");
            return false;
        } else if (!regularPassword.test(newPassword)) {
            setError("Введите корректный пароль");
            return false;
        }
        setError("");
        return true;
    }


    const saveNewPassword = async () => {
        if (validate()) {
            try {
                const emailUser = await auth.verifyPasswordResetCode(actionCode);
                if (emailUser) {
                    const newHashPassword = bcrypt.hashSync(newPassword, 10);
                    const allUser = await getData("Users");
                    const [needUser] = allUser.filter(dataUser => dataUser.email === emailUser);
                    await signInWithEmailAndPassword(auth, needUser.email, needUser.password);
                    await updatePassword(auth.currentUser, newHashPassword);
                    const userRef = doc(db, "Users", needUser.uid);
                    await updateDoc(userRef, {password: newHashPassword});
                    setUserData((prevData) => {
                        return {...prevData, password: newHashPassword};
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }


    return (
        <div>
            <div className="centered-container">
                <form onSubmit={(e) => e.preventDefault()} className={s["form"]}>
                    <h1 className={s.form__title}>Восстановление пароля</h1>

                    <div>
                        <div className={s.form__group}>
                            <label className={s.form__label} htmlFor="password">Новый пароль</label>
                            <input
                                placeholder="Новый пароль"
                                name="password"
                                type="text"
                                className="input-field"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <p className="error-message">{error}</p>
                        </div>
                        <button onClick={saveNewPassword} className="submit-btn">Сохранить пароль</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

