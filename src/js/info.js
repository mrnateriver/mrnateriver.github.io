/// (c) Evgenii Dobrovidov, 2020

import { getStrings } from './l10n'

const birthdate = new Date('1992-06-07T00:00:00.000')

function conjugateRussianWord(word, count, parts = null) {
  let suffixes
  if (parts) {
      suffixes = Object.assign({ one: word }, parts)
  } else {
      suffixes = {
          one: word,
          few: word + 'а',
          many: word + 'ов',
          other: word + 'а',
      }
  }

  const rounded = Math.floor(count)

  const tenRem = rounded % 10
  const hundredRem = rounded % 100

  let plf
  if ((tenRem === 1) && (hundredRem !== 11)) {
      plf = 'one'
  } else if (([2, 3, 4].indexOf(tenRem) > -1) && ([12, 13, 14].indexOf(hundredRem) < 0)) {
      plf = 'few'
  } else if ((tenRem === 0) || ([5, 6, 7, 8, 9].indexOf(tenRem) > -1) || ([11, 12, 13, 14].indexOf(hundredRem) > -1)) {
      plf = 'many'
  } else {
      plf = 'other'
  }

  return suffixes[plf]
}

export function calculateAge() {
  const ageSpan = document.getElementById('age')
  if (ageSpan) {
      // Subtraction returns milliseconds - so we divide to find seconds, then minutes, then hours, then days and then years
      // This doesn't take leap years into account, of course, but it would make a difference only close to the birthdate, which is
      // just one day in a year
      var age = Math.floor((new Date() - birthdate) / 1000 / 60 / 60 / 24 / 365)

      ageSpan.innerText = age.toString()
  }
}

export function calculateWorkPeriods() {
  const durations = document.querySelectorAll('.work-duration[data-from]')
  durations.forEach(node => {
      const from = node.getAttribute('data-from')
      const to = node.getAttribute('data-till')

      const fromDate = new Date(from + 'T00:00:00.000')
      const toDate = to ? new Date(to + 'T00:00:00.000') : new Date()

      const spanDays = Math.floor((toDate - fromDate) / 1000 / 60 / 60 / 24)

      const years = Math.floor(spanDays / 365)
      const months = Math.round((spanDays - (years * 365)) / (365 / 12)) // Use average days in month (365 / 12)

      const words = getStrings()

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
