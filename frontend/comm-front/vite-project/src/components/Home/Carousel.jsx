import { useState, useEffect } from 'react';
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import { useNavigate } from 'react-router-dom';

export default function Carousel(){
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const slides = [
        {
            image: img1,
            title: "Welcome to UnitySpace",
            buttonText: "Learn More"
        },
        {
            image: img2,
            title: "Discover Events",
            buttonText: "View Events"
        },
        {
            image: img3,
            title: "Join Our Community", 
            buttonText: "Get Started"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => 
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => 
            prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => 
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: index === currentSlide ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                >
                    <img
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.7)'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '50px',
                        left: '50px',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{slide.title}</h2>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                padding: '10px 25px',
                                fontSize: '1.1rem',
                                backgroundColor: '#ffffff',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {slide.buttonText}
                        </button>
                    </div>
                </div>
            ))}
            
            <button 
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.5)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer'
                }}
            >
                ←
            </button>
            
            <button 
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.5)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer'
                }}
            >
                →
            </button>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px'
            }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            border: 'none',
                            background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}