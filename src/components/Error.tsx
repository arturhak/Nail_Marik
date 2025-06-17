import React from "react";
import MainButton from "../buttons/MainButton";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

function Error () {
    const navigate = useNavigate();
    const {t} = useTranslation()

    const handleHomepage = () => {
        navigate("/")
    }
    return (
        <div className="error">
            <div className="error-404">404</div>
            <div className="error-text">{t('OOOPS! PAGE NOT FOUND')}</div>
            <MainButton
                text="Return Homepage"
                width={true}
                func={handleHomepage}
            />
        </div>
    )
}

export default Error