import './CustomButton.css';

export default function ButtonExamples() {
    return (
      <div className="container mt-4" style={{ maxWidth: '700px' }}>
        <h4 className="mb-4">Bootstrap 按鈕範例</h4>
  
        {/* 🎨 色系按鈕 */}
        <div className="mb-4">
          <p>🎨 不同色系的按鈕</p>
          <button className="btn btn-primary me-2">Primary</button>
          <button className="btn btn-secondary me-2">Secondary</button>
          <button className="btn btn-success me-2">Success</button>
          <button className="btn btn-danger me-2">Danger</button>
          <button className="btn btn-warning me-2">Warning</button>
          <button className="btn btn-info me-2">Info</button>
          <button className="btn btn-light me-2">Light</button>
          <button className="btn btn-dark">Dark</button>
        </div>
  
        {/* 📏 不同尺寸按鈕 */}
        <div className="mb-4">
          <p>📏 按鈕尺寸</p>
          <button className="btn btn-primary btn-lg me-2">Large</button>
          <button className="btn btn-primary me-2">Default</button>
          <button className="btn btn-primary btn-sm">Small</button>
        </div>
  
        {/* ⭕ 輪廓按鈕 */}
        <div className="mb-4">
          <p>⭕ 輪廓按鈕（Outline Buttons）</p>
          <button className="btn btn-outline-primary me-2">Primary</button>
          <button className="btn btn-outline-success me-2">Success</button>
          <button className="btn btn-outline-danger">Danger</button>
        </div>
  
        {/* 🔳 區塊按鈕（full width） */}
        <div className="mb-4">
          <p>🔳 區塊按鈕（寬度 100%）</p>
          <button className="btn btn-warning w-100">全寬按鈕</button>
        </div>
  
        {/* 🔁 圖示按鈕（用 emoji or Bootstrap icon） */}
        <div className="mb-4">
          <p>🔁 加上圖示的按鈕</p>
          <button className="btn btn-success me-2">
            ✅ 確認
          </button>
          <button className="btn btn-danger">
            ❌ 取消
          </button>
        </div>
  
        {/* 🚫 Disabled 按鈕 */}
        <div className="mb-4">
          <p>🚫 Disabled 按鈕</p>
          <button className="btn btn-secondary me-2" disabled>無法點擊</button>
          <button className="btn btn-outline-danger" disabled>Disabled</button>
        </div>
  
        {/* 🧩 按鈕群組 */}
        <div className="mb-4">
          <p>🧩 Button Group</p>
          <div className="btn-group" role="group" aria-label="基本範例群組">
            <button type="button" className="btn btn-outline-primary">左</button>
            <button type="button" className="btn btn-outline-primary">中</button>
            <button type="button" className="btn btn-outline-primary">右</button>
          </div>
        </div>

        {/* 客製化按鈕 */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="custom-button">送出表單</button>
        </div>
      </div>
    );
  }
  