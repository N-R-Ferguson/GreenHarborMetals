import image from '../assets/logos/GreenHarborMetals.png';
import '../assets/style/Menu.css';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCookie } from '../assets/functions/cookies';

const company = {
    name: 'GreenHarborMetals',
    imgURL: image,
};



function isCart() {
    const navigate = useNavigate();
    const handleEvent = (event) => {
        deleteCookie();
        navigate('/');
    };
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
                    <Link to='/account'>Account</Link>
                </div>
                <div className='menu-right'>
                    <Link onClick={handleEvent}>Logout</Link>
                </div>
            </div>
        </>
    )
}

function isAbout() {
    const navigate = useNavigate();
    const handleEvent = (event) => {
        deleteCookie();
        navigate('/');
    };
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
                    <Link onClick={handleEvent} >Logout</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </>

    )
}

function isAccount() {
    const navigate = useNavigate();
    const handleEvent = (event) => {
        deleteCookie();
        navigate('/');
    };
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
                    <Link onClick={handleEvent}>Logout</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </>
    )
}

function isStore() {
    const navigate = useNavigate();
    
    const handleEvent = (event) => {
        deleteCookie();
        navigate('/');
    };
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
                    <Link onClick={handleEvent}>Logout</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </>

    )
}

function Menu() {
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



function StoreMenu() {
    return Menu()
}

export default StoreMenu;