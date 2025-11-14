import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './_Header.scss';

function Header(){

    // 取得目前路徑；只要 pathname 改變，下面的 key 就會變
    const { pathname } = useLocation();

    //創造容器
    const containerV = {
        hidden: { opacity: 0 },     // 整體先透明
        show: {
            opacity: 1,               // 整體顯示
            transition: {
            delayChildren: 0.08,    // 第 1 個子項目延遲多少再開始
            staggerChildren: 0.06,  // 每個子項目的間隔（骨牌節奏）
            // 可選：staggerDirection: 1(正序) / -1(反序)
            // 可選：when: "beforeChildren" | "afterChildren"
            },
        },
    };

    // 子元素 variants
    const itemV = {
        hidden: { opacity: 0, x: -40 },
        show:   { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    };


    return(
        <>
            <motion.div
                key={pathname}                              // ← 路徑改變就重掛，動畫會重跑
                initial={{ opacity: 0, x: -40 }}            // 起始：淡出、往上 12px
                animate={{ opacity: 1, x: 0 }}              // 進場：淡入、歸位
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="header"
            >
                <motion.div
                    className="item-box"
                    variants={containerV}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={itemV}>
                        <Link to="/" className='item'>
                        <p className='text'>首頁</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/切版" className='item'>
                        <p className='text'>常用切版</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/WebInfrastructure" className='item'>
                        <p className='text'>網站基礎架構說明</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/animationCss" className='item'>
                        <p className='text'>CSS動畫說明</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/FramerMotion" className='item'>
                        <p className='text'>FramerMotion說明</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/ChartTest" className='item'>
                        <p className='text'>Chart套件</p>
                        <p className='text'>圖表套件測試</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/D3" className='item'>
                        <p className='text'>D3套件</p>
                        <p className='text'>圖表套件測試</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/Accordion" className='item'>
                        <p className='text'>Accordion</p>
                        <p className='text'>管風琴元件</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/Dropdown" className='item'>
                        <p className='text'>Dropdown</p>
                        <p className='text'>展開元件</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/Tab" className='item'>
                        <p className='text'>Tab</p>
                        <p className='text'>Tab分頁元件</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/Collapse" className='item'>
                        <p className='text'>Collapse</p>
                        <p className='text'>摺疊功能</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/CommentSystem" className='item'>
                        <p className='text'>CommentSystem</p>
                        <p className='text'>留言室組件</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/ShoppingCart" className='item'>
                        <p className='text'>ShoppingCart</p>
                        <p className='text'>購物車組件</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/Swiper" className='item'>
                        <p className='text'>Swiper</p>
                        <p className='text'>輪播功能</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/InputGroup" className='item'>
                        <p className='text'>InputGroup</p>
                        <p className='text'>輸入群組</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/PreCodePage" className='item'>
                        <p className='text'>Pre/Code</p>
                        <p className='text'>樣式 & 設定</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/DataBase" className='item'>
                        <p className='text'>資料庫和伺服器端基礎架構</p>
                        <p className='text'>創建 & 設定</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/ApiPage" className='item'>
                        <p className='text'>API</p>
                        <p className='text'>創建 & 設定</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/PostmanTest" className='item'>
                        <p className='text'>Postman測試</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/RenderServerUpLoad" className='item'>
                        <p className='text'>Render伺服器</p>
                        <p className='text'>上傳 & 設定</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/RenderDataBaseUpLoad" className='item'>
                        <p className='text'>Render資料庫</p>
                        <p className='text'>上傳 & 設定</p>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
            
        </>
    )
}
export default Header;