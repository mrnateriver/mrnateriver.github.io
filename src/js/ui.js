/// (c) Evgenii Dobrovidov, 2020

function handleSectionClick(evt) {
  if (this.hasAttribute('expanded')) {
      this.removeAttribute('expanded')
  } else {
      this.setAttribute('expanded', '')
  }
}

function handlePageScrollForStickyHeader() {
  // https://stackoverflow.com/a/3464890/5877243
  const doc = document.documentElement
  const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

  // we assume here that header should stick to the very top
  if (top > 0) {
      this.setAttribute('sticky', '')
  } else {
      this.removeAttribute('sticky')
  }
}

export function setupSectionsExpansion() {
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
      const header = section.querySelector('h2:first-of-type')
      if (header) {
          header.addEventListener('click', handleSectionClick.bind(section))
      }
  })
}

export function setupStickyHeader() {
  const header = document.querySelector('header')
  if (header) {
      document.addEventListener('scroll', handlePageScrollForStickyHeader.bind(header), { passive: true })
  }
}
