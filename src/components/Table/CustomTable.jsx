

import './CustomTable.css';

export default function CustomTable() {
  const data = [
    { name: '王小明', email: 'ming@example.com', role: 'Admin' },
    { name: '林小美', email: 'mei@example.com', role: 'User' },
    { name: '李大華', email: 'hua@example.com', role: 'Editor' },
  ];

  return (
    <div className="custom-table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>姓名</th>
            <th>Email</th>
            <th>角色</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className='text-center' >{item.email}</td>
              <td className='text-end'>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
