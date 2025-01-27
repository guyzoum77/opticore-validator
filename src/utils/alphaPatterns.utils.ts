export const alphaPatternsUtils: { [key: string]: RegExp } = {
    'ar': /^[\u0600-\u06FF\s]+$/, // Arabic
    'ar-AE': /^[\u0600-\u06FF\s]+$/, // Arabic (UAE)
    'ar-BH': /^[\u0600-\u06FF\s]+$/, // Arabic (Bahrain)
    'ar-DZ': /^[\u0600-\u06FF\s]+$/, // Arabic (Algeria)
    'ar-EG': /^[\u0600-\u06FF\s]+$/, // Arabic (Egypt)
    'ar-IQ': /^[\u0600-\u06FF\s]+$/, // Arabic (Iraq)
    'ar-JO': /^[\u0600-\u06FF\s]+$/, // Arabic (Jordan)
    'ar-KW': /^[\u0600-\u06FF\s]+$/, // Arabic (Kuwait)
    'ar-LB': /^[\u0600-\u06FF\s]+$/, // Arabic (Lebanon)
    'ar-LY': /^[\u0600-\u06FF\s]+$/, // Arabic (Libya)
    'ar-MA': /^[\u0600-\u06FF\s]+$/, // Arabic (Morocco)
    'ar-QA': /^[\u0600-\u06FF\s]+$/, // Arabic (Qatar)
    'ar-QM': /^[\u0600-\u06FF\s]+$/, // Arabic (QM)
    'ar-SA': /^[\u0600-\u06FF\s]+$/, // Arabic (Saudi Arabia)
    'ar-SD': /^[\u0600-\u06FF\s]+$/, // Arabic (Sudan)
    'ar-SY': /^[\u0600-\u06FF\s]+$/, // Arabic (Syria)
    'ar-TN': /^[\u0600-\u06FF\s]+$/, // Arabic (Tunisia)
    'ar-YE': /^[\u0600-\u06FF\s]+$/, // Arabic (Yemen)
    'bg-BG': /^[А-Яа-яЁё\s]+$/, // Bulgarian
    'bn': /^[ঀ-৿\s]+$/, // Bengali
    'cs-CZ': /^[A-Za-zÁáČčĎďÉéĚěÍíŇňÓóŘřŠšŤťÚúŮůÝýŽž\s]+$/, // Czech
    'da-DK': /^[A-Za-zÆæØøÅå\s]+$/, // Danish
    'de-DE': /^[A-Za-zÄäÖöÜüß\s]+$/, // German
    'el-GR': /^[Α-ω\s]+$/, // Greek
    'en-AU': /^[A-Za-z\s]+$/, // English (Australia)
    'en-GB': /^[A-Za-z\s]+$/, // English (United Kingdom)
    'en-HK': /^[A-Za-z\s]+$/, // English (Hong Kong)
    'en-IN': /^[A-Za-z\s]+$/, // English (India)
    'en-NZ': /^[A-Za-z\s]+$/, // English (New Zealand)
    'en-US': /^[A-Za-z\s]+$/, // English (United States)
    'en-ZA': /^[A-Za-z\s]+$/, // English (South Africa)
    'en-ZM': /^[A-Za-z\s]+$/, // English (Zambia)
    'eo': /^[A-Za-z\s]+$/, // Esperanto
    'es-ES': /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, // Spanish (Spain)
    'fa-IR': /^[\u0600-\u06FF\s]+$/, // Persian (Iran)
    'fi-FI': /^[A-Za-zÄäÖö\s]+$/, // Finnish
    'fr-CA': /^[A-Za-zÀàÂâÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü\s]+$/, // French (Canada)
    'fr-FR': /^[A-Za-zÀàÂâÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü\s]+$/, // French (France)
    'he': /^[א-ת\s]+$/, // Hebrew
    'hi-IN': /^[ऀ-ॿ\s]+$/, // Hindi (India)
    'hu-HU': /^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű\s]+$/, // Hungarian
    'it-IT': /^[A-Za-zÀàÉéÈèÍíÎîÒòÓóÚú\s]+$/, // Italian
    'kk-KZ': /^[А-Яа-яЁё\s]+$/, // Kazakh
    'ko-KR': /^[가-힣\s]+$/, // Korean
    'ja-JP': /^[ぁ-んァ-ン\s]+$/, // Japanese
    'ku-IQ': /^[\u0600-\u06FF\s]+$/, // Kurdish (Iraq)
    'nb-NO': /^[A-Za-zÆæØøÅå\s]+$/, // Norwegian Bokmål
    'nl-NL': /^[A-Za-zÁáÉéÍíÓóÚú\s]+$/, // Dutch (Netherlands)
    'nn-NO': /^[A-Za-zÆæØøÅå\s]+$/, // Norwegian Nynorsk
    'pl-PL': /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]+$/, // Polish
    'pt-BR': /^[A-Za-zÁáÂâÃãÀàÉéÊêÍíÓóÔôÕõÚúÜüÇç\s]+$/, // Portuguese (Brazil)
    'pt-PT': /^[A-Za-zÁáÂâÃãÀàÉéÊêÍíÓóÔôÕõÚúÜüÇç\s]+$/, // Portuguese (Portugal)
    'ru-RU': /^[А-Яа-яЁё\s]+$/, // Russian
    'si-LK': /^[\u0D80-\u0DFF\s]+$/, // Sinhala (Sri Lanka)
    'sl-SI': /^[A-Za-zČčĆćĐđŠšŽž\s]+$/, // Slovenian
    'sk-SK': /^[A-Za-zÁáÄäČčĎďÉéÍíĹĺĽľŇňÓóÔôŔŕŠšŤťÚúÝýŽž\s]+$/, // Slovak
    'sr-RS': /^[А-Яа-яЂђЋћЉљЊњЏџ\s]+$/, // Serbian (Cyrillic)
    'sr-RS@latin': /^[A-Za-zČčĆćĐđŠšŽž\s]+$/, // Serbian (Latin)
    'sv-SE': /^[A-Za-zÅåÄäÖö\s]+$/, // Swedish
    'th-TH': /^[ก-๙\s]+$/, // Thai
    'tr-TR': /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/, // Turkish
    'uk-UA': /^[А-ЩЬЮЯҐЄІЇа-щьюяґєії\s]+$/, // Ukrainian
};