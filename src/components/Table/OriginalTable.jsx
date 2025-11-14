


export default function OriginalTable() {
    return (
      <div className="container mt-4">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>姓名</th>
              <th>Email</th>
              <th>角色</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>王小明</td>
              <td>ming@example.com</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>2</td>
              <td>林小美</td>
              <td>mei@example.com</td>
              <td>User</td>
            </tr>
            <tr>
              <td>3</td>
              <td>李大華</td>
              <td>hua@example.com</td>
              <td>Editor</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  