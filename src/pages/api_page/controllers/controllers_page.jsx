
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import ProductsController from './ProductsController';
import UploadController from './UploadController';
import UserController from './UserController';






export default function ControllersPage() {

    const [activeTab, setActiveTab] = useState('productsController');//tab控制

    const ControllersData = 
            [
                {
                    title:"處理產品 API 邏輯",
                    key:"productsController",
                    pageData:<ProductsController />
                },
                {
                    title:"處理圖片上傳邏輯",
                    key:"uploadController",
                    pageData:<UploadController />
                },
                {
                    title:"處理會員相關邏輯",
                    key:"userController",
                    pageData:<UserController />
                },
            ]

  return (
    <div className="container">
        <h3>基礎API函式(controllers)</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {/* Tab 選單區 */}
            <Nav className='d-flex flex-row tab-box'>
                {
                    ControllersData?.map((item)=>{
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
                    ControllersData?.map((item)=>{
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
