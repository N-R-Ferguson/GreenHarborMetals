import StoreMenu from "./StoreMenu";
import '../assets/style/Cart.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {checkCookie} from "../assets/functions/cookies";

function Cart() {
    const navigate = useNavigate();
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
    return (
        <>
            <StoreMenu />
            <div>
                <div>
                    <div className="Container">
                        <div className='Cart'>
                            <h3>Cart</h3>
                            <div>
                                <div>

                                </div>
                            </div>
                        </div>

                        <div>
                            <button className="CartButton"><Link to='/store'>Continue Shopping</Link></button>
                        </div>
                        
                    </div>
                    <div className='CheckoutContainer'>
                        <div className="CheckoutButton">
                            <Link to='/checkout'><button className="CheckoutButton">Continue to payment</button></Link>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Cart;