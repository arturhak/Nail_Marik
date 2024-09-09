import React from "react";
import MainButton from "../buttons/MainButton";
import {useNavigate} from "react-router";

function Error () {
    const navigate = useNavigate()

    const handleHomepage = () => {
        navigate("/")
    }
    return (
        <div className="error">
            <div className="error-404">404</div>
            <div className="error-text">OOOPS! PAGE NOT FOUND</div>
            <MainButton
                text="Return Homepage"
                width={true}
                func={handleHomepage}
            />
        </div>
    )
}

export default Error