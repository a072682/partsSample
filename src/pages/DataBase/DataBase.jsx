
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';



export default function DataBase() {

  const [activeTab, setActiveTab] = useState('BasicSettings');//tab控制
    
  const ApiData = 
      [
          {
              title:"資料庫端最基礎架構設定",
              key:"BasicSettings",
              pageData:"",
          },
          {
              title:"資料表結構圖表",
              key:"DataSheetChart",
              pageData:"",
          },
          {
              title:"資料表建立設定",
              key:"DataSheetSettings",
              pageData:"",
          },
          {
              title:"DBeaver資料表建立教學",
              key:"DBeaverSettings",
              pageData:"",
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
                        
                            <Nav.Item key={item.key} className='tab-item'>
                                <Nav.Link className="tab-link" eventKey={item.key}>{item.title}</Nav.Link>
                            </Nav.Item>
                        
                    )
                })
            }
        </Nav>
        {/* Tab 內容區 */}
        <Tab.Content className='h-100'>
            {
                ApiData?.map((item)=>{
                    return(
                        
                            <Tab.Pane key={item.key} eventKey={item.key}>
                                {item.pageData}
                            </Tab.Pane>
                        
                    )
                })
            }
        </Tab.Content>
      </Tab.Container>
    </>
    
  );
}