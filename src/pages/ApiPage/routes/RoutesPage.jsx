
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import GoogleAuthRoutes from './GoogleAuthRoutes';
import ProductsRoutes from './ProductsRoutes';
import UploadRoutes from './UploadRoutes';
import UserRoutes from './UserRoutes';




export default function RoutesPage() {

    const [activeTab, setActiveTab] = useState('googleAuthRoutes');//tab控制

    const RoutesData = 
            [
                {
                    title:"GOOGLE相關路由",
                    key:"googleAuthRoutes",
                    pageData:<GoogleAuthRoutes />
                },
                {
                    title:"產品相關Api路由設定",
                    key:"productsRoutes",
                    pageData:<ProductsRoutes />
                },
                {
                    title:"圖片上傳相關路由設定",
                    key:"uploadRoutes",
                    pageData:<UploadRoutes />
                },
                {
                    title:"會員相關路由設定",
                    key:"userRoutes",
                    pageData:<UserRoutes />
                },
            ]

  return (
    <div className="container">
        <h3>路由相關設定(routes)</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {/* Tab 選單區 */}
            <Nav className='d-flex flex-row tab-box'>
                {
                    RoutesData?.map((item)=>{
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
                    RoutesData?.map((item)=>{
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
