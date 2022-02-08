import React, {memo, useContext} from 'react';
import s from "./index.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {AuthContext} from "../../context";
import {Profile} from "./Profile";
import {NavLink} from "react-router-dom";
import {
    ADMINISTRATION_POSTS,
    ALL,
    CREATE_ARTICLE,
    DESIGN_POSTS,
    DEVELOPMENT_POSTS,
    MANAGEMENT_POSTS,
    POPSCI_POSTS, SEARCH
} from "../../utils/constants";

const Header = () => {
    const {isAuth} = useContext(AuthContext);


    return (
        <header style={{marginBottom: "25px"}}>
            <div className={s["header__top"]}>
                <div className="main-container">
                    <div className={s["header__logo"]}>
                        <NavLink className={s["header__logo"]} to={ALL}>Лого</NavLink>
                    </div>
                </div>
            </div>

            <div className={s["header__bottom"]}>
                <div className="main-container">
                    <div className={s["header__bottom__wrapper"]}>
                        <div className={s["category-posts"]}>
                            <nav className="category-posts__nav">
                                <ul className={s["category-posts__list"]}>
                                    <li className={s["category-posts__item"]}>
                                        <NavLink
                                            to={{
                                                pathname: DEVELOPMENT_POSTS,
                                                search: '?mode=development',
                                            }}
                                            className={s["category-posts__link"]}>Разработка</NavLink>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <NavLink
                                            to={{
                                                pathname: ADMINISTRATION_POSTS,
                                                search: '?mode=administration',
                                            }} className={s["category-posts__link"]}>Администрирование</NavLink>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <NavLink
                                            to={{
                                                pathname: DESIGN_POSTS,
                                                search: '?mode=design',
                                            }} className={s["category-posts__link"]}>Дизайн</NavLink>
                                    </li>
                                    <li className={s["category-posts__item"]}>
                                        <NavLink
                                            to={{
                                                pathname: MANAGEMENT_POSTS,
                                                search: '?mode=management',
                                            }} className={s["category-posts__link"]}>Менеджмент</NavLink>
                                    </li>

                                    <li className={s["category-posts__item"]}>
                                        <NavLink
                                            to={{
                                                pathname: POPSCI_POSTS,
                                                search: '?mode=popsci',
                                            }}
                                            className={s["category-posts__link"]}>Научпоп</NavLink>
                                    </li>

                                </ul>
                            </nav>
                        </div>

                        <div className={s["user-menu"]}>
                            {isAuth
                                &&
                                <div className={s["user-menu__item"]}>
                                    <NavLink to={CREATE_ARTICLE}>
                                        <FontAwesomeIcon className={s["user-menu__create-post"]} icon={faPencilAlt}/>
                                    </NavLink>

                                </div>
                            }

                            <div className={s["user-menu__item"]}>
                                <NavLink to={SEARCH}>
                                    <FontAwesomeIcon className={s["user-menu__search"]} icon={faSearch}/>
                                </NavLink>

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

export default Header;