
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function DataSheetChart() {

    

  return (
    <div className="container">
        <div className="content-box">
            <h4>資料表結構圖</h4>
            <div>
                <img src="images/dbeaver/09.png" alt="" />
            </div>
            <br />
            <p>核心資料表為user</p>
            <p>list系列資料表在與user資料表的id進行連接</p>
            <p>items系列資料表在與list資料表的id進行連接</p>
            <br />
            <div>
                <img src="images/api/01.png" alt="" />
            </div>
            <br />
            <p>users資料表的id與user_list資料表的user_id互相連接(兩者數值會相同)</p>
            <p>user_list資料表的id與user_profiles資料表的user_list_id互相連接(兩者數值會相同)</p>
            <p>新增資料原理:前端接受到user資料表的id後藉由
            "'SELECT id FROM user_list WHERE user_id = $1', [userId]"
            可以取得與user_id對應的id</p>
            <p>在利用回傳的id</p>
        </div>
    </div>
  );
}