import OriginalCollapse from "./OriginalCollapse/OriginalCollapse";
import ReactBsCollapse from "./ReactBsCollapse/ReactBsCollapse";







export default function CollapsePage() {
  return (
    <div className="container">
      <h1>摺疊功能</h1>

      <section className="">
        <OriginalCollapse />
      </section>

      <hr />

      <section className="">
        <ReactBsCollapse />
      </section>

    </div>
  );
}
