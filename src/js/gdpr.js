/// (c) Evgenii Dobrovidov, 2020

const gaScriptUrl = 'https://www.googletagmanager.com/gtag/js?id=UA-161450305-1'

function gtag() {
  window.dataLayer.push(arguments)
}

function setupGA() {
  window.dataLayer = window.dataLayer || []
  gtag('js', new Date())
  gtag('config', 'UA-161450305-1')
}

let gaEnabled = false

function enableGA() {
  if (!gaEnabled) {
    setupGA()

    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('src', gaScriptUrl)
    document.head.appendChild(script)

    gaEnabled = true
  }
}

function dismissDisclaimer() {
  const disclaimerContainer = document.getElementById('gdpr_disclaimer')
  if (disclaimerContainer) {
    disclaimerContainer.setAttribute('dismissed', '')
  }
}

function showDisclaimer() {
  const disclaimerContainer = document.getElementById('gdpr_disclaimer')
  if (disclaimerContainer) {
    disclaimerContainer.removeAttribute('dismissed')
  }
}

function saveConsent(consent) {
  localStorage.setItem('gdpr_consent', consent ? '1' : '0')
}

function getConsent() {
  return localStorage.getItem('gdpr_consent')
}

export function setupGDPRConsentButtons() {
  const consent = getConsent()
  if (consent === null) {
    setTimeout(showDisclaimer, 0) // this is needed to trigger transition

    const acceptButtons = document.getElementsByClassName('gdpr-consent-accept')
    for (const button of acceptButtons) {
      button.addEventListener('click', event => {
        enableGA()
        dismissDisclaimer()
        saveConsent(true)
      })
    }

    const declineButtons = document.getElementsByClassName('gdpr-consent-decline')
    for (const button of declineButtons) {
      button.addEventListener('click', event => {
        dismissDisclaimer()
        saveConsent(false)
      })
    }

  } else if (consent === '1') {
    enableGA()
  }
}
