import LocationEnabler from '../components/LocationEnabler';
import 'bootstrap/dist/css/bootstrap.css';

const AboutUs = () => {

    return (
        <div className="about-container">

            <div className="about-para">
                <p className="highlight">
                Welcome to Shopful
                </p>
                <p>The revolutionary search engine designed exclusively for shopaholics!</p>
                <p>Our cutting-edge platform is your ultimate destination for seamless shopping exploration, making the quest for your dream products a breeze. </p>
                <p>With a vast database of items from countless online retailers, Shopful brings you the latest trends and hottest deals right to your fingertips. Unleash the power of smart searching, 
                    filtering, and price comparisons to discover hidden gems and snag the best bargains in a single click. </p>
                <p>Whether you're hunting for fashion, gadgets, home essentials, or anything in between, let Shopful be your trusty shopping companion and embark on a journey of endless discoveries today! </p>
                <p>Happy shopping!</p>
            </div>
            <div className="location-container">
                <LocationEnabler />
            </div>
        </div>
    )
    
}

export default AboutUs