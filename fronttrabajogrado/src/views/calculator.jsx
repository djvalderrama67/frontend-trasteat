import React from 'react'
import ResponsiveAppBar from '../components/navbar.jsx'
import { FooterHome } from '../components/footer.jsx'
import { CalculadoraMain } from '../components/calculatormain'


export const CalculadoraPage = () => {
    return (
        <div>
            <header>
                <ResponsiveAppBar />
            </header>
            <main>
                <CalculadoraMain />
            </main>
            <footer>
                <FooterHome />
            </footer>
        </div>
    )
}
