import React, {useContext, useState} from 'react';
import {validate} from "../Registration/validate";
import {REGISTRATION, REMINDER_PASSWORD, VALIDATION_TYPE} from "../../utils/constants";
import {AuthContext} from "../../context";
import s from "./../../styles/form.module.scss"
import {usePasswordToggle} from "../../hooks/usePasswordToggle";
import {useForm} from "../../hooks/useForm";
import { signInWithEmailAndPassword} from "firebase/auth";
import {NavLink} from "react-router-dom";



export const Authorization = () => {
    const {textFields, handleChange} =  useForm();
    const [error, setError] = useState({});
    const {auth} = useContext(AuthContext);
    const [typeInput, iconEye] = usePasswordToggle();


    const submit = async (e) => {
        e.target.disabled = true;
        let {email, password} = textFields;
        const data = {email, password};
        let errorFound = await validate(data, VALIDATION_TYPE.AUTHORIZATION);
        setError(() => errorFound);
        if (Object.entries(errorFound).length === 0) {
                signInWithEmailAndPassword(auth, data.email, data.password).catch((error) => {
                        console.error(error.code, error.message);
                    });
            }
            e.target.disabled = false;
        }


    return (
        <div className="centered-container">

            <form className={s["form"]} onClick={(e) => e.preventDefault()} action="">
                <h1 className={s.form__title}>Войти</h1>
                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="email">Электронная почта</label>
                    <input
                        placeholder="Электронная почта"
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                        name="email"
                        type="text"/>
                </div>

                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="password">Пароль</label>
                    <div className={s["form__wrapper-field"]}>
                        <input
                            placeholder="Пароль"
                            onChange={(e) => handleChange(e)}
                            name = "password"
                            type={typeInput}
                            className={s["form__field_short"]}
                        />
                        <div className={s["form__field_btn"]}>
                            <span className={s["password-toggle-icon"]}>{iconEye}</span>
                        </div>
                    </div>
                </div>
                {(error.email || error.password) && <p style={{marginBottom:"20px"}} className="error-message">Неверная электронная почта или пароль</p>}
                <button className="submit-btn" onClick={(e) => submit(e)}>Войти</button>

                <NavLink to={REMINDER_PASSWORD}>Забыли пароль?</NavLink>
            </form>

            <div className="wrapper-content">
                <p style={{textAlign: "center"}}>Ещё нет аккаунта? <NavLink to={REGISTRATION}>Зарегистрируйтесь</NavLink></p>
            </div>
        </div>
    );
};
