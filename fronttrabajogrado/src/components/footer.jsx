import React from 'react'
import './styles/style.css'
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YoutubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { Link } from 'react-router-dom';

const homeImages = require.context('../components/images', true)

export const FooterHome = () => {
    return (
        <div className='container-footer'>
            <div className='footer-container'>
                <div className='footer-info'>
                    <div>
                        <img src={homeImages('./Logo_TrasteaT.png')} alt='Logo TrasteaT' />
                    </div>
                    <div>
                        <p><LocationIcon /> Carrera 13  # 142 -71  Bogotá, Colombia</p>
                        <div className="phone-numbers">
                            <p><PhoneIcon /> 316 362 91 33</p>
                            <p><PrintIcon /> 316 362 9133</p>
                        </div>
                    </div>
                </div>
                <div className='footer-socialNetworks'>
                    <Link to="/facebook" target="_blank" rel="noopener noreferrer"><FacebookIcon /></Link>
                    <Link to="/twitter" target="_blank" rel="noopener noreferrer"><TwitterIcon /></Link>
                    <Link to="/linkedin" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></Link>
                    <Link to="/youtube" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></Link>
                    <Link to="/instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></Link>
                    <Link to="/google" target="_blank" rel="noopener noreferrer"><GoogleIcon /></Link>
                    <Link to="/pinterest" target="_blank" rel="noopener noreferrer"><PinterestIcon /></Link>
                    <Link to="/rss" target="_blank" rel="noopener noreferrer"><RssFeedIcon /></Link>
                </div>
            </div>
            <div className="copyright">
                <p className="right-align">© 2023 TrasteaT. Todos los derechos reservados</p>
            </div>
        </div>
    )
}
