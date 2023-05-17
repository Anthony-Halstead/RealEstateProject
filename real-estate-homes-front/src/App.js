import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/pages/Home';
import Buy from './components/pages/Buy';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Admin from './components/pages/Admin';
import PageWrapper from './components/reusables/PageWrapper';
import { Route, Routes } from 'react-router-dom';
import Checkout from './components/pages/Checkout';
import axios from 'axios';
import EditProperty from './components/pages/EditProperty';
import AddProperty from './components/pages/AddProperty';

function App() {
  const [user, setUser] = useState({ id: undefined, email: "", password: "", isAdmin: false});

  
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      axios.get(`http://localhost:8080/user/findUserById/${id}`)
      .then((response)=>{
        setUser(response.data)
        console.log("response", response.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    }  
  }, [])

  return (
    <PageWrapper
    user = {user}
    setUser = {setUser}
    >
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>} />
        <Route path="/Buy" element={<Buy user={user} setUser={setUser}/>} />
        <Route path="/SignIn" element={<SignIn user={user} setUser={setUser} />} />
        <Route path="/SignUp" element={<SignUp user={user} setUser={setUser} />} />
        <Route path="/Checkout" element={<Checkout user={user} setUser={setUser} />} />
        <Route path="/Admin" element={<Admin user={user} setUser={setUser} />} />
        <Route path="/EditCar" element={<EditProperty  user={user} setUser={setUser}/>} />
        <Route path="/AddCar" element={<AddProperty  user={user} setUser={setUser}  />} />
      </Routes>
    </PageWrapper>
  );
}
export default App;