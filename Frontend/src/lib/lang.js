function getLanguageName(languageId) {
    const LANGUAGE_NAMES = {
      76: "C++",
      63: "JavaScript",
      71: "Python",
      62: "Java",
    };
    return LANGUAGE_NAMES[languageId] || "Unknown";
  }

  export { getLanguageName };


  export function getLanguageId(language) {
    const languageMap = {
      "PYTHON": 71,
      "JAVASCRIPT": 63,
      "JAVA": 62,
      "C++": 76,
    };
    return languageMap[language.toUpperCase()];
  }