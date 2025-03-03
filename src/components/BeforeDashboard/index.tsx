import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Vítejte ve vašem administračním rozhraní!</h4>
      </Banner>
      Co dělat dále:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' s několika stránkami, články a projekty pro rychlý start vašeho nového webu, poté '}
          <a href="/" target="_blank">
            navštivte váš web
          </a>
          {' pro zobrazení výsledků.'}
        </li>
        <li>
          Pokud jste vytvořili tento repozitář pomocí Payload Cloud, přejděte na GitHub a naklonujte
          si ho na váš lokální počítač. Bude pod <i>GitHub Scope</i>, který jste vybrali při
          vytváření tohoto projektu.
        </li>
        <li>
          {'Upravte vaše '}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            kolekce
          </a>
          {' a přidejte další '}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            pole
          </a>
          {' podle potřeby. Pokud jste v Payload nováčkem, doporučujeme také prozkoumat '}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            Začínáme
          </a>
          {' dokumentaci.'}
        </li>
        <li>
          Commitněte a pushněte vaše změny do repozitáře pro spuštění opětovného nasazení vašeho
          projektu.
        </li>
      </ul>
      {'Pro Tip: Tento blok je '}
      <a
        href="https://payloadcms.com/docs/admin/custom-components/overview#base-component-overrides"
        rel="noopener noreferrer"
        target="_blank"
      >
        vlastní komponenta
      </a>
      , můžete ji kdykoliv odstranit aktualizací vašeho <strong>payload.config</strong>.
    </div>
  )
}

export default BeforeDashboard
