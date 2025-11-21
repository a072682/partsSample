


import OriginalAccordion from "./OriginalAccordion/OriginalAccordion";
import ReactBsAccordion from "./ReactBsAccordion/ReactBsAccordion";

export default function Accordion() {
  return (
    <div className="container">
      <h1>Accordion</h1>

      {/* <section className="">
        <OriginalAccordion />
      </section>

      <hr /> */}

      <section className="">
        <ReactBsAccordion />
      </section>

    </div>
  );
}
