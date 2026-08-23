import React from 'react';
import Hero from '../../../Components/Hero/Hero';
import About from '../../../Components/About/About';
import Categories from '../../../Components/Categories/Categories';
import PopularFoods from '../../../Components/PopularFoods/PopularFoods';
import WhyChooseUs from '../../../Components/WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <About></About>
            <Categories></Categories>
            <PopularFoods></PopularFoods>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;