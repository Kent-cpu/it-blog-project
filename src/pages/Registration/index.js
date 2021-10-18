import React, {useRef, useState} from 'react';
import s from "./index.module.scss"
import 'firebase/firestore'
import firebase from "firebase/compat";
import {useForm} from "./useForm";
import {validate} from "./validate";


export const Registration = () => {

    const {textFields, setTextFields, handleChange} = useForm();
    const [error, setError] = useState({});


    const register = async (e) => {
        e.target.disabled = true;
        let errorFound = await validate(textFields);
        setError(() => errorFound);
        if(Object.entries(errorFound).length === 0){
            firebase.firestore().collection("Users").add(textFields);
        }
        e.target.disabled = false;
    }


    return (
        <div className={s.registration}>
            <form  action="" onSubmit={(e) => e.preventDefault()}>
                <div className={s.registration__group}>
                    <label className={s.registration__label} htmlFor="email">Электронная почта</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        name = "email"
                        type="text"
                        className={s.registration__field}
                    />
                    {error?.email && <p className={s.error}>{error?.email}</p>}
                </div>

                <div className={s.registration__group}>
                    <label className={s.registration__label} htmlFor="name">Имя</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        name = "name"
                        type="text"
                        className={s.registration__field}
                    />
                    {error?.name && <p className={s.error}>{error?.name}</p>}
                </div>

                <div className={s.registration__group}>
                    <label className={s.registration__label} htmlFor="surname">Фамилия</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        name = "surname"
                        type="text"
                        className={s.registration__field}
                    />
                    {error?.surname && <p className={s.error}>{error?.surname}</p>}
                </div>

                <div className={s.registration__group}>
                    <label className={s.registration__label} htmlFor="displayName">Отображаемое имя</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        name = "displayName"
                        type="text"
                        className={s.registration__field}
                    />
                    {error?.displayName && <p className={s.error}>{error?.displayName}</p>}

                </div>


                <div className={s.registration__group}>
                    <label className={s.registration__label} htmlFor="password">Пароль</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        name = "password"
                        type="password"
                        className={s.registration__field}
                    />
                    {error?.password && <p className={s.error}>{error?.password}</p>}
                </div>

                <button
                    className={s.registration__submit_btn}
                    type="submit"
                    onClick={(e) => register(e)}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

