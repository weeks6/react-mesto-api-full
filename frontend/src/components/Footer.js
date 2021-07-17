import React from 'react'

export default function Footer() {
  return (
    <footer className="footer container">
      <p className="footer__title">© {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  )
}
