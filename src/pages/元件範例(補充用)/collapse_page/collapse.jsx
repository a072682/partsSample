import OriginalCollapse from "./original_collapse/original_collapse";
import ReactBsCollapse from "./react_bs_collapse/react_bs_collapse";







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
