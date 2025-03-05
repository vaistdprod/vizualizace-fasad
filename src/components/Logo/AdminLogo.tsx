'use client'

import React from 'react'

export const AdminLogo: React.FC = () => {
  return (
    <div className="admin-logo">
      <span className="admin-logo__text">Pediatr Zbiroh</span>
      <style jsx>{`
        .admin-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0;
        }

        .admin-logo__text {
          font-family: 'Quicksand', var(--font-quicksand), sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: hsl(340, 85%, 65%); /* Primary color */
          background-image: linear-gradient(
            to right,
            hsl(340, 85%, 65%),
            /* Primary color */ hsl(180, 75%, 65%) /* Secondary color */
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  )
}

export default AdminLogo
