import StoreMenu from "./StoreMenu";
import MenuHomepage from "./MenuHomepage";
import { useEffect } from 'react';
import { checkCookie } from "../assets/functions/cookies";

let cookie = "";

function About() {

    useEffect(() => {
        const onPageLoad = () => {
            try {
                let cookie = checkCookie();
                console.log(cookie);
            } catch (err) {

                console.log(err.message);
            }
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    });
    try {
        let cookie = checkCookie();
        console.log(cookie);


        if (cookie == false) {

            return (
                <>
                    <MenuHomepage />
                    <h1>About</h1>
                </>
            )
        } else {
            return (
                <>
                    <StoreMenu />
                    <h1>About</h1>
                </>
            )
        }
    } catch (err) {

        console.log(err.message);
    }

}

export default About;