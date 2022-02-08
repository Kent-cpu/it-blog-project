import React from 'react';
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import {ProfileSetting} from "./ProfileSetting";
import {AccountSetting} from "./ AccountSetting";
import "./index.scss"

const tabs = [
    {
        text: "Профиль",
        renderContent: () => <ProfileSetting/>
    },

    {
        text: "Аккаунт",
        renderContent: () => <AccountSetting/>
    },
];

export const Setting = () => {

    return (
        <div>

            <div className="main-container">
                <div className="wrapper-content">
                    <h2>Настройки</h2>
                </div>
                <div className="wrapper-content">

                    <Tabs tabs = {tabs}/>
                </div>
            </div>
        </div>
    );
};

