import {useContext, useState} from 'react';
import s from "./../../styles/form.module.scss"
import 'firebase/firestore'
import firebase from "firebase/compat";
import {useForm} from "../../hooks/useForm";
import {validate} from "./validate";
import {usePasswordToggle} from "../../hooks/usePasswordToggle";
import {VALIDATION_TYPE} from "../../utils/constants";
import InfoFormat from "./infoFormat";
import {AuthContext} from "../../context";


export const Registration = () => {
    const {textFields, handleChange} =  useForm();
    const [error, setError] = useState({});
    const [typeInput, iconEye] = usePasswordToggle();
    const {setIsAuth} = useContext(AuthContext);

    const submit = async (e) => {
        e.target.disabled = true;
        let errorFound = await validate(textFields, VALIDATION_TYPE.REGISTRATION);
        console.log(errorFound);
        setError(() => errorFound);
        if(Object.entries(errorFound).length === 0){
            firebase.firestore().collection("Users").add(textFields);
        }
        setIsAuth(true);
        e.target.disabled = false;
    }


    return (
        <div className = "centered-container">
            <form  action="" onSubmit={(e) => e.preventDefault()}>
                <h1 className={s.form__title}>Регистрация</h1>
                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="email">Электронная почта</label>
                    <input
                        placeholder="Электронная почта"
                        onChange={(e) => handleChange(e)}
                        name = "email"
                        type="text"
                        className="input-field"
                    />
                    {error.email && <p className="error-message">{error.email}</p>}
                </div>

                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="name">Имя</label>
                    <input
                        placeholder="Имя"
                        onChange={(e) => handleChange(e)}
                        name = "name"
                        type="text"
                        className="input-field"
                    />
                    {error.name && <p className="error-message">{error.name}</p>}
                </div>

                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="surname">Фамилия</label>
                    <input
                        placeholder="Фамилия"
                        onChange={(e) => handleChange(e)}
                        name = "surname"
                        type="text"
                        className="input-field"
                    />
                    {error.surname && <p className="error-message">{error.surname}</p>}
                </div>

                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="displayName">Отображаемое имя</label>
                    <div className={s["form__wrapper-field"]}>
                        <input
                            placeholder="Отображаемое имя"
                            onChange={(e) => handleChange(e)}
                            name = "displayName"
                            type="text"
                            maxLength="15"
                            className={s["form__field_short"]}
                        />
                        <div className={s["form__field_btn"]}>
                            <InfoFormat>Отображаемое имя от 3 до 15 символов, первый символ строчный</InfoFormat>
                        </div>
                    </div>

                    {error.displayName && <p className="error-message">{error.displayName}</p>}
                </div>

                <div className={s.form__group}>
                    <label className={s.form__label} htmlFor="password">Пароль</label>
                    <div className={s["form__wrapper-field"]}>
                        <input
                            className={s["form__field_short"]}
                            placeholder="Пароль"
                            type={typeInput}
                            name = "password"
                            onChange={(e) => handleChange(e)}
                        />
                        <div className={s["form__field_btn"]}>
                            <span className={s["password-toggle-icon"]}>{iconEye}</span>
                            <InfoFormat>Пароль от 6 символов, содержит хотя бы 1 цифру , 1 заглавную и 1 строчную букву</InfoFormat>
                        </div>
                    </div>
                    {error.password && <p className="error-message">{error.password}</p>}
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    onClick={(e) => submit(e)}
                >Создать аккаунт</button>
            </form>

        </div>
    );
};
