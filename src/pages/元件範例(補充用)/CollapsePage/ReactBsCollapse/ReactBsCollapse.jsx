import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import './_ReactBsCollapse.scss';
import DefaultCollapse from './DefaultCollapse/DefaultCollapse';
import CustomCollapse from '../../../常用元件範例/CollapsePage/CustomCollapse/CustomCollapse';


export default function ReactBsCollapse() {
  

  

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  //
  const [visible, setVisible] = useState(false); // 控制 opacity
  const [open, setOpen] = useState(false);        // 控制 Collapse 高度
  //

  //
  const [horizontalOpen, setHorizontalOpen] = useState(false);

  const handleToggle = () => {
    if (visible) {
      setVisible(false);          // Step 1: 先讓透明度變0
      // setOpen(false);
      setTimeout(() => setOpen(false), 250);  
      // Step 2: 等0.4秒後再收高度
    } else {
      setOpen(true);               // 先展開高度
      setVisible(true);
      // setTimeout(() => setVisible(true), 10); 
      // 馬上設定顯示
    }
  };
  //

  return (
    <div className="container my-5">

      {/* 預設 Collapse */}
      {/* <div className="mb-5">
        <h4>Default-React-Collapse元件</h4>
        <DefaultCollapse />
      </div> */}

      {/* 客製化 Collapse */}
      <div className="mb-5 custom-collapse-container">
        <h4>客製化React-Collapse元件(優先使用)</h4>
        <CustomCollapse />
      </div>

      {/* 一次展開多個 Collapse */}
      {/* <div className="container my-5">
        <h3>React-Collapse元件相關測試</h3>
        <button onClick={() => setOpen1(!open1)} className="btn btn-primary m-2">
          展開/收合 第一個
        </button>
        <Collapse in={open1}>
          <div className="mt-2">
            <div className="card card-body">
              第一個內容
            </div>
          </div>
        </Collapse>

        <button onClick={() => setOpen2(!open2)} className="btn btn-secondary m-2">
          展開/收合 第二個
        </button>
        <Collapse in={open2}>
          <div className="mt-2">
            <div className="card card-body">
              第二個內容
            </div>
          </div>
        </Collapse>
      </div> */}

      {/* //淡出效果 */}
      {/* <div className="container my-5">
        <button
          className="btn btn-warning"
          onClick={handleToggle}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          客製化展開/收合（淡入淡出）
        </button>

        <Collapse in={open}>
          <div className={`custom-collapse-wrapper ${visible ? 'show' : 'hide'}`}>
            <div className="custom-collapse-content02">
              這是可以滾動的內容。<br/>
              這裡是淡入淡出的效果。<br/>
              很多很多很多很多文字...<br/>
              滾動滾動滾動...
            </div>
          </div>
        </Collapse>
      </div> */}

      {/* 垂直展開 */}
      {/* <div className="container my-5">
        <button className="btn btn-primary" onClick={() => setHorizontalOpen(!horizontalOpen)}>
          左右展開/收合
        </button>

        <div className="horizontal-collapse-wrapper">
          <div className={`horizontal-collapse-content ${horizontalOpen ? 'open' : ''}`}>
            <div className="collapse-inner-content">
              這是左右展開的內容喔！<br/>
              可以塞很多文字或圖片...<br/>
              可以自由滾動...
            </div>
          </div>
        </div>
      </div> */}

    </div>

    
  );
}
