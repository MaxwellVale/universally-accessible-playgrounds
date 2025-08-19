// PlaygroundDetails.jsx
import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import playgrounds from '../data/playgroundData.js'
import PlaygroundsMap from '../components/PlaygroundsMap.jsx'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const LOCAL_IMAGES = import.meta.glob(
  '/src/data/photos/*/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, query: '?url', import: 'default' }
);

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

const thumb_responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function PlaygroundDetails() {
  const { playgroundID } = useParams()
  const playground = playgrounds.find(p => p.id === playgroundID)

  if (!playground || !playground.place_id) { // this will happen if no playground in the database matches playgroundID
    return <h2>Playground not found.</h2>
  }
  const [currentSlide, setCurrentSlide] = useState(0); // defaulting to slide 0
  const carouselRef = useRef(); // let's you reference and modify the specific carousel instance 
  const thumbnailRef = useRef(); // reference for the thumbnail carousel 

  const [placeDetails, setPlaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // getting API key from .env file 
  const place_id = playground.place_id;
  const place_details_url = `https://places.googleapis.com/v1/places/${place_id}?fields=name,displayName,formattedAddress,addressComponents,nationalPhoneNumber,location,photos,reviews,attributions&key=${GOOGLE_API_KEY}`;
  // console.log('Google API Place Details URL:', place_details_url);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goToSlide(index);
  };

  useEffect(() => {
    setLoading(true);
    setPlaceDetails(null);
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
      finally {
        setLoading(false);
      }
    };
    fetchPlaceDetails();
  }, [playground.place_id]);

  const displayName = placeDetails?.displayName;
  const formattedAddress = placeDetails?.formattedAddress;
  const addressComponents = placeDetails?.addressComponents; // different parts of address in an array
  const location = placeDetails?.location; // retrieve latitude and longitude coords for the map markers
  const params = 'maxWidthPx=1000'; // need to set a maxHeightPx or maxWidthPx for this to work
  const reviews = placeDetails?.reviews; // review list 
  const photos_api = placeDetails?.photos; // photo list

  const prefix = `/src/data/photos/${playgroundID}`;
  const photos_local = [];

  for (const path in LOCAL_IMAGES) {
    // console.log("Path = ", path);
    if (path.startsWith(prefix)) {
      photos_local.push(LOCAL_IMAGES[path])
    }
  }

  if (!placeDetails) {
    return <p>Loading details...</p>;
  }
  const photos_api_url = photos_api && photos_api.length > 0 ? photos_api.map(photo => `https://places.googleapis.com/v1/${photo.name}/media?key=${GOOGLE_API_KEY}&${params}`) : []; // just get the URL from each photo object
  const photos = [...photos_local, ...photos_api_url]; // combine photos into one array 
  console.log("Local photos: ", photos_local.length);
  console.log("API photos: ", photos_api.length);
  console.log("Combined photos array length: ", photos.length);
  return (
      <>
        <h2 className='info-heading'>{displayName?.text}</h2>
        <div className='description'>
            <p>{playground.description}</p>
            <p>Address: {formattedAddress}</p>
            <p>Phone Number: {placeDetails?.nationalPhoneNumber}</p>
            <p>Coordinates: {location?.latitude}, {location?.longitude}</p>
        </div> 
        {/* Render the image carousel if there are images in the database for this playground */}
        {loading ? (
          <p>Fetching details...</p>
        ) : (photos && photos.length > 0) ? (
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
                          src={photo} 
                          alt={`Slide ${index + 1}`} /* Change the alt of images to be more descriptive and accessible */
                          // onError={(e) => {
                          //   e.target.style.display = 'none';
                          // }}
                        /> 
                      </div>
                    ))}
                </Carousel>

                {/* See if this stuff works */}
                <div className="thumbnails-wrapper">
                  <Carousel
                    ref={thumbnailRef}
                    responsive={thumb_responsive}
                    containerClass='thumbs-carousel'
                    keyBoardControl
                  >
                  {photos.map((photo, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx)} className={idx === currentSlide ? "active" : "inactive"}>
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${idx + 1}`}
                        // onError={(e) => {
                        //     e.target.style.display = 'none';
                        // }} 
                      />
                    </button>
                  ))}
                  </Carousel>
                </div>
            </div>
          // ) : <p>No photos to show...</p>}
        ) : <p>No photos to show.</p>} 

        {/* Conditional rendering depending on presence of features array in PlaygroundsData.js */}
        {playground.features && playground.features.length > 0 && (
          <>
            <h3 className='features'>Accessibility Features</h3>
            <ul className='feature-tags'>
              {playground.features.map((f, idx) => (
                <li key={idx} className='feature-tag'>{f}</li>
              ))}
            </ul>
          </>
        )}
        
        <h3 className='features'>Features</h3>
        <ul className='features-list'>
            {playground.features.map((feature, index) => (
            <li key={`$playground.id}-feature-${index}`}>{feature}
            </li>
            ))}
          </ul>

        <h3 className='reviews'>Reviews</h3>
        {reviews?.length > 0 ? (
          <ul className='review-content'>
            {placeDetails.reviews.map((review, index) => (
              <li key={index}>
                <p><strong>{review.authorAttribution?.displayName}</strong> ({review.rating}*)</p>
                <p>{review.originalText?.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
        <div className='playgrounds-map'>
            <PlaygroundsMap playgrounds={ playgrounds } highlightID={ playgroundID } center={[location?.latitude, location?.longitude]} />
        </div>

      </>
  );
}
