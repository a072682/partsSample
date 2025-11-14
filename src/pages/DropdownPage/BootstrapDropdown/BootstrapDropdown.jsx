


export default function BootstrapDropdown() {
  return (
    <div className="container my-5">
      <h4 className="my-4">Bootstrap 5 預設Dropdown</h4>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton01"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          選擇項目
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton01">
          <li><a className="dropdown-item" href="#">選項一</a></li>
          <li><a className="dropdown-item" href="#">選項二</a></li>
          <li><a className="dropdown-item" href="#">選項三</a></li>
        </ul>
      </div>
    </div>
  );
}


// import { useEffect, useRef } from 'react';
// import { Dropdown as BsDropdown } from 'bootstrap'; // ← JS 類別

// export default function BootstrapDropdown() {
//   const btnRef = useRef(null);
//   const instRef = useRef(null);

//   useEffect(() => {
//     if (btnRef.current) {
//       instRef.current = new BsDropdown(btnRef.current); // 建立實例
//     }
//     return () => {
//       instRef.current?.dispose?.(); // 清理
//       instRef.current = null;
//     };
//   }, []);

//   const handleClick = (e) => {
//     e.preventDefault(); // 防止在表單裡誤送出
//     instRef.current?.toggle(); // ← 直接切換（會加/移除 .show）
//   };

//   return (
//     <div className="container my-5">
//       <h4 className="my-4">Bootstrap 5 Dropdown（手動 toggle 版）</h4>

//       <div className="dropdown">
//         <button
//           ref={btnRef}
//           type="button"
//           className="btn btn-secondary dropdown-toggle"
//           onClick={handleClick}             // ← 手動觸發
//           aria-expanded="false"
//         >
//           選擇項目
//         </button>

//         <ul className="dropdown-menu">
//           <li><a className="dropdown-item" href="#">選項一</a></li>
//           <li><a className="dropdown-item" href="#">選項二</a></li>
//           <li><a className="dropdown-item" href="#">選項三</a></li>
//         </ul>
//       </div>
//     </div>
//   );
// }



  