import { Accordion } from 'react-bootstrap';

import { useEffect, useState } from 'react';

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import DefaultAccordion from './DefaultAccordion/DefaultAccordion';
import CustomAccordion from './CustomAccordion/CustomAccordion';




function ReactBsAccordion() {

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  

  

  return (
    <div className="container my-5">
      {/* 預設樣式的 React-Bootstrap Accordion */}
      <h3 className='mt-24 mb-24'>元件型預設手風琴項目(react)</h3>
      <DefaultAccordion />


      <h3 className='mt-24 mb-24'>元件型客製化手風琴項目(react)優先使用</h3>
      <CustomAccordion />
      
      {/* <h3 className='mt-24 mb-24'>垂直型客製化手風琴項目</h3> */}

      {/* <hr /> */}

      {/* <h3 className='mt-24 mb-24'>垂直型客製化手風琴項目(圖片)</h3> */}
      
    </div>
  )
}

export default ReactBsAccordion;
