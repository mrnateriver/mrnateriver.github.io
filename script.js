/// Evgenii Dobrovidov (c) 2020
const birthdate = new Date('1992-06-07T00:00:00.000')

const strings = {
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

let language

document.addEventListener("DOMContentLoaded", main)

function main() {
    language = document.documentElement.getAttribute('lang') || 'ru'

    setupSectionsExpansion()

    setupStickyHeader()

    calculateAge()

    calculateWorkPeriods()
}

function setupSectionsExpansion() {
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
        const header = section.querySelector('h2:first-of-type');
        if (header) {
            header.addEventListener('click', handleSectionClick.bind(section))
        }
    })
}

function handleSectionClick(evt) {
    if (this.hasAttribute('expanded')) {
        this.removeAttribute('expanded')
    } else {
        this.setAttribute('expanded', '')
    }
}

function setupStickyHeader() {
    const header = document.querySelector('header')
    if (header) {
        document.addEventListener('scroll', handlePageScrollForStickyHeader.bind(header), { passive: true })
    }
}

function handlePageScrollForStickyHeader() {
    // https://stackoverflow.com/a/3464890/5877243
    const doc = document.documentElement
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)

    // we assume here that header should stick to the very top
    if (top > 0) {
        this.setAttribute('sticky', '')
    } else {
        this.removeAttribute('sticky')
    }
}

function calculateAge() {
    const ageSpan = document.getElementById('age')
    if (ageSpan) {
        // Subtraction returns milliseconds - so we divide to find seconds, then minutes, then hours, then days and then years
        // This doesn't take leap years into account, of course, but it would make a difference only close to the birthdate, which is
        // just one day in a year
        var age = Math.floor((new Date() - birthdate) / 1000 / 60 / 60 / 24 / 365)

        ageSpan.innerText = age.toString()
    }
}

function calculateWorkPeriods() {
    const durations = document.querySelectorAll('.work-duration[data-from]')
    durations.forEach(node => {
        const from = node.getAttribute('data-from')
        const to = node.getAttribute('data-till')

        const fromDate = new Date(from + 'T00:00:00.000')
        const toDate = to ? new Date(to + 'T00:00:00.000') : new Date()

        const spanDays = Math.floor((toDate - fromDate) / 1000 / 60 / 60 / 24)

        const years = Math.floor(spanDays / 365)
        const months = Math.round((spanDays - (years * 365)) / (365 / 12)) // Use average days in month (365 / 12)

        const words = strings[language]

        let duration = ''
        if (years > 0) {
            duration += `${years} ` + conjugateRussianWord(words.year_1, years, { one: words.year_1, few: words.year_2, many: words.year_3 })
        }
        if (months > 0) {
            duration += ` ${months} ` + conjugateRussianWord(words.month_1, months, { one: words.month_1, few: words.month_2, many: words.month_3 })
        }
        node.innerText = duration
    })
}

function conjugateRussianWord(word, count, parts = null) {
    let suffixes;
    if (parts) {
      suffixes = Object.assign({ one: word }, parts);
    } else {
      suffixes = {
        one: word,
        few: word + 'а',
        many: word + 'ов',
        other: word + 'а',
      };
    }

    const rounded = Math.floor(count);

    const tenRem = rounded % 10
    const hundredRem = rounded % 100

    let plf;
    if ((tenRem === 1) && (hundredRem !== 11)) {
      plf = 'one';
    } else if (([2, 3, 4].indexOf(tenRem) > -1) && ([12, 13, 14].indexOf(hundredRem) < 0)) {
      plf = 'few';
    } else if ((tenRem === 0) || ([5, 6, 7, 8, 9].indexOf(tenRem) > -1) || ([11, 12, 13, 14].indexOf(hundredRem) > -1)) {
      plf = 'many';
    } else {
      plf = 'other';
    }

    return suffixes[plf];
  }
