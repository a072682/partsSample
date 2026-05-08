
import { useEffect, useState } from 'react';
import './_testPage.scss';//引入指定樣式





export default function TestPage() {

    const handleWheel = (event) => {
        //deltaY等於滾動量 + 滾動方向
        //deltaY > 0  => 往下滾
        //deltaY < 0  => 往上滾
        if (event.deltaY > 0) {
        console.log("往下滾");
        } else {
        console.log("往上滾");
        }
    };

    const [test03,setTest03]=useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    useEffect(()=>{
        if(fadeOut){
            const timer = setTimeout(() => {
                setFadeOut(false);
                setTest03(false);
            }, 500); // ← 0.5 秒後執行
            return () => clearTimeout(timer); // ← 清除計時器
        }
    },[fadeOut])

    return (
        <>
            <div className='testPage'>
                <div className='box01'>
                    <div className='box02'>
                        <div className='box03'>
                            <img className='imgSet' src="/images/test/eggPet (1).png" alt="" />
                            <img className='imgSet02' src="/images/test/eggPet (1).png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div    className='test02'
                    onWheel={handleWheel}
            >
                <p>這個區塊內滾動滾輪會偵測到訊號</p>
            </div>
            <hr />
            <div className='test03'>
                <div className="loading-wrapper" onClick={()=>{setTest03(true);}}>
                    <div className={`basic ${fadeOut ? "fade-out" : ""}`}>
                        <div className={`fill ${test03 ? "active" : ""}`}
                            onAnimationEnd={() => setFadeOut(true)}
                        ></div>
                        <img className="img" src="/images/test/logo_nie_d4598f102.png"  />
                    </div>
                </div>
            </div>
        </>
    );
}
