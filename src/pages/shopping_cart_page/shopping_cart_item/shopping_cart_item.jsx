import { useEffect, useMemo, useRef, useState } from 'react';
import './_ShoppingCartItem.scss';
import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function ShoppingCartItem() {

  // 1) 假資料（你之後可換成 Redux/props/後端資料）
  const [items, setItems] = useState([
    { id: 'p-1', title: '迷你耳機', img: 'https://via.placeholder.com/80x80?text=P1', price: 1290 },
    { id: 'p-2', title: '運動水瓶', img: 'https://via.placeholder.com/80x80?text=P2', price: 490 },
    { id: 'p-3', title: '藍牙喇叭', img: 'https://via.placeholder.com/80x80?text=P3', price: 2190 },
  ]);

  // 2) 勾選的商品 id 清單
  //被勾選商品的 id 會放進這個陣列
  const [selectedIds, setSelectedIds] = useState([]);

  // 3) 衍生狀態
  //對items進行.map陣列展開內容為內容的id內容
  //以結果來說把這個資料
  // const items = [
  //     { id: 'p-1', title: '迷你耳機', price: 1290 },
  //     { id: 'p-2', title: '運動水瓶', price: 490 },
  //     { id: 'p-3', title: '藍牙喇叭', price: 2190 },
  // ];轉換為
  // const allIds = ['p-1', 'p-2', 'p-3'];
  const allIds =  useMemo(() =>   items.map((item) => {
                                    return item.id;
                                  }), 
                  [items]);

  //如果items矩陣長度大於0且selectedIds長度相等的話則為true
  //items.length > 0：清單要「有商品」。
  //selectedIds.length === items.length：已選數量要「等於總數量」
  //兩者都成立才會是 true
  //全選狀態
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  //如果selectedIds矩陣長度大於0且items長度大於selectedIds的長度則為true
  //selectedIds.length > 0：有點選商品。
  //兩者都成立才會是 true
  //半選狀態
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

  // 4) 半選（indeterminate）效果
  const selectAllRef = useRef(null);
  //只要 isIndeterminate 改變，就執行一次。
  useEffect(() => {
    if (selectAllRef.current) {
        //selectAllRef.current.indeterminate為一種顯示「半選」(mixed) 的視覺狀態
        selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  // 5) 切換「全選」
  const toggleSelectAll = () => {
    //item.length === items.length 確認是否全選
    setSelectedIds(item => (item.length === items.length ? [] : allIds));
  };

  // 6) 切換「單一商品」
  const toggleSelectOne = (id) => {
    setSelectedIds(item =>
        //prev.includes(id) 若目前陣列裡已經有這個 id（表示已勾選）
        //prev.filter(item => item !== id) → 取消勾選：將該id移除陣列
        //[...prev, id] → 勾選：該 id 加入陣列
        item.includes(id) ? item.filter(item => item !== id) : [...item, id]
    );
  };

  // 7) 刪除單一商品（順便把勾選移除）
  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setSelectedIds(prev => prev.filter(x => x !== id));
  };

  // 8) 小計（僅計算已勾選）
  const selectedItems = useMemo(
    () => items.filter(i => selectedIds.includes(i.id)),
    [items, selectedIds]
  );
  const total = useMemo(
    () => selectedItems.reduce((sum, i) => sum + i.price, 0),
    [selectedItems]
  );

  return (
    <div className="ShoppingCartItem">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="shopping-cart">

                <h3>空產品頁面</h3>
                <div className="noProduct">
                    <img src="https://via.placeholder.com/160x120?text=No+Items" alt="想放入想放的圖片" />
                    <p>購物車還沒有商品，立即逛逛！</p>
                    <button>前往首頁</button>
                </div>


                <h3>購物車資訊頁面</h3>
                {/* 購物車元件最外框 */}
                <div className="form-check">

                    {/* 全選區塊外框 */}
                    <div className="item-all">
                        {/* 全選選項 */}
                        <input
                          ref={selectAllRef}
                          type="checkbox"
                          className="form-check-input"
                          id="selectAll"
                          checked={isAllSelected}
                          onChange={toggleSelectAll}
                        />
                        {/* 全選選項 */}
                        {/* 全選選項文字 */}
                        <label className="form-check-label" htmlFor="selectAll">
                          全選（已選 {selectedIds.length}/{items.length}）
                        </label>
                        {/* 全選選項文字 */}
                    </div>

                    {/* 桌面板商品列表外框 */}
                    <div className="product-item-container d-none d-lg-block">
                      {
                          items.map(product => (
                              /* 商品選項外框 */
                              <div className="product-item d-flex justify-content-between" key={product.id}>
                                  {/* 選項外框 */}
                                  <div className="input-box">
                                    {/* 選項本體 */}
                                    <input
                                        type="checkbox"
                                        className="product-input"
                                        id={`product-${product.id}`}
                                        checked={selectedIds.includes(product.id)}
                                        onChange={() => toggleSelectOne(product.id)}
                                    />
                                    {/* 選項本體 */}
                                  </div>
                                  {/* 選項外框 */}

                                  {/* 商品選項資訊外框 */}
                                  <div className="img-box">
                                    {/* 商品照片 */}
                                    <img src={product.img} alt={product.title} />
                                    {/* 商品照片 */}

                                    {/* 商品名稱 */}
                                    <p>{product.title}</p>
                                    {/* 商品名稱 */}
                                  </div>
                                  {/* 商品選項資訊外框 */}

                                  {/* 商品敘述外框 */}
                                  <div className="price-box">
                                    {/* 商品敘述 */}
                                    <p className="price-text">NT$ {product.price.toLocaleString()}</p>
                                    {/* 商品敘述 */}
                                  </div>
                                  {/* 商品敘述外框 */}

                                  {/* 商品選項刪除按鈕外框 */}
                                  <div className="btn-box">
                                    {/* 刪除按鈕本體 */}
                                    <button type="button" className="product-btn" onClick={() => handleDelete(product.id)}>
                                        刪除
                                    </button>
                                    {/* 刪除按鈕本體 */}
                                  </div>
                                  {/* 商品選項刪除按鈕外框 */}
                              </div>
                              /* 商品選項外框 */
                          ))
                      }
                    </div>
                    {/* 桌面板商品列表外框 */}

                    {/* ✅ 手機列表 */}
                    <div className="product-item-mb-container d-block d-lg-none">
                      {items.map(product => (
                        <div className="product-mb-item" key={product.id}>
                          <input
                            type="checkbox"
                            className="product-mb-input"
                            id={`product-mb-${product.id}`}
                            checked={selectedIds.includes(product.id)}
                            onChange={() => toggleSelectOne(product.id)}
                          />
                          <div className="product-box">
                            <div className="img-box">
                              <img src={product.img} alt={product.title} />
                              <p>{product.title}</p>
                            </div>
                            <div className="price-box">
                              <p className="price-text">NT$ {product.price.toLocaleString()}</p>
                            </div>
                            <div className="btn-box">
                              <button type="button" className="product-btn" onClick={() => handleDelete(product.id)}>
                                刪除
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ✅ 小計區 */}
                    <div className="summary mt-3">
                      <div>已選商品：{selectedItems.length} 件</div>
                      <div>小計：NT$ {total.toLocaleString()}</div>
                    </div>
                </div>
                {/* 購物車元件最外框 */}

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
                                          import { useEffect, useMemo, useRef, useState } from 'react';//宣告狀態
                                          import './_ShoppingCartItem.scss';//讀取樣式

                                          // 設定檔放置於return上方
                                            // 1) 假資料（你之後可換成 Redux/props/後端資料）
                                            const [items, setItems] = useState([
                                              { id: 'p-1', title: '迷你耳機', img: 'https://via.placeholder.com/80x80?text=P1', price: 1290 },
                                              { id: 'p-2', title: '運動水瓶', img: 'https://via.placeholder.com/80x80?text=P2', price: 490 },
                                              { id: 'p-3', title: '藍牙喇叭', img: 'https://via.placeholder.com/80x80?text=P3', price: 2190 },
                                            ]);

                                            // 2) 勾選的商品 id 清單
                                            //被勾選商品的 id 會放進這個陣列
                                            const [selectedIds, setSelectedIds] = useState([]);

                                            // 3) 衍生狀態
                                            //對items進行.map陣列展開內容為內容的id內容
                                            //以結果來說把這個資料
                                            // const items = [
                                            //     { id: 'p-1', title: '迷你耳機', price: 1290 },
                                            //     { id: 'p-2', title: '運動水瓶', price: 490 },
                                            //     { id: 'p-3', title: '藍牙喇叭', price: 2190 },
                                            // ];轉換為
                                            // const allIds = ['p-1', 'p-2', 'p-3'];
                                            const allIds =  useMemo(() =>   items.map((item) => {
                                                                              return item.id;
                                                                            }), 
                                                            [items]);

                                            //如果items矩陣長度大於0且selectedIds長度相等的話則為true
                                            //items.length > 0：清單要「有商品」。
                                            //selectedIds.length === items.length：已選數量要「等於總數量」
                                            //兩者都成立才會是 true
                                            //全選狀態
                                            const isAllSelected = items.length > 0 && selectedIds.length === items.length;

                                            //如果selectedIds矩陣長度大於0且items長度大於selectedIds的長度則為true
                                            //selectedIds.length > 0：有點選商品。
                                            //兩者都成立才會是 true
                                            //半選狀態
                                            const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

                                            // 4) 半選（indeterminate）效果
                                            const selectAllRef = useRef(null);
                                            //只要 isIndeterminate 改變，就執行一次。
                                            useEffect(() => {
                                              if (selectAllRef.current) {
                                                  //selectAllRef.current.indeterminate為一種顯示「半選」(mixed) 的視覺狀態
                                                  selectAllRef.current.indeterminate = isIndeterminate;
                                              }
                                            }, [isIndeterminate]);

                                            // 5) 切換「全選」
                                            const toggleSelectAll = () => {
                                              //item.length === items.length 確認是否全選
                                              setSelectedIds(item => (item.length === items.length ? [] : allIds));
                                            };

                                            // 6) 切換「單一商品」
                                            const toggleSelectOne = (id) => {
                                              setSelectedIds(item =>
                                                  //prev.includes(id) 若目前陣列裡已經有這個 id（表示已勾選）
                                                  //prev.filter(item => item !== id) → 取消勾選：將該id移除陣列
                                                  //[...prev, id] → 勾選：該 id 加入陣列
                                                  item.includes(id) ? item.filter(item => item !== id) : [...item, id]
                                              );
                                            };

                                            // 7) 刪除單一商品（順便把勾選移除）
                                            const handleDelete = (id) => {
                                              setItems(prev => prev.filter(i => i.id !== id));
                                              setSelectedIds(prev => prev.filter(x => x !== id));
                                            };

                                            // 8) 小計（僅計算已勾選）
                                            const selectedItems = useMemo(
                                              () => items.filter(i => selectedIds.includes(i.id)),
                                              [items, selectedIds]
                                            );
                                            const total = useMemo(
                                              () => selectedItems.reduce((sum, i) => sum + i.price, 0),
                                              [selectedItems]
                                            );

                                          // 元件本體
                                          // 放置於return下方
                                          {/* 購物車元件最外框 */}
                                          <div className="form-check">

                                              {/* 全選區塊外框 */}
                                              <div className="item-all">
                                                  {/* 全選選項 */}
                                                  <input
                                                    ref={selectAllRef}
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="selectAll"
                                                    checked={isAllSelected}
                                                    onChange={toggleSelectAll}
                                                  />
                                                  {/* 全選選項 */}
                                                  {/* 全選選項文字 */}
                                                  <label className="form-check-label" htmlFor="selectAll">
                                                    全選（已選 {selectedIds.length}/{items.length}）
                                                  </label>
                                                  {/* 全選選項文字 */}
                                              </div>

                                              {/* 桌面板商品列表外框 */}
                                              <div className="product-item-container d-none d-lg-block">
                                                {
                                                    items.map(product => (
                                                        /* 商品選項外框 */
                                                        <div className="product-item d-flex justify-content-between" key={product.id}>
                                                            {/* 選項外框 */}
                                                            <div className="input-box">
                                                              {/* 選項本體 */}
                                                              <input
                                                                  type="checkbox"
                                                                  className="product-input"
                                                                  id={\`product-\${product.id}\`}
                                                                  checked={selectedIds.includes(product.id)}
                                                                  onChange={() => toggleSelectOne(product.id)}
                                                              />
                                                              {/* 選項本體 */}
                                                            </div>
                                                            {/* 選項外框 */}

                                                            {/* 商品選項資訊外框 */}
                                                            <div className="img-box">
                                                              {/* 商品照片 */}
                                                              <img src={product.img} alt={product.title} />
                                                              {/* 商品照片 */}

                                                              {/* 商品名稱 */}
                                                              <p>{product.title}</p>
                                                              {/* 商品名稱 */}
                                                            </div>
                                                            {/* 商品選項資訊外框 */}

                                                            {/* 商品敘述外框 */}
                                                            <div className="price-box">
                                                              {/* 商品敘述 */}
                                                              <p className="price-text">NT$ {product.price.toLocaleString()}</p>
                                                              {/* 商品敘述 */}
                                                            </div>
                                                            {/* 商品敘述外框 */}

                                                            {/* 商品選項刪除按鈕外框 */}
                                                            <div className="btn-box">
                                                              {/* 刪除按鈕本體 */}
                                                              <button type="button" className="product-btn" onClick={() => handleDelete(product.id)}>
                                                                  刪除
                                                              </button>
                                                              {/* 刪除按鈕本體 */}
                                                            </div>
                                                            {/* 商品選項刪除按鈕外框 */}
                                                        </div>
                                                        /* 商品選項外框 */
                                                    ))
                                                }
                                              </div>
                                              {/* 桌面板商品列表外框 */}

                                              {/* ✅ 手機列表 */}
                                              <div className="product-item-mb-container d-block d-lg-none">
                                                {items.map(product => (
                                                  <div className="product-mb-item" key={product.id}>
                                                    <input
                                                      type="checkbox"
                                                      className="product-mb-input"
                                                      id={\`product-mb-\${product.id}\`}
                                                      checked={selectedIds.includes(product.id)}
                                                      onChange={() => toggleSelectOne(product.id)}
                                                    />
                                                    <div className="product-box">
                                                      <div className="img-box">
                                                        <img src={product.img} alt={product.title} />
                                                        <p>{product.title}</p>
                                                      </div>
                                                      <div className="price-box">
                                                        <p className="price-text">NT$ {product.price.toLocaleString()}</p>
                                                      </div>
                                                      <div className="btn-box">
                                                        <button type="button" className="product-btn" onClick={() => handleDelete(product.id)}>
                                                          刪除
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>

                                              {/* ✅ 小計區 */}
                                              <div className="summary mt-3">
                                                <div>已選商品：{selectedItems.length} 件</div>
                                                <div>小計：NT$ {total.toLocaleString()}</div>
                                              </div>
                                          </div>
                                          {/* 購物車元件最外框 */}
                                          `
                                      )
                                    }       
                                </code>
                            </pre>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
