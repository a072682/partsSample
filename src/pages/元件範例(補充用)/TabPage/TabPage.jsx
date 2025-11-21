import BootstrapTabs from "./BootstrapTabs/BootstrapTabs";
import ReactTab from "../../常用元件範例/TabPage/ReactTab分頁元件/ReactTab";


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
