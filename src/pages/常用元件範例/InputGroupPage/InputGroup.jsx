
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import InputGroupExample from './InputGroupExample/InputGroupExample';
import CustomInputGroup from './CustomInputGroup/CustomInputGroup';


export default function InputGroup() {
  return (
    <div className="container">
        <div className='row'>
            <div className='col'>
                <h3>InputGroup範例</h3>
                <InputGroupExample />
                <CustomInputGroup />
            </div>
        </div>
    </div>
  );
}
