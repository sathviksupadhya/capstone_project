import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
export default function Carousel(){
    return (
        <>
        <div style={{ position: 'relative' }}>
            <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{ height: '100%' }}>
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" style={{ height: '100%' }}>
                        <div className="carousel-item active" style={{ height: '100%' }}>
                            <div style={{ position: 'relative', height: '100%' }}>
                                <img src={img1} 
                                    className="d-block w-100" 
                                    alt="Office workspace" 
                                    style={{
                                        height: '100%',
                                        width: '100%',
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
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Welcome to UnitySpace</h2>
                                    <button style={{
                                        padding: '10px 25px',
                                        fontSize: '1.1rem',
                                        backgroundColor: '#ffffff',
                                        color: 'black',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}>Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{ height: '100%' }}>
                            <div style={{ position: 'relative', height: '100%' }}>
                                <img src={img2} 
                                    className="d-block w-100" 
                                    alt="Team meeting" 
                                    style={{
                                        height: '100%',
                                        width: '100%',
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
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Discover Events</h2>
                                    <button style={{
                                        padding: '10px 25px',
                                        fontSize: '1.1rem',
                                        backgroundColor: '#ffffff',
                                        color: 'black',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}>View Events</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{ height: '100%' }}>
                            <div style={{ position: 'relative', height: '100%' }}>
                                <img src={img3} 
                                    className="d-block w-100" 
                                    alt="Modern office" 
                                    style={{
                                        height: '100%',
                                        width: '100%',
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
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Join Our Community</h2>
                                    <button style={{
                                        padding: '10px 25px',
                                        fontSize: '1.1rem',
                                        backgroundColor: '#ffffff',
                                        color: 'black',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
            </div>
            </div>
        </>
    )
};