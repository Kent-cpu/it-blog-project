import React, {useState} from 'react';
import {TabsHeader} from "./TabsHeader";

const Tabs = ({tabs}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <TabsHeader tabs = {tabs} activeIndex={activeIndex} onTabClick = {setActiveIndex} />
            {tabs[activeIndex].renderContent()}
        </div>
    );
};

export default Tabs;