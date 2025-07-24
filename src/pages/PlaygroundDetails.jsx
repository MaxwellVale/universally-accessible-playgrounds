// PlaygroundDetails.jsx
import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { playgrounds } from '../data/playgroundData.js'
import PlaygroundsMap from '../components/PlaygroundsMap.jsx'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function PlaygroundDetails() {
  const { playgroundID } = useParams()
  const playground = playgrounds.find(p => p.id === playgroundID)

  const [currentSlide, setCurrentSlide] = useState(0); // defaulting to slide 0
  const carouselRef = useRef();
  const images = playground.images;

  const goToSlide = (index) => {
    setCurrentSlide(index);
    carouselRef.current?.goToSlide(index);
  };

  if (!playground) {
    return <h2>Playground not found.</h2>
  }

  return (
    <>
        <h2 className='info-heading'>{playground.name}</h2>
        <p className='description'>
            {playground.description}<br />
            Coordinates: {playground.lat}, {playground.lng}
        </p> 
        {/* Render the image carousel if there are images in the database for this playground */}
        {images && images.length > 0 && (
            <div className='carousel-wrapper'>
                <Carousel
                  ref={carouselRef}
                  responsive={responsive}
                  autoPlay={false}
                  containerClass='carousel-wrapper'
                  // centerMode={true}
                  arrows
                  dotListClass=''
                  keyBoardControl
                  draggable
                  renderDotsOutside
                  swipeable
                >
                    {images.map((image, index) => (
                      <div key={index} className='carousel-slide'>
                        <img 
                          key={index} 
                          src={image} 
                          alt={`Slide ${index + 1}`} /* Change the alt of images to be more descriptive and accessible */
                          onError={(e) => {
                            e.target.style.display = 'none';
                        }} /> 
                      </div>
                    ))}
                </Carousel>

                {/* See if this stuff works */}
                <div className="thumbnails">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx)} className={idx === currentSlide ? "active" : ""}>
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
            </div>
        )}
        
        
        <div className='playgrounds-map'>
            <PlaygroundsMap playgrounds={ playgrounds } highlightID={ playgroundID } />
        </div>
    </>
  );
}
