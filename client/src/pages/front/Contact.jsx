import React from 'react'
import ContactForm from '../../components/front/ContactForm'

export default function Contact() {
  return (
    <div className="front-about">
      <div className="front-card">
        <p className="front-eyebrow">Contact</p>
        <h2 className="front-section-title">Let’s talk cookies</h2>
        <p className="front-section-copy">
          Use the form to ask about flavours, custom requests, or anything else you want to know before visiting or ordering.
        </p>
        <p className="front-section-copy">
          This website is designed as a simple catalogue, so the contact form is the easiest way for visitors to reach the shop.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
