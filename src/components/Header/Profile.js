import React, {useContext, useEffect, useRef, useState} from 'react';
import s from "./index.module.scss";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../context";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {faChalkboardTeacher} from "@fortawesome/free-solid-svg-icons/faChalkboardTeacher";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";

export const Profile = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const rootEl = useRef(null);

    useEffect(() => {
        const onClick = e => rootEl.current.contains(e.target) || setIsVisible(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <div ref = {rootEl}>
            <div onClick={() => setIsVisible(prev => !prev)}>
                <FontAwesomeIcon className={s["user-menu__profile"]} icon={faUser}/>
            </div>

            {
                isAuth
                    ?
                    <div className={isVisible ? s["user-menu__dropdown"] + " " + s["user-menu__dropdown_active"] : s["user-menu__dropdown"] }>
                        <div className={s["user-menu__dropdown__body"]}>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Мои профиль</a>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Статьи</a>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Закладки</a>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Комментарии</a>
                        </div>

                        <div className={s["user-menu__dropdown__footer"]}>
                            <div className={s["user-menu__dropdown__footer__item"]}>
                                <FontAwesomeIcon className={s["user-menu__dropdown__footer__icon"]} icon={faChalkboardTeacher}/>
                                <span>Язык, лента</span>
                            </div>

                            <div className={s["user-menu__dropdown__footer__item"]}>
                                <a className={s["user-menu__dropdown__setting-link"]} href="">
                                    <FontAwesomeIcon className={s["user-menu__dropdown__footer__icon"]} icon={faCog}/>
                                    <span style={{color: "#333"}}>Настройки</span>
                                </a>
                            </div>

                            <div onClick={() => setIsAuth(false)} className={s["user-menu__dropdown__footer__item"]}>
                                <FontAwesomeIcon className={s["user-menu__dropdown__footer__icon"]} icon={faSignOutAlt}/>
                                <span>Выход</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={isVisible ? s["user-menu__dropdown"] + " " + s["user-menu__dropdown_active"] : s["user-menu__dropdown"] } >
                        <div className={s["user-menu__dropdown__header"]}>
                            <a className={s["user-menu__dropdown__auth-btn"]}>Войти</a>
                            <a className={s["user-menu__dropdown__registration-btn"]}>Регистрация</a>
                        </div>

                        <div className={s["user-menu__dropdown__body"]}>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Правила сайта</a>
                            <a className={s["user-menu__dropdown__body__link"]} href="">О нас</a>
                        </div>

                        <div className={s["user-menu__dropdown__footer"]}>
                            <div className={s["user-menu__dropdown__footer__item"]}>
                                <FontAwesomeIcon className={s["user-menu__dropdown__footer__icon"]} icon={faChalkboardTeacher}/>
                                <span>Язык, лента</span>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};
