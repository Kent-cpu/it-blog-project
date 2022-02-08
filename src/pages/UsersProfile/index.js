import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';

import {NavLink, useLocation, useParams} from "react-router-dom";
import Tabs from "../../components/Tabs";
import {USER_PROFILE, USER_PROFILE_FAVORITES, USER_PROFILE_POSTS} from "../../utils/constants";
import {AuthContext} from "../../context";
import {collection, getDoc, getDocs, limit, orderBy, query, where} from "firebase/firestore";


const tabs = [
    {
        to: USER_PROFILE,
        text: <NavLink
            style={{textDecoration: "none"}}
            to={currentLocation => (
                {
                    ...currentLocation, pathname: USER_PROFILE,
                }
            )}>Профиль</NavLink>,
        renderContent: () => <div>Мой профиль</div>
    },

    {
        to: USER_PROFILE_POSTS,
        text: <NavLink
            style={{textDecoration: "none"}}
            to={currentLocation => (
                {
                    ...currentLocation, pathname: USER_PROFILE_POSTS,
                }
            )}>Закладки</NavLink>,
        renderContent: () => <div>Посты</div>
    }
]


export const UserProfile = () => {

    const location = useLocation();
    const linkParameters = new URLSearchParams(location.search);
    const nicknameUser = useRef(linkParameters.get("nickname"));
    const {db} = useContext(AuthContext);

    function findActiveTab() {
        return tabs.findIndex(tab => tab.to === location.pathname);
    }

    const getDataUser = async () => {
        const userQuery = await query(collection(db, "Users"), where("nickname", "==", nicknameUser.current));
        const userAnswer = await getDocs(userQuery);
        console.log(userAnswer.docs.map(doc => doc.data()));
    }

    const memoGetDataUser = useMemo(async () => {
        await getDataUser();
    }, [nicknameUser.current]);

    useEffect(async () => {
        console.log(location.search)
        // await memoGetDataUser();
    }, [location.search])

    return (
        <div className="main-container">
            <div className="wrapper-content">
                <div>veve</div>

                <div>veve</div>
                <div>veve</div>
                <div>veve</div>
                <Tabs index={findActiveTab()} tabs={tabs}/>
            </div>

        </div>
    );
};
