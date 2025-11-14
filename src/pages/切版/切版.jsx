

import './_切版.scss';
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import 版型01 from './版型01/版型01';



export default function 切版() {
  
    const [activeTab, setActiveTab] = useState('key01');//tab控制
    
        const 切版Data = 
            [
                {
                    title:"版型01",
                    key:"key01",
                    pageData:<版型01 />,
                    img:"/images/切版/版型01.png",
                },
                {
                    title:"版型02",
                    key:"key02",
                    pageData:<版型01 />,
                    img:"/images/切版/版型02.png",
                },
            ]
    
      return (
        <div className="container">
            <div className="title-box">
                <h2>API創建設定</h2>
            </div>
            <br />

            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                {/* Tab 選單區 */}
                <Nav className='d-flex flex-row 切版tab-box'>
                    {
                        切版Data?.map((item)=>{
                            return(
                                
                                <Nav.Item key={item.key} className='tab-item'>
                                    <Nav.Link className="tab-link" eventKey={item.key}>
                                        {item.title}
                                        <div className='imgBox'>
                                            <img className='imgSet' src={item.img} alt="" />
                                        </div>
                                    </Nav.Link>
                                    
                                </Nav.Item>
                                
                            )
                        })
                    }
                </Nav>
                {/* Tab 內容區 */}
                <Tab.Content className='h-100'>
                    {
                        切版Data?.map((item)=>{
                            return(
                                
                                <Tab.Pane key={item.key} eventKey={item.key}>
                                    {item.pageData}
                                </Tab.Pane>
                            
                            )
                        })
                    }
                </Tab.Content>
            </Tab.Container>
        </div>
      );
}
