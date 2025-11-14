import './SearchContainer.css'; // 引入強化樣式

export default function SearchContainer() {
    return (
      <div class="search-container">
        <input type="text" class="search-input" placeholder="請輸入關鍵字" />
        <span class="search-icon material-symbols-outlined">search</span>
      </div>
    );
  }
  