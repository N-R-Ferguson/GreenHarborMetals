import StoreMenu from './StoreMenu.jsx'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCookie } from '../assets/functions/cookies.js';

function Account(){

    const navigate = useNavigate()

    useEffect(() => {
        const onPageLoad = () => {
            try{
                let cookie = checkCookie();

                
                
                if (cookie == false){
    
                     navigate('/');
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

    return(
        <>
            <StoreMenu />
            <div>
                <h1>Account</h1>
            </div>
        </>
    )
}

export default Account;