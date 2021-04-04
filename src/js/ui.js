/// (c) Evgenii Dobrovidov, 2020

import { updateDocumentLanguage } from './l10n'

function handleSectionClick(evt) {
  if (this.hasAttribute('expanded')) {
    this.removeAttribute('expanded')
  } else {
    this.setAttribute('expanded', '')
  }
}

function handlePageScrollForStickyHeader(article) {
  const top = this.offsetTop - article.offsetTop

  // we assume here that header should stick to the very top
  if (top > 0) {
    this.setAttribute('sticky', '')
  } else {
    this.removeAttribute('sticky')
  }
}

export function setupSectionsExpansion() {
  const sections = document.querySelectorAll('section')
  for (const section of sections) {
    const headers = section.querySelectorAll('h2.section-title')
    for (const header of headers) {
      header.addEventListener('click', handleSectionClick.bind(section))
    }
  }
}

export function setupStickyHeader() {
  const header = document.querySelector('header')
  if (header) {
    // FIXME: fix on mobile devices (narrow-screen breakpoint)
    const container = document.querySelector('#scroll_container');
    const article = document.querySelector('#main_article');
    if (container && article) {
      container.addEventListener('scroll', handlePageScrollForStickyHeader.bind(header, article), { passive: true })
    }
  }
}

export function setupLanguageSwitch() {
  window.addEventListener('popstate', () => {
    updateDocumentLanguage()
  })

  const switchButtons = document.getElementsByClassName('language_selector')
  for (const switchButton of switchButtons) {
    switchButton.addEventListener('click', event => {
      window.history.pushState(null, '', event.target.href)
      updateDocumentLanguage()

      event.preventDefault()
    })
  }
}
