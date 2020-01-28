/// (c) Evgenii Dobrovidov, 2020

export const strings = {
  ru: {
    year_1: 'год',
    year_2: 'года',
    year_3: 'лет',
    year_4: 'лет',
    month_1: 'месяц',
    month_2: 'месяца',
    month_3: 'месяцев',
    month_4: 'месяцев',
  },
  en: {
    year_1: 'year',
    year_2: 'years',
    year_3: 'years',
    year_4: 'years',
    month_1: 'month',
    month_2: 'months',
    month_3: 'months',
    month_4: 'months',
  }
}

function getUserPreferredLanguage() {
  const urlParams = new URLSearchParams(window.location.search);

  const language = urlParams.get('lang')
    || (navigator.languages
          ? navigator.languages[0]
          : (navigator.language || navigator.userLanguage))
    || 'en'

  // Optimistically removing dialect from language string
  return language.replace(/\W.*?$/, '').toLowerCase()
}

export function updateDocumentLanguage() {
  document.documentElement.setAttribute('lang', getUserPreferredLanguage())
}

export function getStrings() {
  const language = document.documentElement.getAttribute('lang') || 'en'

  // `strings` could come from an arbitrary source, so fallback to EN in case current language is missing
  return strings[language] || strings.ru
}
