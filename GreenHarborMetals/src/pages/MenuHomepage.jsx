import image from '../assets/logos/GreenHarborMetals.png';
import '../assets/style/Menu.css';
import { Link } from 'react-router-dom';

const company = {
    name: 'GreenHarborMetals',
    imgURL: image,
};

export default function MenuHomepage() {
    const page = window.location.pathname;
    if (page == '/about') {
        return (
            <>
                <div className='LogoContainer'>
                    <img className='logo' src={company.imgURL} />
                    <h1 className='CompanyName'>{company.name}</h1>
                </div>

                <div id='menu'>
                    <div className='menu-left'>
                        <Link to='/'>Home</Link>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='LogoContainer'>
                    <img className='logo' src={company.imgURL} />
                    <h1 className='CompanyName'>{company.name}</h1>
                </div>

                <div id='menu'>
                    <div className='menu-left'>
                        <Link to='/about'>About</Link>
                    </div>
                </div>
            </>
        )
    }
}