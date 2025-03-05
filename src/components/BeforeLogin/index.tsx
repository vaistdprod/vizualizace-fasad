'use client'

import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div className="before-login">
      <div className="before-login__logo">Pediatr Zbiroh</div>
      <div className="before-login__content">
        <h2>Vítejte ve vašem administračním rozhraní!</h2>
        <p>Zde se přihlašují administrátoři pro správu vašeho webu.</p>
      </div>
      <style jsx>{`
        .before-login {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .before-login__logo {
          font-family: 'Quicksand', var(--font-quicksand), sans-serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background-image: linear-gradient(to right, hsl(340, 85%, 65%), hsl(180, 75%, 65%));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          letter-spacing: -0.02em;
        }

        .before-login__content h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: hsl(340, 85%, 65%);
          margin-bottom: 0.5rem;
        }

        .before-login__content p {
          color: hsl(340, 40%, 45%);
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  )
}

export default BeforeLogin
