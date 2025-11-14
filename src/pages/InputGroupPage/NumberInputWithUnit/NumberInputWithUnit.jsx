

//#region自定義input(復數)設定
    // 初始 state
    //名稱要與id相同
    const [main3GroupDataState, setMain3GroupDataState] = useState({
        main3Group01: 10,
        main3Group02: 50,
        main3Group03: 10,
    });

    // 點加號的時候
    const handleIncrement = (id) => {
        if(id === "main3Group02"){
            setMain3GroupDataState(prev => ({
                ...prev,
                [id]: Math.min(prev[id] + 10, 50), // 限制上限 50
            }));
        }else{
            setMain3GroupDataState(prev => ({
                ...prev,
                [id]: Math.min(prev[id] + 1, 50), // 限制上限 50
            }));
        }
        
    };

    // 點減號的時候
    const handleDecrement = (id) => {
        if(id === "main3Group02"){
            setMain3GroupDataState(prev => ({
                ...prev,
                [id]: Math.max(prev[id] - 10, 0), // 限制下限 0
            }));
        }else{
            setMain3GroupDataState(prev => ({
                ...prev,
                [id]: Math.max(prev[id] - 1, 0), // 限制下限 0
            }));
        }
    };

    const main3GroupData = [
        {
            id:"main3Group01",
            labelTitle:"支撐材",
            unit:"mm",
        },
        {
            id:"main3Group02",
            labelTitle:"壁厚",
            unit:"%",
        },
        {
            id:"main3Group03",
            labelTitle:"支撐材密度",
            unit:"mm",
        },
    ]
//#endregion


import React from "react";

export default function NumberInputWithUnit ({ id, label, unit, value, step = 1, min = 0, max = 50, onChange }) {
  return (
    <div className="NumberInputWithUnit-input-box">
        
      <label htmlFor={id} className="label-set">
        {label}
      </label>

      <div className="NumberInputWithUnit-groupBody-box">
        {/* input主體 */}
        <input
          className="groupBody-set"
          type="text"
          id={id}
          value={`${value}${unit}`}
          onChange={(e) => {
            const num = parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
            onChange(Math.min(Math.max(num, min), max)); // 傳回父層更新
          }}
        />
        {/* input主體 */}
        {/* 按鈕區 */}
        <div className="group-btn-box">
          <button
            type="button"
            className="addBtn-set"
            onClick={() => onChange(Math.min(value + step, max))}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <button
            type="button"
            className="subBtn-set"
            onClick={() => onChange(Math.max(value - step, min))}
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>
        {/* 按鈕區 */}
      </div>
    </div>
  );
};

