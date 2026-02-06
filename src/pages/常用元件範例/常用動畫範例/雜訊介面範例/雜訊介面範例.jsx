
import './_雜訊介面範例.scss';


export default function 雜訊介面範例() {

    return (
        <article className='雜訊介面範例'>
            <h3>雜訊介面範例</h3>
            {/* 元件最外圍 */}
            <div className="BGset mt-24">
                <div className="videoSet">
                    <video
                        className="bgVideo"
                        autoPlay //載入後自動播放（行動裝置要搭配 muted 才會生效）
                        muted //把影片靜音（多數瀏覽器要求靜音才允許自動播放）
                        loop //播完自動重頭再播
                        playsInline //在手機上「行內播放」，不會跳全螢幕
                        preload="auto" //盡量預先載入影片（加快開始播放的速度）
                        poster="" //影片尚未播放或載入時顯示的封面圖
                    >
                        <source src="/images/動畫/背景動畫/nte_pmain_20250514.mp4" type="video/mp4" />
                            您的瀏覽器不支援影片
                    </video>
                </div>

                <div className="content">
                    {/* 前景內容放這裡 */}
                    <p className='textSet'>前景內容</p>
                </div>
            </div>
            {/* 元件最外圍 */}
        </article>
    );
}


