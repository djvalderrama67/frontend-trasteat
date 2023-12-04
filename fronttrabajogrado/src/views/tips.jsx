import React from 'react'
import ResponsiveAppBar from '../components/navbar.jsx'
import { FooterHome } from '../components/footer.jsx'
import { ConsejosMain } from '../components/tipsmain.jsx'

export const ConsejosPage = () => {
    return (
        <div>
            <header>
                <ResponsiveAppBar />
            </header>
            <main>
                <ConsejosMain />
            </main>
            <footer>
                <FooterHome />
            </footer>
        </div>
    )
}
