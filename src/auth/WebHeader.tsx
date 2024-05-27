import React from "react";
import headerLogo from "../assets/header_logo-web.svg"
import MainButton from "../buttons/MainButton";

function WebHeader ({headerData,navigate}:any) {

    const handleNavigate = (index:number) => {
        switch (index) {
            case 0:
                navigate("./about")
                break;
            case 1:
                navigate("./services")
                break;
            case 2:
                navigate("./contact")
                break;

            default:
                navigate("./error")
        }
    }

    const bookNow = () => {
        navigate("./book")
    }

    return (
        <div className="web_header">
            <div className="left_block">
                {headerData.map((nav:any,index: any) => {
                    return <div
                        className="nav_item"
                        key={index}
                        onClick={()=>handleNavigate(index)}
                    >
                        {nav.title}
                    </div>
                })}
            </div>
            <div className="center_block">
                <img src={headerLogo} alt="headerLogo" onClick={()=>navigate("/")}/>
            </div>
            <div className='right_block'>
                <MainButton
                    text="Book Now"
                    func={bookNow}
                />
                <div className="translate_block">
                    <div className="language_item">EN</div>
                    <div className="line"></div>
                    <div className="language_item">ՀԱՅ</div>
                </div>
            </div>

        </div>
    )
}

export default WebHeader