
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import ProductValidator from './ProductValidator';





export default function Validators() {

    const [activeTab, setActiveTab] = useState('productValidator');//tab控制

    const ValidatorsData = 
            [
                {
                    title:"產品資料判定方式",
                    key:"productValidator",
                    pageData:<ProductValidator />
                },
            ]

  return (
    <div className="container">
        <h3>設定資料判定規則(joi)</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {/* Tab 選單區 */}
            <Nav className='d-flex flex-row tab-box'>
                {
                    ValidatorsData?.map((item)=>{
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
                    ValidatorsData?.map((item)=>{
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
    </div>
  );
}
