import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";

function FrontLayout(){
    return(
        <>
            <div className="FrontLayout my-48">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <Header />
                        </div>
                        <div className="col-10">
                            <Outlet />
                        </div>
                    </div>  
                </div>
            </div>
        </>
    )
}
export default FrontLayout;