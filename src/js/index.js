/// (c) Evgenii Dobrovidov, 2020

import '../styles/styles.scss'

import { setContactDetails } from './contacts'
import { calculateAge, calculateWorkPeriods } from './info'
import { setupSectionsExpansion, setupStickyHeader, setupLanguageSwitch } from './ui'
import { updateDocumentLanguage } from './l10n'
import { setupGDPRConsentButtons } from "./gdpr";
import { setupCodeBackground } from "./code-bg";

document.addEventListener('DOMContentLoaded', main)

function main() {
  updateDocumentLanguage()

  setupLanguageSwitch()

  setContactDetails()

  calculateAge()

  calculateWorkPeriods()

  setupSectionsExpansion()

  setupStickyHeader()

  setupGDPRConsentButtons()

  setupCodeBackground();
}
