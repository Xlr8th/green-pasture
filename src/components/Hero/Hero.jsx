import { useEffect, useState } from 'react';
import './Hero.css'

const Hero = ({ searchTerm, onSearch }) => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600',
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1600',
    'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600'

  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1)%slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {/*  Sliding background images  */}
      <div className="hero-slides">
        {slides.map((slide, index) => {
          return (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`} style={{backgroundImage: `url('${slide}')`}}
            />
          )
        })}
      </div>

      {/* <!-- Dark overlay --> */}
      <div className="hero-overlay"></div>

      {/* <!-- Content stays on top --> */}
      <div className="container">
        <h2>Welcome to Green Pastures</h2>
        <p>Nourishing your soul with Godly Articles, Books, Videos & Podcasts</p>
        <div className="search-container">
          <input 
            type="text" 
            id="search-input"
            value={searchTerm} 
            placeholder="Search posts, books, videos..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </section>
  )
};

export default Hero;
