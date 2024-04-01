import image from '../assets/logos/GreenHarborMetals.png';
import '../assets/style/Menu.css';
import { Link } from 'react-router-dom';
import user from './Homepage.jsx';

const company = {
    name: 'GreenHarborMetals',
    imgURL: image,
};

const isLoggedIn = false;

function logout() {
    user.logout;

}

function isCart() {
    return (
        <>
            <div className='LogoContainer'>
                <img className='logo' src={company.imgURL} />
                <h1 className='CompanyName'>{company.name}</h1>
            </div>

            <div id='menu'>
                <div className='menu-left'>
                    <Link to='/store'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/Account'>Account</Link>
                </div>
                <div className='menu-right'>
                    <Link to='/'>Logout</Link>
                </div>
            </div>
        </>
    )
}

function isAbout() {
    return (
        <>
            <div className='LogoContainer'>
                <img className='logo' src={company.imgURL} />
                <h1 className='CompanyName'>{company.name}</h1>
            </div>

            <div id='menu'>
                <div className='menu-left'>
                    <Link to='/store'>Home</Link>
                    <Link to='/account'>Account</Link>
                </div>
                <div className='menu-right'>
                    <Link to='/'>Logout</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </>

    )
}

function isAccount() {
    return (
        <>
            <div className='LogoContainer'>
                <img className='logo' src={company.imgURL} />
                <h1 className='CompanyName'>{company.name}</h1>
            </div>

            <div id='menu'>
                <div className='menu-left'>
                    <Link to='/store'>Home</Link>
                    <Link to='/about'>About</Link>
                </div>
                <div className='menu-right'>
                    <Link to='/'>Logout</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </>
    )
}

function isStore() {

    return (
        <>
            <div className='LogoContainer'>
                <img className='logo' src={company.imgURL} />
                <h1 className='CompanyName'>{company.name}</h1>
            </div>

            <div id='menu'>
                <div className='menu-left'>
                    <Link to='/about'>About</Link>
                    <Link to='/account'>Account</Link>
                </div>
                <div className='menu-right'>
                    <Link to='/' >Logout</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </>

    )
}

function LoggedIn() {
    const page = window.location.pathname;
    if (page == '/cart') {
        return isCart();
    } else if (page == '/about') {
        return isAbout()
    } else if (page == '/account') {
        return isAccount();
    } else {
        return isStore();
    }
}

function NotLoggedIn() {
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

function Menu() {
    if (isLoggedIn) {
        return LoggedIn()
    } else {
        return NotLoggedIn()
    }
}

export default Menu;