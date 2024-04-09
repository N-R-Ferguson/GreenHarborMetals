import '../assets/style/Homepage.css';
import LogIn from './LogIn.jsx';
import MenuHomepage from './MenuHomepage.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { checkCookie } from '../assets/functions/cookies.js';


function Homepage() {
    const navigate = useNavigate();
    

    useEffect(() => {
        const onPageLoad = () => {
            try{
                let cookie = checkCookie();            
                
                if (cookie){
    
                    navigate('/store');
                }
            }catch(err) {
                
                console.log(err.message);
            }
        };

        if (document.readyState === 'complete'){
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    });

    return (
        <>
            <MenuHomepage />
            <div>
                <div>
                    <LogIn />
                </div>
            </div>
        </>
    )
}

export default Homepage;