import React from 'react';
import '../../css/pages/header.css'
import '../../css/reusables/positions.css'
import { useNavigate } from 'react-router-dom';
function Header(props) {


    
  const navigator = useNavigate()
  const signOut = () => {
    localStorage.removeItem("userId")
    props.setUser({
      id: undefined,
      userName: "",
      password: "",
      isAdmin: false

    })
    navigator("/")
  }



  const renderHeader = () => {
    if (props.user.id !== undefined&&props.user.isAdmin===true) {

    return (
        <div className='header-container'>
            <div className='third-width '>
                <a href="/"> <img className='third-width' src="https://th.bing.com/th/id/OIP.Bc48kWIchvLsDpCAVgyIDAHaC6?w=328&h=137&c=7&r=0&o=5&pid=1.7" /></a>
            </div>
            <div className='third-width'>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/Admin">
                    <div className='header-link'>ADMIN</div>
                </a>
            </div>
            <div className='third-width' onClick={signOut}>Sign Out</div>
        </div>
    )
    }else if(props.user.id !== undefined&&props.user.isAdmin===false){
        return (
            <div className='header-container'>
            <div className='third-width '>
                <a href="/"> <img className='third-width' src="https://th.bing.com/th/id/OIP.Bc48kWIchvLsDpCAVgyIDAHaC6?w=328&h=137&c=7&r=0&o=5&pid=1.7" /></a>
            </div>
            <div className='third-width'>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/Buy">
                    <div className='header-link'>BUY</div>
                </a>
            </div>
            <div className='third-width' onClick={signOut}>Sign Out</div>
        </div>
        )

    } else {
        return (
            <div className='header-container'>
            <div className='third-width '>
                <a href="/"> <img className='third-width' src="https://th.bing.com/th/id/OIP.Bc48kWIchvLsDpCAVgyIDAHaC6?w=328&h=137&c=7&r=0&o=5&pid=1.7" /></a>
            </div>
            <div className='third-width'>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/SignIn">
                    <div className='header-link'>SIGN-IN</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/SignUp">
                    <div className='header-link'>SIGN-UP</div>
                </a>
            </div>
        </div>
        )

    }
    
}
return(
    renderHeader()
)
}
export default Header;