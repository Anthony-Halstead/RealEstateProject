import '../../css/pages/addproperty.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProperty(props) {

  const [newproperty, setNewProperty] = useState({
    description: "", city: "", state: "", numberOfBedrooms: 0,
    numberOfBathrooms: 0, isPetsAllowed: "", yearBuilt: 0, squareFeet: 0, dateAdded: 0, price: 0, realatorInfo: ""
  })
  const [addPhoto, setAddPhoto] = useState({photoUrl:""})
  const navigate = useNavigate();

  const addPropertyChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempNewProperty = { ...newproperty };
    tempNewProperty[name] = value;
    setNewProperty(tempNewProperty);
  };

  const addPhotoChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempNewPhoto = { ...addPhoto };
    tempNewPhoto[name] = value;
    setAddPhoto(tempNewPhoto);
  };

  const navigateToAdmin = () => {
    navigate("/Admin");
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    handleAddPropertySubmit(event)
      .then((savedProperty) => {
        // Use the id of the saved property to add the photo
        return addPhotoClick(savedProperty.id);
      })
      .then(navigateToAdmin)
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddPropertySubmit = (event) => {
    event.preventDefault();
    return axios
      .post(`http://localhost:8080/property/save/${props.user.id}`, newproperty)
      .then((response) => {
        setNewProperty(response.data);
        return response.data; // return the saved property
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const addPhotoClick = (propertyId) => {
    return axios.post(`http://localhost:8080/property/addPhoto/${propertyId}`, addPhoto)
      .then((response) => {
        setAddPhoto(response.data);
        return response.data;
      }).catch((e) => {
        console.log(e);
      });
  };

  return (<div className='add-property-content'>
    <div>
      DESCRIPTION
      <input value={newproperty.description} name='description' type='description' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      REALATOR INFO
      <input value={newproperty.realatorInfo} name='realatorInfo' type='realatorInfo' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      CITY
      <input value={newproperty.city} name='city' type='city' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      STATE
      <input value={newproperty.state} name='state' type='state' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      NUMBER OF BEDROOMS
      <input value={newproperty.numberOfBedrooms} name='numberOfBedrooms' type='numberOfBedrooms' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      NUMBER OF BATHROOMS
      <input value={newproperty.numberOfBathrooms} name='numberOfBathrooms' type='numberOfBathrooms' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      PETS ALLOWED?
      <input value={newproperty.isPetsAllowed} name='isPetsAllowed' type='isPetsAllowed' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      SQUARE FEET
      <input value={newproperty.squareFeet} name='squareFeet' type='squareFeet' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      YEAR BUILT
      <input value={newproperty.yearBuilt} name='yearBuilt' type='yearBuilt' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      PRICE
      <input value={newproperty.price} name='price' type='price' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      DATE ADDED: ex:2023-12-03
      <input value={newproperty.dateAdded} name='dateAdded' type='dateAdded' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div >
      ADD PHOTO URL:
      <input value={addPhoto.photoUrl} name='photoUrl' type='photoUrl' onChange={addPhotoChangeHandler} required></input>
    </div>
    <div>
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  </div>
  )
}

export default AddProperty;