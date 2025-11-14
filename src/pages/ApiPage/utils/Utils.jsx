
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import Cloudinary from './Cloudinary';





export default function Utils() {

    const [activeTab, setActiveTab] = useState('cloudinary');//tab控制

    const UtilsData = 
            [
                {
                    title:"雲端連接設定",
                    key:"cloudinary",
                    pageData:<Cloudinary />
                },
            ]

  return (
    <div className="container">
        <h3>獨立單元設定</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {/* Tab 選單區 */}
            <Nav className='d-flex flex-row tab-box'>
                {
                    UtilsData?.map((item)=>{
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
                    UtilsData?.map((item)=>{
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
