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
                        <Link to="/基礎框架教學" className='item'>
                            <p className='text'>網站基礎框架教學</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/常用元件範例" className='item'>
                        <p className='text'>常用元件範例</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/常用系統範例" className='item'>
                        <p className='text'>常用系統範例</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/RenderServerUpLoad" className='item'>
                        <p className='text'>常用JS函式</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/伺服器雲端上傳" className='item'>
                        <p className='text'>伺服器</p>
                        <p className='text'>上傳 & 設定</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/資料庫雲端上傳" className='item'>
                        <p className='text'>資料庫</p>
                        <p className='text'>上傳 & 設定</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/RenderDataBaseUpLoad" className='item'>
                        <p className='text'>其他套件</p>
                        <p className='text'>教學 & 設定</p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemV}>
                        <Link to="/RenderDataBaseUpLoad" className='item'>
                        <p className='text'>其他工具</p>
                        <p className='text'>教學 & 設定</p>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
            
        </>
    )
}
export default Header;