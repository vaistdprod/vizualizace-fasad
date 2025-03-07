'use client'

import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <div className="font-['Mali',var(--font-mali),cursive] text-2xl font-bold mb-4 bg-gradient-to-r from-[hsl(340,85%,65%)] to-[hsl(180,75%,65%)] bg-clip-text text-transparent tracking-[-0.02em]">
        MUDr. Janulová
      </div>
      <div>
        <h2 className="text-[1.25rem] font-semibold text-[hsl(340,85%,65%)] mb-2">
          Vítejte ve vašem administračním rozhraní!
        </h2>
        <p className="text-[hsl(340,40%,45%)] text-[0.95rem]">
          Zde se přihlašují administrátoři pro správu vašeho webu.
        </p>
      </div>
    </div>
  )
}

export default BeforeLogin
