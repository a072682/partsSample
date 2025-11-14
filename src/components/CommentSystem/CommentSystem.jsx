import React, { useState } from 'react';

function CommentSystem() {
  const [comment, setComment] = useState('');
  //用來記錄目前在「留言輸入框」中的文字內容。
  const [commentsList, setCommentsList] = useState([]);
  //用來儲存所有留言的陣列，每個留言是一個物件。

  // 假設固定使用者資料
  const user = {
    name: 'Andy',
    avatar: `https://i.pravatar.cc/40?img=5`, // 隨機頭像 (固定 id=5)
  };

  // 處理送出留言
  const handleSubmit = () => {
    if (comment.trim() === '')
    //.trim() 是 JavaScript 字串（String）的方法，用來移除字串開頭和結尾的空白字元
    //  "   Hello World!   " => "Hello World!"
    //如果流言(comment)去除頭尾空白以後是空白的話則跳出程序
        return;
    

    const newComment = {
      id: Date.now(),
      name: user.name,
      avatar: user.avatar,
      text: comment,
    };
    //宣告新留言

    setCommentsList([newComment, ...commentsList]); // 新留言放最上面
    //將新留言寫入List中
    //...commentsList為壓縮list的寫法
    setComment(''); // 清空輸入欄
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h2>留言板</h2>

      {/* 留言輸入區 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        <img src={user.avatar} alt="avatar" style={{ borderRadius: '50%' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{user.name}</div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="請留下留言"
            style={{ width: '100%', height: '80px', padding: '8px' }}
          ></textarea>
        </div>
      </div>

      <button onClick={handleSubmit} style={{ padding: '8px 16px' }}>
        送出留言
      </button>

      <hr />

      {/* 留言列表 */}
      <div>
        {commentsList.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <img src={item.avatar} alt="avatar" style={{ borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSystem;
