import './CustomForm.css';
import { useState } from 'react';

export default function CustomForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
    agree: false,
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`送出成功：\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <h3 className="mb-3">聯絡表單</h3>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">姓名</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="role" className="form-label">角色</label>
        <select
          className="form-select"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">請選擇</option>
          <option value="admin">管理員</option>
          <option value="user">使用者</option>
          <option value="editor">編輯者</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">留言</label>
        <textarea
          className="form-control"
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="agree"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="agree">
          我同意條款與隱私政策
        </label>
      </div>

      <div className="mb-3">
        <label className="form-label me-3">性別：</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="male">男性</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="female">女性</label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">送出</button>
    </form>
  );
}
