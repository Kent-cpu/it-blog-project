import React, {useState} from 'react';
import {TabsHeader} from "./TabsHeader";

const Tabs = ({index, tabs}) => {
    const [activeIndex, setActiveIndex] = useState(index == undefined ?
        0 :
        index
    );


    return (
        <div>
            <TabsHeader tabs={tabs} activeIndex={activeIndex} onTabClick={setActiveIndex}/>
            {tabs[activeIndex].renderContent()}
        </div>
    );
};

export default Tabs;