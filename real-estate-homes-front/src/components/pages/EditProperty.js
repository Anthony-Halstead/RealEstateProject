import '../../css/pages/buy.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function EditProperty(props) {
 
  const location = useLocation();
  const { property } = location.state;
  const [editProperty, setProperty] = useState(property);
  let [photoNum, setPhotoNum] = useState(0);
  const[photo, setPhoto]=useState();
  const [newPhoto, setNewPhoto]=useState();
  const [photoCount, setPhotoCount] = useState(Object.keys(editProperty.propertyPhotos).length-1);

  const navigate = useNavigate();

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempProperty = { ...editProperty};
    tempProperty[name] = value;
    setProperty(tempProperty)
    }

    const photoChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempPhoto = { ...newPhoto};
        tempPhoto[name] = value;
        setNewPhoto(tempPhoto)
        }

    const nextPhotoClick = () =>{
        if(photoCount !== photoNum){
          setPhotoNum(photoNum+1)
        }
        else{
          setPhotoNum(0)
          }
    }
    const prevPhotoClick = () =>{
       if(photoNum===0){
        setPhotoNum(photoCount)
        
      }else{
        setPhotoNum(photoNum-1)
      
      }

    }
  
    
    const deletePhotoClick = () =>{
        setPhoto = editProperty.propertyPhotos[photoNum];
        axios.delete(`http://localhost:8080/property/deletePhoto/${editProperty.id}`,photo)
        setPhotoCount=(photoCount-1)
        prevPhotoClick();
    }

    const addPhotoClick = (event) =>{
        event.preventDefault();
        axios.post(`http://localhost:8080/property/addPhoto/${editProperty.id}`,newPhoto)
        setPhotoCount=(photoCount+1)
    }


  const handleUpdateClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/property/updateProperty", editProperty)
      .then((response) => {

        setProperty(response.data);
        navigate("/Admin")
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="property-edit-box">
      <div className='flex-row'><h1 className = 'center'>EditProperty</h1></div>
   
        <img className = 'picture-box' src={editProperty.propertyPhotos[photoNum].photoUrl} alt={property.model} />
        <div className = 'flex-row center'>
        <button onClick={deletePhotoClick}>DELETE</button>
        <button onClick={nextPhotoClick}>NEXT</button>
        <button onClick={prevPhotoClick}>PREVIOUS</button>
        </div>
        <div className='flex-row center'>
        IMAGE URL:
        <input className = 'input-container' value={editProperty.propertyPhotos[photoNum].photoUrl} name='description' type='description' onChange={changeHandler} required></input>
        </div>
        <div>
      DESCRIPTION
      <input value={editProperty.description} name='description' type='description' onChange={changeHandler} ></input>
    </div>
    <div>
      REALATOR INFO
      <input value={editProperty.realatorInfo} name='realatorInfo' type='realatorInfo' onChange={changeHandler} ></input>
    </div>
    <div>
      CITY
      <input value={editProperty.city} name='city' type='city' onChange={changeHandler} ></input>
    </div>
    <div>
      STATE
      <input value={editProperty.state} name='state' type='state' onChange={changeHandler} ></input>
    </div>
    <div>
      NUMBER OF BEDROOMS
      <input value={editProperty.numberOfBedrooms} name='numberOfBedrooms' type='numberOfBedrooms' onChange={changeHandler} ></input>
    </div>
    <div>
      NUMBER OF BATHROOMS
      <input value={editProperty.numberOfBathrooms} name='numberOfBathrooms' type='numberOfBathrooms' onChange={changeHandler} ></input>
    </div>
    <div>
      PETS ALLOWED?
      <input value={editProperty.isPetsAllowed} name='isPetsAllowed' type='isPetsAllowed' onChange={changeHandler} ></input>
    </div>
    <div>
      SQUARE FEET
      <input value={editProperty.squareFeet} name='squareFeet' type='squareFeet' onChange={changeHandler} ></input>
    </div>
    <div>
      YEAR BUILT
      <input value={editProperty.yearBuilt} name='yearBuilt' type='yearBuilt' onChange={changeHandler} ></input>
    </div>
    <div>
      PRICE
      <input value={editProperty.price} name='price' type='price' onChange={changeHandler} ></input>
    </div>
    <div>
      DATE ADDED: ex:2023-12-03
      <input value={editProperty.dateAdded} name='dateAdded' type='dateAdded' onChange={changeHandler} ></input>
    </div>
        <div>
        <button onClick={handleUpdateClick}>Update</button>
        </div>
        <div className='flex-row center'>
        ADD PHOTO URL:
        <input className = 'input-container' name='photoUrl' type='photoUrl' onChange={photoChangeHandler} ></input>
        </div>
        <div>
        <button onClick={addPhotoClick}>Add Photo</button>
        </div>
    </div>
      



  )
}

export default EditProperty;