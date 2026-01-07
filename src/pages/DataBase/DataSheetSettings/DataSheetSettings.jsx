
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import dedent from 'dedent';//去除多餘空白保持縮排格式
import Users from './Users/Users';
import User_list from './User_list/User_list';
import User_Profiles from './User_Profiles/User_Profiles';
import Carts_items from './Carts_items/Carts_items';
import Carts_list from './Carts_list/Carts_list';
import Order_items from './Order_items/Order_items';
import Order_list from './Order_list/Order_list';
import Print_items from './Print_items/Print_items';




export default function DataSheetSettings() {

    const [activeTab, setActiveTab] = useState('users');//tab控制
        
      const DataSheetData = 
          [
              {
                  title:"users(使用者資料表)",
                  key:"users",
                  pageData:<Users />,
              },
              {
                  title:"user_list",
                  key:"user_list",
                  pageData:<User_list />,
              },
              {
                  title:"user_Profiles",
                  key:"user_Profiles",
                  pageData:<User_Profiles />,
              },
              {
                  title:"carts_list",
                  key:"carts_list",
                  pageData:<Carts_list />,
              },
              {
                  title:"carts_items",
                  key:"carts_items",
                  pageData:<Carts_items />,
              },
              {
                  title:"order_list",
                  key:"order_list",
                  pageData:<Order_list />,
              },
              {
                  title:"order_items",
                  key:"order_items",
                  pageData:<Order_items />,
              },
              {
                  title:"print_items",
                  key:"print_items",
                  pageData:<Print_items />,
              },
          ]

    return (
        <>
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                {/* Tab 選單區 */}
                <Nav className='d-flex flex-row tab-box'>
                    {
                        DataSheetData?.map((item)=>{
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
                        DataSheetData?.map((item)=>{
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