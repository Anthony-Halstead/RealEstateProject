import React from 'react'
import '../../css/pages/home.css'
import '../../css/reusables/positions.css'
function Home(props) {
  console.log("USER ID", props.user.id);
  return (
    
    <div className = 'flex-column justify-content-center container background'>
    <div className='flex-column welcome-box'>Welcome To Fake Real Estates
        <p className='flex-row justify-content-center'>The name might be fake but the price is real</p>
    </div>
    </div>

  )
}

export default Home