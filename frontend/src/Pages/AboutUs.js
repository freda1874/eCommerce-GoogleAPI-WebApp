import LocationEnabler from '../components/LocationEnabler';
import 'bootstrap/dist/css/bootstrap.css';

const AboutUs = () => {

    return (
        <div className="home">
            <LocationEnabler />
            <div className="about-para">
      <h2>About Shopful</h2>
      <p>Welcome to Shopful, the revolutionary search engine designed exclusively for shopaholics! Our cutting-edge platform is your ultimate 
        destination for seamless shopping exploration, making the quest for your dream products a breeze. With a vast database of items from countless 
        online retailers, Shopful brings you the latest trends and hottest deals right to your fingertips. Unleash the power of smart searching, 
        filtering, and price comparisons to discover hidden gems and snag the best bargains in a single click. Whether you're hunting for fashion, gadgets, 
        home essentials, or anything in between, let Shopful be your trusty shopping companion and embark on a journey of endless discoveries today! 
        Happy shopping!</p>
    </div>
        </div>
    )
    
}

export default AboutUs