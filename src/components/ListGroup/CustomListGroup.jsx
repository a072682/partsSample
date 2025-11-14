import './CustomListGroup.css';

export default function CustomListGroup() {
  const items = ["通知中心", "好友請求", "系統公告", "設定選項"];

  return (
    <ul className="custom-list-group">
      {items.map((item, index) => (
        <li key={index} className="custom-list-item">
          <span className="custom-icon">🔔</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
