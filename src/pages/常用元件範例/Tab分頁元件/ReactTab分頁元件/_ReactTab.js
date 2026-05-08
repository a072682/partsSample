
    
//#region 引入狀態
import { useState } from 'react';
//#endregion

export function useReactTab() {
    const [activeTab, setActiveTab] = useState('one');

    const tabdata = [
        { title: "one", key: "one", pageData: "one", disabled: false },
        { title: "two", key: "two", pageData: "two", disabled: false },
        { title: "three", key: "three", pageData: "three", disabled: true },
    ];

    return { activeTab, setActiveTab, tabdata };
}