import StoreMenu from "./StoreMenu";
import MenuHomepage from "./MenuHomepage";
import '../assets/style/About.css'
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
                    <div className="AboutContainer">
                        <div className="TitleHeader">
                            <h1 >About GreenHarbor Metals</h1>
                        </div>
                        <div className="ContentsContainer">
                            <div className="Align">
                                <div className="HeaderContainer">
                                    <h3>Our Mission</h3>
                                </div>
                                <div className="ParagraphContainer">
                                    <p>Welcome to GreenHarbor Metals, a pioneering force in ethical
                                        e-commerce dedicated to revolutionizing the rare earth metal
                                        supply chain. Faced with the ethical challenges surrounding metal
                                        extraction, we are committed to reshaping the industry through
                                        innovation and transparency. Our marketplace ensures meticulous
                                        documentation from mining operations to inventory, offering end
                                        users full visibility into the origins of their purchased metals.</p>
                                </div>
                            </div>
                            <div>
                                <br />
                            </div>
                            <div className="Align">
                                <div className="HeaderContainer">
                                    <h3>We We Are</h3>
                                </div>
                                <div className="ParagraphContainer">
                                    <p>At GreenHarbor Metals, we understand the importance of ethical
                                        practices and traceability. Our platform not only provides
                                        corporations with a means to purify metals but also empowers
                                        consumers to make informed choices about the products they purchase.
                                        With a focus on scalability and advanced software systems, we are
                                        driving towards a sustainable and responsible supply chain model that
                                        meets the demands of a growing market while prioritizing ethical values.
                                        Join us in our mission to create a brighter, greener future for the rare
                                        earth metal industry.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <StoreMenu />
                    <div className="AboutContainer">
                        <div className="TitleHeader">
                            <h1 >About GreenHarbor Metals</h1>
                        </div>
                        <div className="ContentsContainer">
                            <div className="Align">
                                <div className="HeaderContainer">
                                    <h3>Our Mission</h3>
                                </div>
                                <div className="ParagraphContainer">
                                    <p>Welcome to GreenHarbor Metals, a pioneering force in ethical
                                        e-commerce dedicated to revolutionizing the rare earth metal
                                        supply chain. Faced with the ethical challenges surrounding metal
                                        extraction, we are committed to reshaping the industry through
                                        innovation and transparency. Our marketplace ensures meticulous
                                        documentation from mining operations to inventory, offering end
                                        users full visibility into the origins of their purchased metals.</p>
                                </div>
                            </div>
                            <div>
                                <br />
                            </div>
                            <div className="Align">
                                <div className="HeaderContainer">
                                    <h3>We We Are</h3>
                                </div>
                                <div className="ParagraphContainer">
                                    <p>At GreenHarbor Metals, we understand the importance of ethical
                                        practices and traceability. Our platform not only provides
                                        corporations with a means to purify metals but also empowers
                                        consumers to make informed choices about the products they purchase.
                                        With a focus on scalability and advanced software systems, we are
                                        driving towards a sustainable and responsible supply chain model that
                                        meets the demands of a growing market while prioritizing ethical values.
                                        Join us in our mission to create a brighter, greener future for the rare
                                        earth metal industry.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    } catch (err) {

        console.log(err.message);
    }

}

export default About;