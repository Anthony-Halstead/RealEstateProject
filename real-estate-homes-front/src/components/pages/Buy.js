import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/pages/buy.css';
import '../../css/reusables/positions.css';
import { useNavigate } from 'react-router-dom';

function Buy(props) {

  console.log("USER ID", props.user.id);
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [searchState, setSearchState] = useState('');
  const [searchSquareFoot, setSearchSquareFoot] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      axios
        .get('http://localhost:8080/property/findPropertiesInInventory')
        .then((response) => {
          setProperties(response.data);
        })
        .catch((e) => {
          console.log(e);
        });  
  }, []);

  const handleSearchCityChange = (event) => {
    setSearchCity(event.target.value);
  };
  const handleSearchStateChange = (event) => {
    setSearchState(event.target.value);
  };
  const handleSearchSquareFootChange = (event) => {
    setSearchSquareFoot(event.target.value);
  };

  const handleSearchCitySubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/property/findPropertiesByCity/${searchCity}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSearchStateSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/property/findPropertiesByState/${searchState}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSearchSquareFootSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/property/findPropertiesBySquareFoot/${searchSquareFoot}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePropertyClick = (property) => {
    setSelectedProperties(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToCheckout = (property) => {
    navigate('/checkout', { state: { property, user: props.user } });
  };

  const showProperties = () => {
    return properties.map((property) => {
      const propertyPhoto = property.propertyPhotos && property.propertyPhotos.length > 0 ? property.propertyPhotos[0].photoUrl : '';
      return (
        <div
          className='property-box'
          key={property.id}
          onClick={() => handlePropertyClick(property)}
        >
          Click To View Details
          <img src={propertyPhoto} alt={property.model} />
        </div>
      );
    });
  };

  const showPropertyPhotos = (property) => {
    return (
      <div>
        {property.propertyPhotos.map((photo) => (
          <img src={photo.photoUrl} alt={property.model} key={photo.id} />
        ))}
      </div>
    );
  };

  return (
    <div className='justify-content-center third-width flex-row'>
      <div>
        <input
          type='city'
          value={searchCity}
          onChange={ handleSearchCityChange}
          placeholder='Search by city'
        />
        <button onClick={handleSearchCitySubmit}>Search</button>
      </div>
      <div>
        <input
          type='state'
          value={searchState}
          onChange={handleSearchStateChange}
          placeholder='Search by state'
        />
        <button onClick={handleSearchStateSubmit}>Search</button>
      </div>
        <div>
        <input
          type='squareFoot'
          value={searchSquareFoot}
          onChange={handleSearchSquareFootChange}
          placeholder='Search by squareFoot'
        />
        <button onClick={handleSearchSquareFootSubmit}>Search</button>
      </div>
      {showProperties()}
      {isModalOpen && selectedProperties &&(
        <div>
          <div>
            <button onClick={closeModal}>Close</button>
          </div>
          <div>
            <div>DESCRIPTION: {selectedProperties.description}</div>
            <div>REALATOR INFO: {selectedProperties.realatorInfo}</div>
            <div>CITY: {selectedProperties.city}</div>
            <div>STATE: {selectedProperties.state}</div>
            <div>YEAR BUILT: {selectedProperties.yearBuilt}</div>
            <div>NUMBER OF BEDROOMS: {selectedProperties.numberOfBedrooms}</div>
            <div>NUMBER OF BATHROOMS: {selectedProperties.numberOfBathrooms}</div>
            <div>PETS: {selectedProperties.isPetsAllowed}</div>
            <div>SQUARE FEET: {selectedProperties.squareFeet}</div>
            <div>DATE ADDED:{selectedProperties.dateAdded}</div>
            <div>PRICE: {selectedProperties.price}</div>
            <div className='property-box'>
              {showPropertyPhotos(selectedProperties)}
            </div>
          </div>
          <div>
            <button onClick={() => goToCheckout(selectedProperties)}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Buy