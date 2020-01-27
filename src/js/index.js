/// (c) Evgenii Dobrovidov, 2020

import '../styles/styles.scss'

import { setContactDetails } from './contacts'
import { calculateAge, calculateWorkPeriods } from './info'
import { setupSectionsExpansion, setupStickyHeader } from './ui'

document.addEventListener('DOMContentLoaded', main)

function main() {
    setContactDetails()

    calculateAge()

    calculateWorkPeriods()

    setupSectionsExpansion()

    setupStickyHeader()
}

