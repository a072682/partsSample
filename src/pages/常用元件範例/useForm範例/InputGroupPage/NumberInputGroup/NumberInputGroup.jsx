

import './_NumberInputGroup.scss';
import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function NumberInputGroup ({ id,title,value,unit, min = 0, max = 50, dataOutput }) {

  return (
    <>
    {/* 自訂義input群組(帶按鈕) */}
    <div className="NumberInputGroup">

      {/* 標題設定 */}
      <label htmlFor={id} className="labelSet">
        {title}
      </label>
      {/* 標題設定 */}

      {/* input整體設定 */}
      <div className="NumberInputBodyBox">
        {/* input主體 */}
        <input
          className="inputBodySet"
          type="text"
          id={id}
          value={`${value}`}
          onChange={(event) => {
            //event.target.value為目標內容
            //.replace(/\D/g, "")把所有非數字都移除
            //parseInt(..., 10)轉成十進位整數
            if (event.target.value === "") {
              dataOutput(""); 
              return;
            }
            const num = parseInt(event.target.value.replace(/\D/g, ""), 10) || 0;
            //Math.max(num, min)如果num低於min取min數值
            //Math.min(..., max)如果高於max取max數值
            dataOutput(Math.min(Math.max(num, min), max)); // 傳回父層更新
          }}
        />
        {/* input主體 */}

        {/* 單位 */}
        <span className="unitBox">{unit}</span>
        {/* 單位 */}

        {/* 按鈕區 */}
        <div className="btnBox">
          <button
            type="button"
            className="addBtnSet"
            onClick={() => {
              // 新數值 = 目前 value + step
              const newValue = value + 1;

              // 限制不能超過 max
              const limited = Math.min(newValue, max);

              // 回傳父層
              dataOutput(limited);
            }}
          >
            <span className="material-symbols-outlined iconSet">
              add
            </span>
          </button>
          <button
            type="button"
            className="subBtnSet"
            onClick={() => {
              // 新數值 = 目前 value + step
              const newValue = value - 1;

              // 限制不能超過 max
              const limited = Math.max(newValue, min);

              // 回傳父層
              dataOutput(limited);
            }}
          >
            <span className="material-symbols-outlined iconSet">remove</span>
          </button>
        </div>
        {/* 按鈕區 */}
      </div>
      {/* input整體設定 */}
    </div>
    {/* 自訂義input群組(帶按鈕) */}
    <Accordion defaultActiveKey="" className="defaultReactAccordionContent my-24">
        {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
        <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
            <Accordion.Header className="defaultReactAccordionHeader">
                程式碼說明
            </Accordion.Header>
            <Accordion.Body className="defaultReactAccordionBody p-0">
                
                <pre className="language-html m-0 p-16">
                    <div>HTML</div>
                    <code className="language-html">
                        {
                          dedent(
                              `
                              import './_NumberInputGroup.scss';//讀取樣式

                              //元件用法
                              //使用方法如下
                                //先宣告元件
                                import NumberInputGroup from './NumberInputGroup/NumberInputGroup';
                                //宣告初始數值
                                const[numData,setNumData] = useState(0);
                                useEffect(()=>{console.log(numData);},[numData])

                                //引入設定函數
                                <NumberInputGroup 
                                  id="keyId" //定義的id
                                  title="自定義"  //label的內容
                                  value={numData} //初始數值
                                  unit="mm" //顯示的單位
                                  dataOutput={(num) => setNumData(num)} //內部的數值有更新會寫入numData狀態中
                                  min = 0, //最低數值
                                  max = 50 //最高數值
                                />

                              // 元件本體
                              // 放置於return下方
                              {/* 自訂義input群組(帶按鈕) */}
                              <div className="NumberInputGroup">

                                {/* 標題設定 */}
                                <label htmlFor={id} className="labelSet">
                                  {title}
                                </label>
                                {/* 標題設定 */}

                                {/* input整體設定 */}
                                <div className="NumberInputBodyBox">
                                  {/* input主體 */}
                                  <input
                                    className="inputBodySet"
                                    type="text"
                                    id={id}
                                    value={\`\${value}\`}
                                    onChange={(event) => {
                                      //event.target.value為目標內容
                                      //.replace(/\D/g, "")把所有非數字都移除
                                      //parseInt(..., 10)轉成十進位整數
                                      if (event.target.value === "") {
                                        dataOutput(""); 
                                        return;
                                      }
                                      const num = parseInt(event.target.value.replace(/\D/g, ""), 10) || 0;
                                      //Math.max(num, min)如果num低於min取min數值
                                      //Math.min(..., max)如果高於max取max數值
                                      dataOutput(Math.min(Math.max(num, min), max)); // 傳回父層更新
                                    }}
                                  />
                                  {/* input主體 */}

                                  {/* 單位 */}
                                  <span className="unitBox">{unit}</span>
                                  {/* 單位 */}

                                  {/* 按鈕區 */}
                                  <div className="btnBox">
                                    <button
                                      type="button"
                                      className="addBtnSet"
                                      onClick={() => {
                                        // 新數值 = 目前 value + step
                                        const newValue = value + 1;

                                        // 限制不能超過 max
                                        const limited = Math.min(newValue, max);

                                        // 回傳父層
                                        dataOutput(limited);
                                      }}
                                    >
                                      <span className="material-symbols-outlined iconSet">
                                        add
                                      </span>
                                    </button>
                                    <button
                                      type="button"
                                      className="subBtnSet"
                                      onClick={() => {
                                        // 新數值 = 目前 value + step
                                        const newValue = value - 1;

                                        // 限制不能超過 max
                                        const limited = Math.max(newValue, min);

                                        // 回傳父層
                                        dataOutput(limited);
                                      }}
                                    >
                                      <span className="material-symbols-outlined iconSet">remove</span>
                                    </button>
                                  </div>
                                  {/* 按鈕區 */}
                                </div>
                                {/* input整體設定 */}
                              </div>
                              {/* 自訂義input群組(帶按鈕) */}
                              `
                          )
                        }       
                    </code>
                </pre>
                <pre className="language-html m-0 p-16">
                    <div>SCSS</div>
                    <code className="language-html">
                        {
                          dedent(
                              `
                              //自訂義input群組(帶按鈕)
                              .NumberInputGroup{
                                width: 100%;
                                height: auto;
                                display: flex;
                                justify-content: start;
                                align-items: start;
                                flex-direction: column;
                                gap: 12px;
                                // 標題設定
                                .labelSet{
                                  font-size: 24px;
                                  font-weight: 700;
                                  color: rgb(15, 15, 15);
                                }
                                // 標題設定

                                //input整體設定
                                .NumberInputBodyBox{
                                  position: relative;
                                  width: 100%;
                                  height: auto;
                                  aspect-ratio: 12 / 1;
                                  background-color: #ff8787;
                                  //input主體
                                  .inputBodySet{
                                    width: 90%;
                                    height: 100%;
                                    background-color: transparent;
                                    font-size: 24px;
                                    font-weight: 700;
                                    padding: 6px 12px;
                                    color: #000000;
                                    border-radius: 4px;
                                  }
                                  //input主體

                                  .unitBox{
                                    position: absolute;
                                    top: 50%;
                                    left: auto;
                                    right: 10%;
                                    font-size: 24px;
                                    font-weight: 700;
                                    transform: translate(-50%,-50%);
                                  }

                                  //按鈕區
                                  .btnBox{
                                    position: absolute;
                                    top: 0%;
                                    left: auto;
                                    right: 0;
                                    width: 10%;
                                    height: 100%;
                                    background-color: transparent;
                                    border: 2px solid #000000;
                                    .addBtnSet,.subBtnSet{
                                      position: absolute;
                                      left: 50%;
                                      transform: translate(-50%,-50%);
                                      width: 24px;
                                      height: auto;
                                      aspect-ratio: 1 / 1;
                                      border: none;
                                      padding: 0px;
                                      background-color: transparent;
                                      .iconSet{
                                        font-size: 24px;
                                      }
                                    }
                                    .addBtnSet{
                                      top: 30%;
                                    }
                                    .subBtnSet{
                                      top: 75%;
                                    }
                                  }
                                  //按鈕區
                                }
                                //input整體設定
                              }
                              //自訂義input群組(帶按鈕)
                              `
                          )
                        }       
                    </code>
                </pre>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    </>
  );
};

