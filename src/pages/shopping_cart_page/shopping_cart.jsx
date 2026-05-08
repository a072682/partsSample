
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';
import Detail from './Detail/Detail';



export default function ShoppingCart() {

    const [cartTab, setCartTab] = useState('訂單資料');//tab控制

    const cartData = 
            [
                {
                    title:"訂單資料",
                    key:"訂單資料",
                    pageData:<ShoppingCartItem />,
                },
                {
                    title:"訂單明細",
                    key:"訂單明細",
                    pageData:<Detail />,
                },
            ]

    return (
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <h3>ShoppingCart範例</h3>
                    <Tab.Container activeKey={cartTab} onSelect={(key) => setCartTab(key)}>
                        {/* Tab 選單區 */}
                        <Nav className='d-flex flex-row tab-box'>
                            {
                                cartData?.map((item)=>{
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
                                cartData?.map((item)=>{
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
            </div>
        </div>
    );
}
