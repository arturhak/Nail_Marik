import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {translationEN} from "./translationEN";
import {translationAM} from "./translationAM";

const resources = {
    EN: {
        translation: translationEN
    },
    AM: {
        translation: translationAM
    }
};

const defaultLanguage:any = localStorage.getItem("selectedLanguage")

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: defaultLanguage,
        fallbackLng: 'EN',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
