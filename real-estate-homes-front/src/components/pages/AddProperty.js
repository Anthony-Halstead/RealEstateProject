import '../../css/pages/addproperty.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProperty() {

  const [newproperty, setNewProperty] = useState({ description: "", city: "", state: "", numberOfBedrooms: "", 
  numberOfBathrooms: "", isPetsAllowed: "", yearBuilt: 0, squareFeet: 0, dateAdded: 0, price: 0})
  
  const navigate = useNavigate();

  const addPropertyChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempNewProperty = { ...newproperty };
    tempNewProperty[name] = value;
    setNewProperty(tempNewProperty);
  };

  const handleAddPropertySubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/property/save/", newproperty)
      .then((response) => {
        setNewProperty(response.data);
        navigate("/Admin")
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (<div className='add-property-content'>
    <div>
      DESCRIPTION
      <input value={newproperty.description} name='description' type='description' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      CITY
      <input value={newproperty.city} name='make' type='make' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      STATE
      <input value={newproperty.state} name='model' type='model' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      NUMBER OF BEDROOMS
      <input value={newproperty.numberOfBedrooms} name='miles' type='miles' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      NUMBER OF BATHROOMS
      <input value={newproperty.numberOfBathrooms} name='price' type='price' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      PETS ALLOWED?
      <input value={newproperty.isPetsAllowed} name='miles' type='miles' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      SQUARE FEET
      <input value={newproperty.squareFeet} name='price' type='price' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      YEAR BUILT
      <input value={newproperty.yearBuilt} name='year' type='year' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      PRICE
      <input value={newproperty.price} name='price' type='price' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      DATE ADDED: ex:2023-12-03
      <input value={newproperty.dateAdded} name='dateAdded' type='dateAdded' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      <button onClick={handleAddPropertySubmit}>SUBMIT</button>
    </div>
  </div>
  )



}

export default AddProperty;