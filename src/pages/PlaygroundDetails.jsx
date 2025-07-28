// PlaygroundDetails.jsx
import { useState, useRef, useEffect } from 'react'
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

  if (!playground) { // this will happen if no playground in the database matches playgroundID
    return <h2>Playground not found.</h2>
  }
  else {
    const [currentSlide, setCurrentSlide] = useState(0); // defaulting to slide 0
    const carouselRef = useRef(); // let's you reference and modify the specific carousel instance 
    const images = playground.images;

    const [placeDetails, setPlaceDetails] = useState(null);
    const API_KEY = 'AIzaSyCrpd1a5IDvaSRcXO7Ck3XZpQWUSb8Jg04';
    const place_details_url = `https://places.googleapis.com/v1/places/ChIJ0fVghny7woARiQ-rsrUqMWU?fields=addressComponents,photos,reviews&key=${API_KEY}`;

    const goToSlide = (index) => {
      setCurrentSlide(index);
      carouselRef.current.goToSlide(index);
    };

    useEffect(() => {
      const fetchPlaceDetails = async () => {
        try {
          console.log('Fetching place details');
          const res = await fetch(place_details_url);
          const data = await res.json();
          console.log('Google API results: ', data); // should contain arrays for address information, photos, and reviews
          setPlaceDetails(data);
        }
        catch (error) {
          console.error('Error fetching playground details', error);
        }
      };
      fetchPlaceDetails();
    }, [playground.place_id]);

    if (placeDetails) {
      const addressComponents = placeDetails.addressComponents; // different parts of address in an array
      const photos = placeDetails.photos; // photo list
      const params = 'maxWidthPx=1000'; // need to set a maxHeightPx or maxWidthPx for this to work
      const reviews = placeDetails.reviews; // review list 
    
      return (
        <>
            <h2 className='info-heading'>{playground.name}</h2>
            <p className='description'>
                {playground.description}<br />
                Coordinates: {playground.lat}, {playground.lng}
            </p> 
            {/* Render the image carousel if there are images in the database for this playground */}
            {photos && photos.length > 0 && (
                <div className='carousel-wrapper'>
                    <Carousel
                      ref={carouselRef}
                      responsive={responsive}
                      autoPlay={false}
                      containerClass='carousel-wrapper'
                      arrows
                      dotListClass=''
                      keyBoardControl
                      draggable
                      swipeable
                      afterChange={(previousSlide, { currentSlide: newIndex }) => setCurrentSlide(newIndex)}
                    >
                        {photos.map((photo, index) => (
                          <div key={index} className='carousel-slide'>
                            <img 
                              key={index} 
                              src={`https://places.googleapis.com/v1/${photo.name}/media?key=${API_KEY}&${params}`} 
                              alt={`Slide ${index + 1}`} /* Change the alt of images to be more descriptive and accessible */
                              // onError={(e) => {
                              //   e.target.style.display = 'none';
                              // }}
                            /> 
                          </div>
                        ))}
                    </Carousel>

                    {/* See if this stuff works */}
                    <div className="thumbnails">
                      {photos.map((photo, idx) => (
                        <button key={idx} onClick={() => goToSlide(idx)} className={idx === currentSlide ? "active" : "inactive"}>
                          <img 
                            src={`https://places.googleapis.com/v1/${photo.name}/media?key=${API_KEY}&${params}`} 
                            alt={`Thumbnail ${idx + 1}`}
                            // onError={(e) => {
                            //     e.target.style.display = 'none';
                            // }} 
                          />
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
  }

  
}
