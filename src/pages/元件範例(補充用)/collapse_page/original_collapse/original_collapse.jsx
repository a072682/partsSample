import './_OriginalCollapse.scss';

export default function OriginalCollapse() {
  return (
    <div className="container my-5">
      
      {/* 預設 Collapse */}
      <div className="mb-5">
        <h3>預設 Collapse</h3>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#defaultCollapse"
          aria-expanded="false"
          aria-controls="defaultCollapse"
        >
          預設 Collapse
        </button>

        <div className="collapse mt-3" id="defaultCollapse">
            {/* 要預設開啟的話collapse後方加show */}
          <div className="card card-body">
            這是預設樣式的 Collapse 區塊。
          </div>
        </div>
      </div>

      {/* 客製化 Collapse */}
      <div className="mb-5 custom-collapse-container">
        <h3>客製化Collapse</h3>
        <button
          className="btn btn-warning custom-collapse-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#customCollapse"
          aria-expanded="false"
          aria-controls="customCollapse"
        >
          客製化展開/收合
        </button>

        <div className="collapse mt-3" id="customCollapse">
          <div className="custom-collapse-content">
            這是客製化樣式的 Collapse 區塊。
            <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />
            這是客製化樣式的 Collapse 區塊。
          </div>
        </div>
      </div>

    </div>
  );
}
