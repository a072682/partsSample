
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import dedent from 'dedent';//去除多餘空白保持縮排格式
import BasicSettings from './BasicSettings/BasicSettings';
import DataSheetSettings from './DataSheetSettings/DataSheetSettings';
import DBeaverSettings from './DBeaverSettings/DBeaverSettings';
import DataSheetChart from './DataSheetChart/DataSheetChart';


export default function DataBase() {

  const [activeTab, setActiveTab] = useState('BasicSettings');//tab控制
    
  const ApiData = 
      [
          {
              title:"資料庫端最基礎架構設定",
              key:"BasicSettings",
              pageData:<BasicSettings />
          },
          {
              title:"資料表結構圖表",
              key:"DataSheetChart",
              pageData:<DataSheetChart />
          },
          {
              title:"資料表建立設定",
              key:"DataSheetSettings",
              pageData:<DataSheetSettings />
          },
          {
              title:"DBeaver資料表建立教學",
              key:"DBeaverSettings",
              pageData:<DBeaverSettings />
          },
      ]

  return (
    <>
      <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        {/* Tab 選單區 */}
        <Nav className='d-flex flex-row tab-box'>
            {
                ApiData?.map((item)=>{
                    return(
                        <>
                            <Nav.Item key={item.key} className='tab-item'>
                                <Nav.Link className="tab-link" eventKey={item.key}>{item.title}</Nav.Link>
                            </Nav.Item>
                        </>
                    )
                })
            }
        </Nav>
        {/* Tab 內容區 */}
        <Tab.Content className='h-100'>
            {
                ApiData?.map((item)=>{
                    return(
                        <>
                            <Tab.Pane key={item.key} eventKey={item.key}>
                                {item.pageData}
                            </Tab.Pane>
                        </>
                    )
                })
            }
        </Tab.Content>
      </Tab.Container>
    </>
    
  );
}