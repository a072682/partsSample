


import './_DefaultReact.scss';



export default function DefaultReact() {
  return (
    <div className="DefaultReact">
      <div className='container'> 
        <div className='row'>
          <div className='col'>
            <div className='imgBox my-24'>
              <img className='imgSet' src="/images/WebInfrastructure/DefaultReact/DefaultReact01.png" alt="" />    
            </div>
            <p>首先是安裝環境</p>
            <p className='fw-bold'>npm create vite@latest</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact02.png" alt="" />    
            </div>
            <p>詢問是否要開啟專案，請輸入y表示同意。</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact03.png" alt="" />    
            </div>
            <p>輸入專案資料夾名稱，這邊不管輸入大小寫都會轉為小寫。</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact04.png" alt="" />    
            </div>
            <p>選擇專案框架，選擇react。</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact05.png" alt="" />    
            </div>
            <p>選擇專案支援的語言，根據需求選擇，這邊選擇JavaScript</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact06.png" alt="" />    
            </div>
            <p>詢問是否要使用最新的仍「實驗性」的打包器，選擇no，使用穩定版。</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact07.png" alt="" />    
            </div>
            <p>詢問是否現在就要使用npm 安裝套件並啟動專案，選擇yes。</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact08.png" alt="" />    
            </div>
            <p>出現此畫面代表專案建立完成且運行成功</p>

            <h4 className='my-24'>專案建立完成後再安裝別的套件</h4>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact09.png" alt="" />    
            </div>
            <p>使用ctrl+c執行終止指令</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact10.png" alt="" />    
            </div>
            <p>如果需要手動跟改react版本的話需再安裝這個:</p>
            <p className='fw-bold'>npm install react@18.2.0 react-dom@18.2.0</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact11.png" alt="" />    
            </div>
            <p>axios 安裝</p>
            <p className='fw-bold'>npm i axios</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact12.png" alt="" />    
            </div>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact13.png" alt="" />    
            </div>
            <p>BS5安裝</p>
            <p className='fw-bold'>npm i bootstrap@5.3.3</p>
            <p className='fw-bold'>npm install react-bootstrap bootstrap</p>

            <h4 className='my-24'>移除多餘資料</h4>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact14.png" alt="" />    
            </div>
            <p className='fw-bold'>資料夾中的App.css/index.css以及main.jsx中的inport"./index.css"進行刪除</p>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact15.png" alt="" />    
            </div>
            <div className='imgBox my-24'>
              <img className='imgSet2' src="/images/WebInfrastructure/DefaultReact/DefaultReact16.png" alt="" />    
            </div>
            <p className='fw-bold'>也對App.jsx中的內容進行清除</p>
            <p className='fw-bold'>App.jsx本身可留下也可刪除看專案需求</p>
            react router
            Redux Toolkit
          </div>
        </div>
      </div>
    </div>
  );
}





