import React, {useContext, useState} from 'react';
import s from "./../../styles/form.module.scss";
import {sendPasswordResetEmail} from "firebase/auth";
import {AuthContext} from "../../context";

const ReminderPassword = (props) => {
    const [email, setEmail] = useState('');
    const [sentLetter, setSentLetter] = useState(false);
    const [error, setError] = useState("");
    const {auth} = useContext(AuthContext);


    const validate = () => {
        const regularEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        if (email.length === 0) {
            setError("Введите email");
            return false;
        } else if (!regularEmail.test(email)) {
            setError("Введите корректный email");
            return false;
        }
        setError("");
        return true;
    }


    const submit = () => {
        if (validate()) {
            sendPasswordResetEmail(auth, email)
                .then((r) => {
                    setSentLetter(true);
                })
                .catch((error) => {
                    const errorCode = error.code;
                });
        }
    }


    return (
        <div className="centered-container">
            <form onSubmit={(e) => e.preventDefault()} className={s["form"]}>
                <h1 className={s.form__title}>Восстановление пароля</h1>

                {
                    sentLetter === true
                        ?
                        <div style={{
                            maxWidth: "350px",
                            backgroundColor: "#65AB5B",
                            padding: "20px",
                            color: "#fff",
                        }}>
                            Мы отправили вам на почту инструкции по восстановлению пароля. Чтобы восстановить доступ к
                            аккаунту, пройдите по ссылке из письма. Если этого письма нет во «Входящих», пожалуйста,
                            проверьте «Спам».
                        </div>
                        :
                        <div>
                            <div className={s.form__group}>
                                <label className={s.form__label} htmlFor="email">Электронная почта</label>
                                <input
                                    placeholder="Электронная почта"
                                    name="email"
                                    type="text"
                                    className="input-field"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <p className="error-message">{error}</p>
                            </div>
                            <button onClick={submit} className="submit-btn">Отправить письмо</button>
                        </div>
                }
            </form>
        </div>
    );
};

export default ReminderPassword;