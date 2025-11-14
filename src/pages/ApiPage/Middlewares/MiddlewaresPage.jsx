
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import AllowRoles from './AllowRoles';
import ValidateSchema from './ValidateSchema';
import Verifycookie from './Verifycookie';
import VerifyToken from './VerifyToken';



export default function MiddlewaresPage() {

    const [activeTab, setActiveTab] = useState('allowRoles');//tab控制

    const MiddlewaresData = 
            [
                {
                    title:"確認登入者狀態與權限(allowRoles)",
                    key:"allowRoles",
                    pageData:<AllowRoles />
                },
                {
                    title:"輸入並驗證規則(validateSchema)",
                    key:"validateSchema",
                    pageData:<ValidateSchema />
                },
                {
                    title:"確認使用者cookie是否合法(verifycookie)",
                    key:"verifycookie",
                    pageData:<Verifycookie />
                },
                {
                    title:"確認使用者Token是否合法(verifyToken)",
                    key:"verifyToken",
                    pageData:<VerifyToken />
                },
            ]

  return (
    <div className="container">
        <h3>相關認證規定</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {/* Tab 選單區 */}
            <Nav className='d-flex flex-row tab-box'>
                {
                    MiddlewaresData?.map((item)=>{
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
                    MiddlewaresData?.map((item)=>{
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
