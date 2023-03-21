import { FC } from "react"
import data from '../pages/translation.json'

type Props = {
    text: string,
    lang: string
}

interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}

const translations: Translations = data;

const Text: FC<Props> = (props) => {

    let userLanguage = props.lang

    if (userLanguage.includes('en')) {
        userLanguage = 'en'
    } else if (userLanguage.includes('pl')) {
        userLanguage = 'pl'
    } else {
        userLanguage = 'en'
    }

    const translation = translations[props.text][userLanguage];

    return (
        <span>{(translation == undefined || translation.length == 0) ? "Error" : translation}</span>
    )
}

export default Text;
