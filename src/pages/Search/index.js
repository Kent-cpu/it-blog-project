import React, {useRef, useState} from 'react';
import s from "./index.module.scss";
import SearchPost from "./SearchPost";
import Tabs from "../../components/Tabs";

const Search = () => {
    const [searchStates, setSearchStates] = useState(false);
    const searchText = useRef("");

    const tabs = [
        {
            text: "Публикации",
            renderContent: () => <SearchPost
                                    searchStatesByNewTitle={searchStates}
                                    setSearchStatesByNewTitle={setSearchStates}
                                    searchText={searchText.current.value}
            />
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
                            ref={searchText}
                        />
                    </form>
                </div>
                <Tabs tabs={tabs}/>
            </div>
        </div>
    );
};

export default Search;