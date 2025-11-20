
import CustomDropdown from "./CustomDropdown/CustomDropdown";
import ReactCustomDropdown from "./ReactCustomDropdown/ReactCustomDropdown";




export default function Dropdown() {
  return (
    <div className="container">
      <h1>Dropdown</h1>

      <section className="">
        <CustomDropdown />
      </section>

      <hr />

      <section className="">
        <h4>ReactDropdown(優先使用)</h4>
        <ReactCustomDropdown />
      </section>

    </div>
  );
}
