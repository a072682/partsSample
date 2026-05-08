import { Link } from "react-router-dom";



export default function Index() {
  


  return (
    <div className="container">
      <h1>首頁</h1>
      <div className='測試連結'>
          <h4>測試連結</h4>
          <Link to="/常用元件範例?tab=輪播片" className='item'>測試</Link>
          <p>此連結會連接到常用元件範例中的輪播片內容</p>
          <Link to="/常用元件範例/VerticalSwiper?tab=測試02" className='item'>測試02</Link>
      </div>
    </div>
  );
}
