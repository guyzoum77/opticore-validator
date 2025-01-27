export const alphanumericPatternsUtils: { [key: string]: RegExp } = {
    'ar': /^[\u0600-\u06FF0-9\s]+$/, // Arabic
    'ar-AE': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (UAE)
    'ar-BH': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Bahrain)
    'ar-DZ': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Algeria)
    'ar-EG': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Egypt)
    'ar-IQ': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Iraq)
    'ar-JO': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Jordan)
    'ar-KW': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Kuwait)
    'ar-LB': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Lebanon)
    'ar-LY': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Libya)
    'ar-MA': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Morocco)
    'ar-QA': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Qatar)
    'ar-QM': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (QM)
    'ar-SA': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Saudi Arabia)
    'ar-SD': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Sudan)
    'ar-SY': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Syria)
    'ar-TN': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Tunisia)
    'ar-YE': /^[\u0600-\u06FF0-9\s]+$/, // Arabic (Yemen)
    'bn': /^[ঀ-৿0-9\s]+$/, // Bengali
    'bg-BG': /^[А-Яа-яЁё0-9\s]+$/, // Bulgarian
    'cs-CZ': /^[A-Za-zÁáČčĎďÉéĚěÍíŇňÓóŘřŠšŤťÚúŮůÝýŽž0-9\s]+$/, // Czech
    'da-DK': /^[A-Za-zÆæØøÅå0-9\s]+$/, // Danish
    'de-DE': /^[A-Za-zÄäÖöÜüß0-9\s]+$/, // German
    'el-GR': /^[Α-ω0-9\s]+$/, // Greek
    'en-AU': /^[A-Za-z0-9\s]+$/, // English (Australia)
    'en-GB': /^[A-Za-z0-9\s]+$/, // English (United Kingdom)
    'en-HK': /^[A-Za-z0-9\s]+$/, // English (Hong Kong)
    'en-IN': /^[A-Za-z0-9\s]+$/, // English (India)
    'en-NZ': /^[A-Za-z0-9\s]+$/, // English (New Zealand)
    'en-US': /^[A-Za-z0-9\s]+$/, // English (United States)
    'en-ZA': /^[A-Za-z0-9\s]+$/, // English (South Africa)
    'en-ZM': /^[A-Za-z0-9\s]+$/, // English (Zambia)
    'eo': /^[A-Za-z0-9\s]+$/, // Esperanto
    'es-ES': /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9\s]+$/, // Spanish (Spain)
    'fa-IR': /^[\u0600-\u06FF0-9\s]+$/, // Persian (Iran)
    'fi-FI': /^[A-Za-zÄäÖö0-9\s]+$/, // Finnish
    'fr-CA': /^[A-Za-zÀàÂâÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü\s]+$/, // French (Canada)
    'fr-FR': /^[A-Za-zÀàÂâÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü\s]+$/, // French (France)
    'he': /^[א-ת0-9\s]+$/, // Hebrew
    'hi-IN': /^[ऀ-ॿ0-9\s]+$/, // Hindi (India)
    'hu-HU': /^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű0-9\s]+$/, // Hungarian
    'it-IT': /^[A-Za-zÀàÉéÈèÍíÎîÒòÓóÚú0-9\s]+$/, // Italian
    'kk-KZ': /^[А-Яа-яЁё0-9\s]+$/, // Kazakh
    'ko-KR': /^[가-힣0-9\s]+$/, // Korean
    'ja-JP': /^[ぁ-んァ-ン0-9\s]+$/, // Japanese
    'ku-IQ': /^[\u0600-\u06FF0-9\s]+$/, // Kurdish (Iraq)
    'nb-NO': /^[A-Za-zÆæØøÅå0-9\s]+$/, // Norwegian Bokmål
    'nl-NL': /^[A-Za-zÁáÉéÍíÓóÚú\s]+$/, // Dutch (Netherlands)
    'nn-NO': /^[A-Za-zÆæØøÅå0-9\s]+$/, // Norwegian Nynorsk
    'pl-PL': /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9\s]+$/, // Polish
    'pt-BR': /^[A-Za-zÁáÂâÃãÀàÉéÊêÍíÓóÔôÕõÚúÜüÇç0-9\s]+$/, // Portuguese (Brazil)
    'pt-PT': /^[A-Za-zÁáÂâÃãÀàÉéÊêÍíÓóÔôÕõÚúÜüÇç0-9\s]+$/, // Portuguese (Portugal)
    'ru-RU': /^[А-Яа-яЁё0-9\s]+$/, // Russian
    'si-LK': /^[\u0D80-\u0DFF0-9\s]+$/, // Sinhala (Sri Lanka)
    'sl-SI': /^[A-Za-zČčĆćĐđŠšŽž0-9\s]+$/, // Slovenian
    'sk-SK': /^[A-Za-zÁáÄäČčĎďÉéÍíĹĺĽľŇňÓóÔôŔŕŠšŤťÚúÝýŽž0-9\s]+$/, // Slovak
    'sr-RS': /^[А-Яа-яЂђЋћЉљЊњЏџ0-9\s]+$/, // Serbian (Cyrillic)
    'sr-RS@latin': /^[A-Za-zČčĆćĐđŠšŽž0-9\s]+$/, // Serbian (Latin)
    'sv-SE': /^[A-Za-zÅåÄäÖö0-9\s]+$/, // Swedish
    'th-TH': /^[ก-๙0-9\s]+$/, // Thai
    'tr-TR': /^[A-Za-zÇçĞğİıÖöŞşÜü0-9\s]+$/, // Turkish
    'uk-UA': /^[А-ЩЬЮЯҐЄІЇа-щьюяґєії0-9\s]+$/, // Ukrainian
};