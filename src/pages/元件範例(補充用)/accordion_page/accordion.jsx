


import OriginalAccordion from "./original_accordion/original_accordion";
import ReactBsAccordion from "./react_bs_accordion/react_bs_accordion";

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
