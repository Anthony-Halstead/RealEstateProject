import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/pages/buy.css';
import { useNavigate } from 'react-router-dom';

function Buy(props) {

  console.log("USER ID", props.user.id);
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/property/findPropertiesByCity/${search}`)
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
    <div className='buy-content'>
      <div>
        <input
          type='text'
          value={search}
          onChange={handleSearchChange}
          placeholder='Search by city'
        />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>
      {showProperties()}
      {isModalOpen && selectedProperties &&(
        <div>
          <div>
            <button onClick={closeModal}>Close</button>
          </div>
          <div>
            <div>DESCRIPTION: {selectedProperty.description}</div>
            <div>CITY: {selectedProperty.city}</div>
            <div>STATE: {selectedProperty.state}</div>
            <div>YEAR BUILT: {selectedProperty.yearBuilt}</div>
            <div>NUMBER OF BEDROOMS: {selectedProperty.numberOfBedrooms}</div>
            <div>NUMBER OF BATHROOMS: {selectedProperty.numberOfBathrooms}</div>
            <div>PETS: {selectedProperty.isPetsAllowed}</div>
            <div>SQUARE FEET: {selectedProperty.squareFeet}</div>
            <div>DATE ADDED:{selectedProperty.dateAdded}</div>
            <div>PRICE: {selectedProperty.price}</div>
            <div className='property-box'>
              {showPropertyPhotos(selectedProperty)}
            </div>
          </div>
          <div>
            <button onClick={() => goToCheckout(selectedProperty)}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Buy