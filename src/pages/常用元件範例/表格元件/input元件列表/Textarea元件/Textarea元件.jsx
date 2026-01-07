

import { useState } from 'react';
import './_textarea元件.scss';


export default function textarea元件 () {

    //#region
    //#endregion

    //#region 狀態宣告
    const [text, setText] = useState("");
    //#endregion

    return (
        <>
        <div className='textarea元件'>
            <h3>預設textarea元件</h3>
            <textarea
                className='textareaSet'
                name="description"
                rows="5"
                placeholder="輸入大量文字..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        </>
    );
};

