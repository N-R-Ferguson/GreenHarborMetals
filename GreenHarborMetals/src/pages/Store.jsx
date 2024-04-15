import StoreMenu from './StoreMenu.jsx';
import '../assets/style/Store.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCookie } from '../assets/functions/cookies.js';

function Store() {
    const navigate = useNavigate()

    const [products, setProducts] = useState(null);

    const handleClick = (product) => {

        navigate("/product", { state: { c_name: product.company_name, metal: product.siloh_name } })
    }


    useEffect(() => {
        const onPageLoad = () => {
            try {
                let cookie = checkCookie();

                if (cookie == false) {

                    navigate('/');
                }
            } catch (err) {

                console.log(err.message);
            }
        };

        const getProducts = async () => {

            const url = "http://localhost:5000/products";
            const response = await fetch(url);
            const c = await response.json();
            console.log(c);
            setProducts(c);
        }

        if (document.readyState === 'complete') {
            onPageLoad();
            getProducts();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    // test();
    if (products != null) {
        return (
            <>
                <StoreMenu />
                <div>
                    <div>
                        <div className='StoreContainer'>
                            <div>
                                <h1 className='Header'>Available Metals</h1>
                            </div>
                            
                            <div className='ProductContainer'>
                                {products.map((product) => (
                                    <div className='MetalContainer' key={product.row_number}>
                                        <div className='ProductButton' onClick={() => handleClick(product)}>
                                            <h3 className='Metal'>{product.siloh_name}</h3>
                                            <div className='Attributes'>
                                                <h4>{product.company_name}</h4>
                                                <h4>Amount: {product.sum} g</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Store;