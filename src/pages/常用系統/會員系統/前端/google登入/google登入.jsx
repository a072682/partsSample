
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function GOOGLE登入() {

    //#region
    //#endregion

    //#region GOOGLE登入函式
    const handleGoogleLogin = () => {
    //直接讓瀏覽器跳轉
        window.location.href = 'http://localhost:5100/google/login';
    };
    //#endregion

    return (
        <>
            <div className='GOOGLE登入API'>
                <h4>GOOGLE登入API</h4>
                <button type='button'
                        onClick={()=>{handleGoogleLogin()}}>
                    GOOGLE登入
                </button>
                <br />
                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {   
                            dedent(`
                                //#region GOOGLE登入函式
                                const handleGoogleLogin = () => {
                                //直接讓瀏覽器跳轉
                                    window.location.href = 'http://localhost:5100/google/login';
                                };
                                //#endregion
                            `)   
                        }       
                    </code>
                </pre>
            </div>
        </>
    );
  }
          
        