import React, {useState} from 'react';
import {Header} from "../../components/Header";
import s from "./index.module.scss";

import {SearchPost} from "./SearchPost";
import Tabs from "../../components/Tabs";

export const Search = () => {
    const [searchText, setSearchText] = useState("");
    const [isStartRequest, setIsStartRequest] = useState(false);

    const tabs = [
        {
            text: "Публикации",
            renderContent: () => <SearchPost requestBool={isStartRequest} searchText={searchText}/>
        },

        // {
        //     text: "Аккаунт",
        //     renderContent: () => <AccountSetting/>
        // },
    ];


    return (
        <div>
            <Header/>
            <div className="main-container">
                <div className="wrapper-content">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setIsStartRequest(true)}
                    }>
                        <input
                            type="text"
                            className={s["search-field"]}
                            placeholder="Поиск"
                            autoFocus={true}
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setIsStartRequest(false);
                            }}

                        />
                    </form>
                </div>


                <Tabs tabs={tabs}/>
            </div>


        </div>
    );
};

