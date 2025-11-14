
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_Detail.scss';


export default function Detail() {



    return (
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <div className='detail-container'>
                        <div className='dk-header'>
                            <p>訂單明細</p>
                        </div>
                        <div className='detail'>
                            <p className='detail-text'>xxx 項課程小計</p>
                            <p className='detail-price'>NT$ xxx</p>
                        </div>    
                        <div className='total'>
                            <p className='total-text'>總計</p>
                            <p className='total-price'>NT$ xxx</p>
                        </div>
                        <div className='btn_text'>
                            <button typr="button">前往結帳</button>
                            <p className='caption-text'>確認購買即表示您已審閱 Learning 所提供之購物相關條款，並同意條款內容。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
