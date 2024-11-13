// src/components/Carousel.jsx
import React, { useState, useEffect } from 'react';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.css'; // Import the CSS file for styling

const Carousel = () => {
    const totalSlides = 3; // Total number of slides
    const [activeIndex, setActiveIndex] = useState(0);

    // Function to go to the next slide
    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    // Set up an interval to change slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={50}
            totalSlides={totalSlides}
            currentSlide={activeIndex} // Set the current slide based on state
        >
            <Slider>
                <Slide index={0}>
                    <img className={activeIndex === 0 ? 'active' : ''} src="https://images.unsplash.com/photo-1424161318821-cb73e69b9422?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1" />
                </Slide>
                <Slide index={1}>
                    <img className={activeIndex === 1 ? 'active' : ''} src="https://images.unsplash.com/photo-1476240089339-1d4426572a99?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2" />
                </Slide>
                <Slide index={2}>
                    <img className={activeIndex === 2 ? 'active' : ''} src="https://images.unsplash.com/photo-1419454073861-6e5bccea68ae?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" />
                </Slide>
            </Slider>

            {/* Custom Arrow Buttons */}
            <div className="carousel-arrows">
                <ButtonBack className="arrow left-arrow">&lt;</ButtonBack>
                <ButtonNext className="arrow right-arrow">&gt;</ButtonNext>
            </div>
        </CarouselProvider>
    );
};

export default Carousel;