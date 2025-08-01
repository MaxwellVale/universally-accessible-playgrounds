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

  if (!playground || !playground.place_id) { // this will happen if no playground in the database matches playgroundID
    return <h2>Playground not found.</h2>
  }
  else {
    const [currentSlide, setCurrentSlide] = useState(0); // defaulting to slide 0
    const carouselRef = useRef(); // let's you reference and modify the specific carousel instance 

    const [placeDetails, setPlaceDetails] = useState(null);
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    const place_id = playground.place_id;
    const place_details_url = `https://places.googleapis.com/v1/places/${place_id}?fields=name,displayName,formattedAddress,addressComponents,nationalPhoneNumber,location,photos,reviews,attributions&key=${GOOGLE_API_KEY}`;
    console.log('Google API Place Details URL:', place_details_url);

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
          if (data) {
            console.log('Google API results: ', data); // should contain arrays for address information, photos, and reviews
            setPlaceDetails(data);  
          }
          else {
            (console.error('Error from Google API:', data))
          }
        }
        catch (error) {
          console.error('Error fetching playground details', error);
        }
      };
      fetchPlaceDetails();
    }, [playground.place_id]);

    const displayName = placeDetails?.displayName;
    const formattedAddress = placeDetails?.formattedAddress;
    const addressComponents = placeDetails?.addressComponents; // different parts of address in an array
    const location = placeDetails?.location; // retrieve latitude and longitude coords for the map markers
    const photos = placeDetails?.photos; // photo list
    const params = 'maxWidthPx=1000'; // need to set a maxHeightPx or maxWidthPx for this to work
    const reviews = placeDetails?.reviews; // review list 
  
    return (
      <>
          <h2 className='info-heading'>{displayName?.text}</h2>
          <div className='description'>
              <p>{playground.description}</p>
              <p>Address: {placeDetails?.formattedAddress}</p>
              <p>Phone Number: {placeDetails?.nationalPhoneNumber}</p>
              <p>Coordinates: {location?.latitude}, {location?.longitude}</p>
          </div> 
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
                            src={`https://places.googleapis.com/v1/${photo.name}/media?key=${GOOGLE_API_KEY}&${params}`} 
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
                          src={`https://places.googleapis.com/v1/${photo.name}/media?key=${GOOGLE_API_KEY}&${params}`} 
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
          
          <h3>Reviews</h3>
          {placeDetails?.reviews?.length > 0 ? (
            <ul>
              {placeDetails.reviews.map((review, index) => (
                <li key={index}>
                  <p>{review.authorAttribution?.displayName}</p>
                  <p>{review.originalText?.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
          <div className='playgrounds-map'>
              <PlaygroundsMap playgrounds={ playgrounds } highlightID={ playgroundID } center={[placeDetails?.latitude, placeDetails?.longitude]} />
          </div>
          {/* {placeDetails.reviews && (
            <div>
              <h4>Reviews</h4>
              <ul>
                {placeDetails?.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.author_name}</strong> ({review.rating}★): {review.text}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
      </>
    );
  }

  
}
