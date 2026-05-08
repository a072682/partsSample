import BootstrapTabs from "./bootstrap_tabs/bootstrap_tabs";
import ReactTab from "../../常用元件範例/tab_page/ReactTab分頁元件/react_tab";


export default function TabPage() {

  return (
    <div className="container">
      <h1>Tab分頁元件</h1>

      <section className="">
        <h4>原始Tab分頁元件</h4>
        <BootstrapTabs />

        
      </section>

      <hr />

      <section className="">
        <h4>ReactTab分頁元件(常用)</h4>
        <ReactTab />
      </section>
    </div>
  );
}
