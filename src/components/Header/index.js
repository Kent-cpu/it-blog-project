import React, {useContext} from 'react';
import s from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {AuthContext} from "../../context";
import {Profile} from "./Profile";

export const Header = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        <header>
            <div className={s["header__top"]}>
                <div className="main-container">
                    <div className= {s["header__logo"]}>Лого</div>
                </div>
            </div>

            <div className={s["header__bottom"]}>
                <div className="main-container">
                    <div className={s["header__bottom__wrapper"]}>
                        <div className={s["category-posts"]}>
                            <nav className="category-posts__nav">
                                <ul className={s["category-posts__list"]}>
                                    <li className={s["category-posts__item"]}>
                                        <a className={s["category-posts__link"]} href="">Моя лента</a>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <a className={s["category-posts__link"]} href="">Все потоки</a>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <a className={s["category-posts__link"]} href="">Разработка</a>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <a className={s["category-posts__link"]} href="">Администрирование</a>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <a className={s["category-posts__link"]} href="">Дизайн</a>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <a className={s["category-posts__link"]} href="">Менеджмент</a>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <a className={s["category-posts__link"]} href="">Научпоп</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className={s["user-menu"]}>
                            {isAuth
                                &&
                                <div className={s["user-menu__item"]}>
                                    <FontAwesomeIcon className={s["user-menu__create-post"]} icon={faPencilAlt}/>
                                </div>
                             }

                            <div className={s["user-menu__item"]}>
                                <FontAwesomeIcon className={s["user-menu__search"]} icon={faSearch}/>
                            </div>

                            <div className={s["user-menu__item"]}>
                                <Profile/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

