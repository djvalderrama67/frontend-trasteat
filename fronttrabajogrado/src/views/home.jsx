import React from 'react'
import ResponsiveAppBar from '../components/navbar.jsx'
import { InicioHome } from '../components/main'
import { FooterHome } from '../components/footer'

export const HomePage = () => {
    return (
        <div>
            <header>
                <ResponsiveAppBar />
            </header>
            <main>
                <InicioHome />
            </main>
            <footer>
                <FooterHome />
            </footer>
        </div>
    )
}