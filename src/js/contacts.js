/// (c) Evgenii Dobrovidov, 2020

const emails = [
  [0x6d, 0x72, 0x2e, 0x6e, 0x61, 0x74, 0x65, 0x2e, 0x72, 0x69, 0x76, 0x65, 0x72, 0x40, 0x67, 0x6d, 0x61, 0x69, 0x6c, 0x2e, 0x63, 0x6f, 0x6d],
  [0x65, 0x64, 0x6f, 0x62, 0x72, 0x6f, 0x76, 0x69, 0x64, 0x6f, 0x76, 0x40, 0x79, 0x61, 0x6e, 0x64, 0x65, 0x78, 0x2e, 0x72, 0x75],
]

function setEmailContacts() {
  const emailsStrings = emails.map(getStringFromCodePoints)
  if (emailsStrings.length > 0) {
    const headerEmail = document.getElementById('header_email')
    if (headerEmail) headerEmail.href = `mailto:${emailsStrings[0]}`

    const detailsEmails = document.getElementById('details_emails')
    if (detailsEmails) {
      for (const emailString of emailsStrings) {
        const link = document.createElement('a')
        link.classList.add('mail-link')
        link.href = `mailto:${emailString}`
        link.innerText = emailString

        detailsEmails.appendChild(link)
      }
    }
  }
}

function getStringFromCodePoints(points) {
  try {
    return String.fromCharCode(...points)
  } catch {
    return null
  }
}

export function setContactDetails() {
  setEmailContacts()
}
