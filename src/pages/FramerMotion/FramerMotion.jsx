import DefaultExample from "./基本範例/DefaultExample";
import TriggerBoxAnimation from "./指定容器觸發範例/TriggerBoxAnimation";
import Test from "./測試/test";
import TriggerEnterAnimation from "./進場立即觸發/TriggerEnterAnimation";


export default function FramerMotion() {

    return (
        <div className="container">
            <h2>FramerMotion說明</h2>
            <br />
            <h3>基本預設範例</h3>
            <DefaultExample />
            <hr />
            <h3>進場立即觸發範例</h3>
            <TriggerEnterAnimation />
            <hr />
            <h3>指定容器觸發範例</h3>
            <TriggerBoxAnimation />
            <hr />
            <h3>測試</h3>
            <Test />
        </div>
  );
}
