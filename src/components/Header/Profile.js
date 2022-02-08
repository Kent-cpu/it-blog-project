import React, {useContext, useEffect, useRef, useState} from 'react';
import s from "./index.module.scss";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../context";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {faChalkboardTeacher} from "@fortawesome/free-solid-svg-icons/faChalkboardTeacher";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import {NavLink} from "react-router-dom";
import {LOGIN, REGISTRATION, SETTING, USER_PROFILE} from "../../utils/constants";
import {signOut} from "firebase/auth";


export const Profile = () => {
    const {auth, userData, isAuth} = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const rootEl = useRef(null);


    const exit = () => {
        signOut(auth).catch((error) => {
            console.error(error)
        });
    }


    useEffect(() => {
        const clickOutsideEl = e => {
            setIsVisible(current => {
                if (current && rootEl.current.contains(e.target)) { // если клик происходит внутри профиля
                    return false;
                } else if (!rootEl.current.contains(e.target)) { // если клик происходит вне блока
                    return false;
                } else {
                    return true;
                }
            })
        }

        document.addEventListener("click", clickOutsideEl);
        return () => document.removeEventListener('click', clickOutsideEl);
    }, []);


    return (
        <div ref={rootEl}>
            <div>
                {
                    auth.currentUser
                        ?
                        (userData?.avatar ?
                                <div className={s["profile-avatar-wrapper"]}>
                                    <img className={s["profile-avatar"]} src={userData.avatar} alt="Профиль"/>
                                </div>
                                :
                                <FontAwesomeIcon className={s["user-menu__profile"]} icon={faUser}/>
                        )
                        :
                        <FontAwesomeIcon className={s["user-menu__profile"]} icon={faUser}/>
                }
            </div>

            {
                isAuth
                    ?
                    <div
                        className={isVisible ? s["user-menu__dropdown"] + " " + s["user-menu__dropdown_active"] : s["user-menu__dropdown"]}>
                        <div className={s["user-menu__dropdown__body"]}>
                            <NavLink to={{
                                pathname: `${USER_PROFILE}`,
                                search: `?nickname=${userData.nickname}`
                            }} className={s["user-menu__dropdown__body__link"]}>Мои
                                профиль</NavLink>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Статьи</a>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Закладки</a>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Комментарии</a>
                        </div>

                        <div className={s["user-menu__dropdown__footer"]}>
                            <div className={s["user-menu__dropdown__footer__item"]}>
                                <FontAwesomeIcon className={s["user-menu__dropdown__footer__icon"]}
                                                 icon={faChalkboardTeacher}/>
                                <span>Язык, лента</span>
                            </div>

                            <div className={s["user-menu__dropdown__footer__item"]}>
                                <FontAwesomeIcon className={s["user-menu__dropdown__footer__icon"]} icon={faCog}/>
                                <NavLink to={SETTING}
                                         className={s["user-menu__dropdown__setting-link"]}>Настройки</NavLink>
                            </div>

                            <div onClick={exit} className={s["user-menu__dropdown__footer__item"]}>
                                <FontAwesomeIcon className={s["user-menu__dropdown__footer__icon"]}
                                                 icon={faSignOutAlt}/>
                                <span>Выход</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div
                        className={isVisible ? s["user-menu__dropdown"] + " " + s["user-menu__dropdown_active"] : s["user-menu__dropdown"]}>
                        <div className={s["user-menu__dropdown__header"]}>
                            <NavLink to={LOGIN} className={s["user-menu__dropdown__auth-btn"]}>Войти</NavLink>
                            <NavLink to={REGISTRATION}
                                     className={s["user-menu__dropdown__registration-btn"]}>Регистрация</NavLink>
                        </div>

                        <div className={s["user-menu__dropdown__body"]}>
                            <a className={s["user-menu__dropdown__body__link"]} href="">Правила сайта</a>
                            <a className={s["user-menu__dropdown__body__link"]} href="">О нас</a>
                        </div>

                        <div className={s["user-menu__dropdown__footer"]}>
                            <div className={s["user-menu__dropdown__footer__item"]}>
                                <FontAwesomeIcon
                                    className={s["user-menu__dropdown__footer__icon"]}
                                    icon={faChalkboardTeacher}/>
                                <span>Язык, лента</span>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};