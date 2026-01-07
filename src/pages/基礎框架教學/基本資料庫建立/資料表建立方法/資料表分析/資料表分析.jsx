
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_資料表分析.scss';//引入指定樣式
import { useState } from 'react';


export default function 資料表分析() {

    const tableRowList = [
        "欄位名稱",
        "資料型別",
        "是否外鍵",
        "外鍵欄位",
        "刪除策略",
        "預設值",
        "約束",
        "是否索引",
        "欄位說明",
    ]

    const [tableSpec, setTableSpec] = useState({
        tableName: "images",
        columns: [],
    });

    const emptyColumn = {
        name: "",
        type: "",
        isForeignKey: false,
        foreignKeyRef: null,
        onDeleteCascade: false,
        defaultValue: "",
        constraints: {
            notNull: false,
            unique: false,
        },
        indexed: false,
        description: "",
    };

    const [draftColumn, setDraftColumn] = useState(emptyColumn);

    const handleAddColumn = () => {
        if (!draftColumn.name || !draftColumn.type) {
            alert("請填寫欄位名稱與資料型別");
            return;
        }

        setTableSpec((prev) => ({
            ...prev,
            columns: [...prev.columns, draftColumn],
        }));

        setDraftColumn(emptyColumn); // 清空表單
    };

    const exportSchema = {
        meta: {
            db: "postgresql",
            version: "16",
            charset: "utf8",
        },
        tableName: tableSpec.tableName,
        columns: tableSpec.columns,
    };

    const exportJsonString = JSON.stringify(exportSchema, null, 2);

    return (
        <div className="container">
            <div className="資料表分析">
                <h4>資料表分析</h4>
                <p>不管是要建立哪一種資料表都需要先分析</p>
                <p>像是多資料表連結</p>
                <div className='imgBox'>
                    <img    className="imgSet" 
                            src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表分析/資料表分析01.png" 
                            alt="" />
                </div>
                <p>或是簡單資料表連接</p>
                <div className='imgBox'>
                    <img    className="imgSet" 
                            src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表分析/資料表分析02.png" 
                            alt="" />
                </div>
                <br />
                <h5>1.確認資料表名稱</h5>
                <p>確認資料表名稱(如圖)</p>
                <div className='imgBox'>
                    <img    className="imgSet" 
                            src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表分析/資料表分析03.png" 
                            alt="" />
                </div>
                <br />
                <h5>2.確認資料表欄位及資料屬性</h5>
                <div className='imgBox'>
                    <img    className="imgSet" 
                            src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表分析/資料表分析04.png" 
                            alt="" />
                </div>
                <h6>常用資料屬性說明</h6>
                <div>
                    <div className='fw-bold fs-20'>INT<span className='fw-normal fs-16'>:一般整數</span></div>
                    <div className='fw-bold fs-20'>BIGINT <span className='fw-normal fs-16'>:ID/外鍵</span></div>
                    <div className='fw-bold fs-20'>TEXT <span className='fw-normal fs-16'>:文字</span></div>
                    <div className='fw-bold fs-20'>VARCHAR(255) <span className='fw-normal fs-16'>:有「明確最大長度」的文字</span></div>
                    <div className='fw-bold fs-20'>BOOLEAN <span className='fw-normal fs-16'> :是 / 否</span></div>
                    <div className='fw-bold fs-20'>TIMESTAMPTZ <span className='fw-normal fs-16'>:日期 + 時間 + 時區</span></div> 
                </div>

                <br />
                <h5>3.確認外鍵連接</h5>
                <pre className="language-html m-0 p-16">
                <code className="language-html">
                    {   
                        dedent
                        (`
                            images.article_id → articles.id
                        `)   
                    }       
                </code>
                </pre>
                <div className='imgBox'>
                    <img    className="imgSet" 
                            src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表分析/資料表分析05.png" 
                            alt="" />
                </div>
                <h6>確認外鍵刪除策略</h6>
                <p>刪除策略意思為:如果文章被刪除，對應的圖片是否要一併刪除?</p>
                <pre className="language-html m-0 p-16">
                <code className="language-html">
                    {   
                        dedent
                        (`
                            ON DELETE CASCADE
                        `)   
                    }       
                </code>
                </pre>
                <br />
                <h5>4.確認約束</h5>
                <p>約束的種類如下:</p>
                <p>確認是否要限制不可為空</p>
                <pre className="language-html m-0 p-16">
                <code className="language-html">
                    {   
                        dedent
                        (`
                            NOT NULL
                        `)   
                    }       
                </code>
                </pre>
                <p>確認是否要寫入預設值</p>
                <pre className="language-html m-0 p-16">
                <code className="language-html">
                    {   
                        dedent
                        (`
                            DEFAULT now()
                        `)   
                    }       
                </code>
                </pre>
                <p>確認是否為UNIQUE</p>
                <p>UNIQUE意思是該欄位資料為唯一數值不可重複</p>
                <pre className="language-html m-0 p-16">
                <code className="language-html">
                    {   
                        dedent
                        (`
                            UNIQUE (欄位名稱)
                        `)   
                    }       
                </code>
                </pre>
                <br />
                <h5>5.確認索引</h5>
                <p>追加索引策略的前題是該欄位可能是會被當作搜尋的目標</p>
                <p>像是id/名稱等等</p>
                <br />
                <h5>6.確認預設值</h5>
                <p>通常只有時間相關的欄位會需要填寫</p>
                <p>像是created_at/updated_at</p>
                <p>now()效果是每次更新時填入目前的時間</p>
                <pre className="language-html m-0 p-16">
                <code className="language-html">
                    {   
                        dedent
                        (`
                            now()
                        `)   
                    }       
                </code>
                </pre>
                <br />
                <h5>資料表明細</h5>
                <div className='tableBox'>
                    <div>資料表名稱:{tableSpec.tableName}</div>
                    <table className='spec'>
                        <thead>
                            <tr>
                                {
                                    tableRowList?.map((item,index)=>{
                                        return(
                                            <th key={index}>{item}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableSpec?.columns.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            {/* 欄位名稱 */}
                                            <td>{item.name}</td>
                                            {/* 資料型別 */}
                                            <td>{item.type}</td>
                                            {/* 是否外鍵 */}
                                            <td>{item.isForeignKey?("是"):("否")}</td>
                                            {/* 外鍵欄位 */}
                                            <td>{item.foreignKeyRef?(item.foreignKeyRef):("—")}</td>
                                            {/* 刪除策略 */}
                                            <td>{item.onDeleteCascade?("是"):("否")}</td>
                                            {/* 預設值 */}
                                            <td>{item.defaultValue?(item.defaultValue):("—")}</td>
                                            {/* 約束 */}
                                            <td>
                                                <div className="groupBox">
                                                    <div className="checkBoxGroup">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.constraints.notNull}
                                                        readOnly
                                                    />
                                                    <label>不可為空</label>
                                                    </div>

                                                    <div className="checkBoxGroup">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.constraints.unique}
                                                        readOnly
                                                    />
                                                    <label>是否唯一</label>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* 是否索引 */}
                                            <td>{item.indexed?("是"):("否")}</td>
                                            {/* 欄位說明 */}
                                            <td>{item.description?(item.description):("—")}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <br />
                <div className='addItemBox'>
                    
                    <h4>新增資料表欄位</h4>
                    <div className='inputGroup'>
                        <label>欄位名稱</label>
                        <input
                            value={draftColumn.name}
                            onChange={(e) =>
                                setDraftColumn({ ...draftColumn, name: e.target.value })
                            }
                        />
                    </div>

                    <div className='inputGroup'>
                        <label>資料型別</label>
                        <select
                            value={draftColumn.type}
                            onChange={(e) =>
                                setDraftColumn({ ...draftColumn, type: e.target.value })
                            }
                        >
                            <option value="">選擇型別</option>
                            <option value="BIGINT">BIGINT</option>
                            <option value="TEXT">TEXT</option>
                            <option value="VARCHAR(255)">VARCHAR(255)</option>
                            <option value="TIMESTAMPTZ">TIMESTAMPTZ</option>
                        </select>
                    </div>
                    
                    <div className='radioGroupBox'>
                        <label>是否是外鍵</label>
                        <div className='d-flex'>
                            <div className='radioGroup'>
                                <input
                                    type="radio"
                                    name="isForeignKey"
                                    checked={draftColumn.isForeignKey === true}
                                    onChange={() =>
                                    setDraftColumn({ ...draftColumn, isForeignKey: true })
                                    }
                                /> 
                                <label>是</label>
                            </div>
                            <div className='radioGroup'>
                                <input
                                    type="radio"
                                    name="isForeignKey"
                                    checked={draftColumn.isForeignKey === false}
                                    onChange={() =>
                                        setDraftColumn({ ...draftColumn, isForeignKey: false })
                                    }
                                />
                                <label>否</label>
                            </div>
                        </div>
                    </div>

                    <div className='inputGroup'>
                        <label>外鍵欄位</label>
                        <input
                            placeholder="例如 articles.id"
                            value={draftColumn.foreignKeyRef}
                            onChange={(e) =>
                                setDraftColumn({ ...draftColumn, foreignKeyRef: e.target.value })
                            }
                        />
                    </div>
                    
                    <div className='radioGroupBox'>
                        <label>刪除策略（CASCADE）</label>
                        <div className='d-flex'>
                            <div className='radioGroup'>
                                <input
                                    type="radio"
                                    name="onDelete"
                                    checked={draftColumn.onDeleteCascade === true}
                                    onChange={() =>
                                        setDraftColumn({ ...draftColumn, onDeleteCascade: true })
                                    }
                                /> 
                                <label>是</label>
                            </div>
                            <div className='radioGroup'>
                                <input
                                    type="radio"
                                    name="onDelete"
                                    checked={draftColumn.onDeleteCascade === false}
                                    onChange={() =>
                                        setDraftColumn({ ...draftColumn, onDeleteCascade: false })
                                    }
                                /> 
                                <label>否</label>
                            </div>
                        </div>
                    </div>

                    <div className='inputGroup'>
                        <label>預設值</label>
                        <input
                            value={draftColumn.defaultValue}
                            onChange={(e) =>
                                setDraftColumn({ ...draftColumn, defaultValue: e.target.value })
                            }
                        />
                    </div>
                    
                    <div className='radioGroupBox'>
                        <label>約束</label>
                        <div className='d-flex'>
                            <div className='radioGroup'>
                                <input
                                    type="checkbox"
                                    checked={draftColumn.constraints.notNull}
                                    onChange={(e) =>
                                        setDraftColumn({
                                            ...draftColumn,
                                            constraints: {
                                                ...draftColumn.constraints,
                                                notNull: e.target.checked,
                                            },
                                        })
                                    }
                                /> 
                                <label>不可為空</label>
                            </div>
                            <div className='radioGroup'>
                                <input
                                    type="checkbox"
                                    checked={draftColumn.constraints.unique}
                                    onChange={(e) =>
                                        setDraftColumn({
                                            ...draftColumn,
                                            constraints: {
                                                ...draftColumn.constraints,
                                                unique: e.target.checked,
                                            },
                                        })
                                    }
                                /> 
                                <label>是否唯一</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className='radioGroupBox'>
                        <label>是否索引</label>
                        <div className='d-flex'>
                            <div className='radioGroup'>
                                <input
                                    type="radio"
                                    name="indexed"
                                    checked={draftColumn.indexed === true}
                                    onChange={() =>
                                        setDraftColumn({ ...draftColumn, indexed: true })
                                    }
                                /> 
                                <label>是</label>
                            </div>
                            <div className='radioGroup'>
                                <input
                                    type="radio"
                                    name="indexed"
                                    checked={draftColumn.indexed === false}
                                    onChange={() =>
                                        setDraftColumn({ ...draftColumn, indexed: false })
                                    }
                                />  
                                <label>否</label>
                            </div>
                        </div>
                    </div>

                    <div className='inputGroup'>
                        <label>欄位說明</label>
                        <input
                            value={draftColumn.description}
                            onChange={(e) =>
                                setDraftColumn({ ...draftColumn, description: e.target.value })
                            }
                        />
                    </div>
                    <button onClick={handleAddColumn}>新增欄位</button>
                </div>
                <br />
                <h5>匯出 Schema JSON（複製給 GPT）</h5>
                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {
                            JSON.stringify(
                            {
                                meta: {
                                db: "postgresql",
                                version: "16",
                                charset: "utf8",
                                },
                                tableName: tableSpec.tableName,
                                columns: tableSpec.columns,
                            },null,2)
                        }
                    </code>
                </pre>
            </div>
        </div>
        
    );
}