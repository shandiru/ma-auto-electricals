import React from 'react'
import Menu from "../components/Menu";
import About from "../components/About";
import Review from "../components/Review";
import Contact from "../components/Contact";
import WhyChooseUs from "../components/WhyChooseUs";
import ImageSlider from "../components/ImageSlider"
import VenueSection from "../components/VenueSection"
import HeroSection from '../components/Hero';
const Home = () => {
    return (
        <div>
            <HeroSection />
            <Menu />
            <About />
            <ImageSlider />
            <Review />
             <VenueSection />
            {/* <WhyChooseUs /> */}
            <Contact />
        </div>
    )
}

export default Home
