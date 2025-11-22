import { useEffect, useMemo, useRef, useState } from 'react';
import './_CustomInputGroup.scss';
import { Collapse } from 'react-bootstrap';

export default function CustomInputGroup() {

    //#region
    //#endregion

        //#region 復數資料勾選input設定
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
            const allIds = useMemo(() => items.map((item) => {return(item.id)}), [items]);
        
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
                    //prev.filter(x => x !== id) → 取消勾選：將該id移除陣列
                    //[...prev, id] → 勾選：該 id 加入陣列
                    item.includes(id) ? item.filter(x => x !== id) : [...item, id]
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
        //#endregion



        

    return (

        <div className="container">
            <div className='row'>
                <div className='col'>
                    <div className="ShoppingCartItem">
                        <div className="shopping-cart">
                            <h3>購物車資訊頁面</h3>
                            <div className="form-check">
                            {/* 資訊頁面整體區塊 */}

                            {/* ✅ 全選 */}
                            <div className="item-all">
                                <input
                                ref={selectAllRef}
                                type="checkbox"
                                className="form-check-input"
                                id="selectAll"
                                checked={isAllSelected}
                                onChange={toggleSelectAll}
                                />
                                <label className="form-check-label" htmlFor="selectAll">
                                全選（已選 {selectedIds.length}/{items.length}）
                                </label>
                            </div>

                            {/* ✅ 桌機列表 */}
                            <div className="product-item-container d-none d-lg-block">
                                {
                                    items.map(product => (
                                        <div className="product-item d-flex justify-content-between" key={product.id}>
                                            <div className="input-box">
                                            <input
                                                type="checkbox"
                                                className="product-input"
                                                id={`product-${product.id}`}
                                                checked={selectedIds.includes(product.id)}
                                                onChange={() => toggleSelectOne(product.id)}
                                            />
                                            </div>

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
                                    ))
                                }
                            </div>

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
                        
                        </div> 
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    
                </div>
            </div>
            <div className='row'>
                <div className='col'>

                </div>
            </div>
        </div>
    );
  }
          
        