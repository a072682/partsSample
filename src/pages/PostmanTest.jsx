

export default function PostmanTest() {
  return (
    <div className="container">
        <div className="title-box">
            <h2>Postman測試 & 設定</h2>
        </div>
        <p>在登錄會員後會進入到使用頁面</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} src="/images/postman/PostmanTest-1.png" alt="" />
        </div>
        <p>先點擊+號會跳出選單</p>
        <p>點擊選單的第一個選項</p>
        <p>意思是創建一個新的測試類別</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} src="/images/postman/PostmanTest-2.png" alt="" />
        </div>
        <p>點擊新類別標題右側的...標誌</p>
        <p>選擇第一個選項</p>
        <p>會創建一個新的測試單元</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} src="/images/postman/PostmanTest-3.png" alt="" />
        </div>
        <p>通常會先更改名子，可自由取名</p>
        <p>接著選擇要測試的類別以及API來源</p>
        <p>如果是post/put等需要寫入資料的話記得要點選raw以及JSON格式</p>
        <p>最後點擊Send即可確認結果</p>
    </div>
  );
}
