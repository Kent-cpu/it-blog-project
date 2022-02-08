import React, {useState} from 'react';
import s from "./index.module.scss";
import {SearchPost} from "./SearchPost";
import Tabs from "../../components/Tabs";

export const Search = () => {
    const [searchText, setSearchText] = useState("");
    const [searchStates, setSearchStates] = useState(false);

    const tabs = [
        {
            text: "Публикации",
            renderContent: () => <SearchPost
                                    searchStatesByNewTitle={searchStates}
                                    setSearchStatesByNewTitle={setSearchStates}
                                    searchText={searchText}/>
        },

        // {
        //     text: "Аккаунт",
        //     renderContent: () => <AccountSetting/>
        // },
    ];

    const startSearch = (e) => {
        e.preventDefault();
        setSearchStates(true);
    }

    const onChangeInputSearch = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <div>
            <div className="main-container">
                <div className="wrapper-content">
                    <form onSubmit={startSearch}>
                        <input
                            type="text"
                            className={s["search-field"]}
                            placeholder="Поиск"
                            autoFocus={true}
                            value={searchText}
                            onChange={onChangeInputSearch}
                        />
                    </form>
                </div>
                <Tabs tabs={tabs}/>
            </div>
        </div>
    );
};