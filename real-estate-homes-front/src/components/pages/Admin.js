import React, { useState } from 'react'
import '../../css/pages/signupsignin.css'
import '../../css/reusables/positions.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import report from '../reusables/ReportGenerator';
import '../../css/pages/admin.css'

function Admin(props) {

  const [reportDates, setReportDates] = useState({ startDate: '', endDate: '' });
  const [properties, setProperties] = useState([]);

  const navigator = useNavigate()

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempReportDates = { ...reportDates };
    tempReportDates[name] = value;

    setReportDates(tempReportDates)
  }

  const reportSubmitHandler = () => {
    axios.get(`http://localhost:8080/property/findPropertiesSold/${reportDates.startDate}/${reportDates.endDate}`)
      .then((response) => {
        console.log("response data", response.data)
        report(response.data);
      })
      .catch((e) => {
        console.log('error');
      })
  };

  const addPropertiesSubmitHandler = () => {
    navigator('/AddProperty');
  }

  const findPropertiesSubmitHandler = () => {
    axios.get(`http://localhost:8080/property/findByUser/${props.user.id}`)
      .then((response) => {
        console.log("response data", response.data)
        setProperties(response.data);
      }
      )
      .catch((e) => {
        console.log(e);
      })
  };

  const handlePropertyClick = (property) => {
    navigator('/EditProperty', { state: { property } });
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

  return (
    <div className='fill'>
      <div className='flex-column admin-sidebar justify-content-center'>
        <h2>Hello Dealer</h2>
        <h1>Run Sales Report</h1>
        Report Start Date
        <input className='sidebar-input-container' value={reportDates.startDate} name='startDate' type='startDate' onChange={changeHandler} required></input>
        Report End Date
        <input className='sidebar-input-container' value={reportDates.endDate} name='endDate' type='endDate' onChange={changeHandler} required></input>
        <button onClick={reportSubmitHandler}>GET REPORT</button>
        <h1>EDIT PROPERTIES</h1>
        <h2>Find All</h2>
        <button onClick={findPropertiesSubmitHandler}>SEE MY PROPERTIES</button>
        <h1>ADD PROPERTIES</h1>
        <button onClick={addPropertiesSubmitHandler}>ADD NEW PROPERTIES</button>
      </div>
      <div className='flex-column fill'>
        {showProperties()}
      </div>
    </div>
  )
}

export default Admin