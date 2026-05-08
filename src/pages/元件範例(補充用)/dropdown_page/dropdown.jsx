
import CustomDropdown from "./custom_dropdown/custom_dropdown";
import ReactCustomDropdown from "../../常用元件範例/dropdown_page/react_custom_dropdown/react_custom_dropdown";




export default function Dropdown() {
  return (
    <div className="container">
      {/* <h1>Dropdown</h1>

      <section className="">
        <CustomDropdown />
      </section>

      <hr /> */}

      <section className="">
        <h4>ReactDropdown(優先使用)</h4>
        <ReactCustomDropdown />
      </section>

    </div>
  );
}
