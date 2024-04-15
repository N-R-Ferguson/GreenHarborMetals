import StoreMenu from './StoreMenu.jsx';
import '../assets/style/Products.css'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkCookie } from '../assets/functions/cookies.js';

function Product() {

    const location = useLocation();
    const company = location.state.c_name;
    const metal = location.state.metal;

    const [products, setProducts] = useState(null);

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

        const getProductData = async () => {
            const body = {
                c_name: company,
                m_name: metal,
            }

            const url = "http://localhost:5000/get-products";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };

            const response = await fetch(url, options);
            const productInfo = await response.json();
            setProducts(productInfo);

        };

        if (document.readyState === 'complete') {
            onPageLoad();
            getProductData();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    let price = 0;
    if (metal == 'Gold') {
        price = 76.995;
    } else if (metal == 'Lithium') {
        price = 0.01541;
    } else if (metal == 'Neodymium') {
        price = 0.919;
    } else {
        price = 0.00663;
    }

    if (products != null) {
        console.log(products);
        return (
            <>
                <StoreMenu />
                <div className='PageContainer'>
                    <div>
                        <h1>{company}'s {metal} Selections</h1>
                    </div>
                    <h3 className='Header'>Price: ${price}/g</h3>

                    <div className='ItemContainer'>
                        {products.map((product) => (
                            <div key={product.row_number}>
                                <div className='DetailsContainer'>
                                    <div className='Details'>
                                        <h3>Amount: {product.amount} g</h3>
                                        <h3>Date Mined: {product.datemined.split("T")[0]}</h3>
                                        <div className='ButtonContainer'>
                                            <button className='ItemButton'>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='BackContainer'>
                        <Link to='/store' ><button className='ItemButton'>Back</button></Link>
                        </div>
                        
                    </div>
                  
                </div>

            </>
        )
    }
}

export default Product;